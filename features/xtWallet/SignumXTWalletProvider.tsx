import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { InvalidNetworkError, GenericExtensionWallet } from "@signumjs/wallets";
import { NetworkNameType, StatusReason, WalletConnectionStatus } from "./types";
import { ChildrenProps } from "@/app/types/ChildrenProps";
import { Address } from "@signumjs/core";

const StorageKeys = {
  ConnectionInfo: "xt-wallet:connection-info",
};

interface SignumXTWalletContextType {
  wallet: GenericExtensionWallet;
  connect: () => Promise<boolean>;
  disconnect: () => void;
  account: WalletAccount | null;
  node: WalletNode | null;
  status: WalletStatus;
  error: Error | null;
}

interface WalletAccount {
  address: Address;
  isWatchOnly: boolean;
}

interface WalletStatus {
  code: WalletConnectionStatus;
  reason: StatusReason | string;
}

interface WalletNode {
  host: string;
  network: string;
}

const defaultContext: SignumXTWalletContextType = {
  wallet: new GenericExtensionWallet(),
  connect: () => Promise.reject("Not ready yet"),
  disconnect: () => {},
  status: {
    reason: "",
    code: WalletConnectionStatus.Uninitialized,
  },
  account: null,
  node: null,
  error: null,
};

export const SignumXTWalletContext = createContext(defaultContext);

interface Props extends ChildrenProps {
  appName: string;
  networkName: NetworkNameType;
  autoConnect: boolean;
}

export const SignumXTWalletProvider = ({
  children,
  appName,
  networkName,
  autoConnect,
}: Props) => {
  const wallet = useRef(new GenericExtensionWallet());
  const isMounted = useRef(false);
  const [account, setAccount] = useState<WalletAccount | null>(null);
  const [node, setNode] = useState<WalletNode | null>(null);
  const [status, setStatus] = useState({
    code: WalletConnectionStatus.Uninitialized,
    reason: "",
  });

  const [error, setError] = useState<Error | null>(null);

  const connect = useCallback(async () => {
    if (wallet.current.connection) {
      console.warn("Wallet already connected... ignoring.");
      return true;
    }

    try {
      setError(null);
      setStatus({
        code: WalletConnectionStatus.Connecting,
        reason: "",
      });
      const connection = await wallet.current.connect({
        appName,
        networkName,
      });
      setAccount({
        address: Address.fromPublicKey(connection.publicKey),
        isWatchOnly: connection.watchOnly,
      });
      setNode({
        host: connection.currentNodeHost,
        network: networkName,
      });
      setStatus({ code: WalletConnectionStatus.Connected, reason: "" });

      window.localStorage.setItem(
        StorageKeys.ConnectionInfo,
        JSON.stringify({
          appName,
          networkName,
          autoConnect,
        })
      );

      connection.listen({
        onNetworkChanged: ({ networkName: network, networkHost: host }) => {
          if (network !== networkName) {
            setStatus({
              code: WalletConnectionStatus.Disconnected,
              reason: "wrong-network",
            });
            setError(new InvalidNetworkError());
          } else {
            setNode({
              host,
              network,
            });
          }
        },
        onAccountChanged: ({ accountPublicKey }) => {
          setAccount({
            address: Address.fromPublicKey(accountPublicKey),
            isWatchOnly: connection.watchOnly,
          });
        },
        onPermissionRemoved: () => {
          setAccount(null);
          setNode(null);
          setStatus({
            code: WalletConnectionStatus.Disconnected,
            reason: "permission-removed",
          });
        },
        onAccountRemoved: () => {
          setAccount(null);
          setNode(null);
          setStatus({
            code: WalletConnectionStatus.Disconnected,
            reason: "account-removed",
          });
        },
      });

      return true;
    } catch (e: any) {
      setStatus({
        code: WalletConnectionStatus.Errored,
        reason: e.message,
      });
      setError(e);
      console.error(e.message);
      return false;
    }
  }, [appName, networkName, autoConnect]);

  const disconnect = useCallback(() => {
    if (!wallet) {
      console.warn("Wallet Reference not ready yet...");
      return;
    }

    window.localStorage.removeItem(StorageKeys.ConnectionInfo);
    wallet.current = new GenericExtensionWallet();

    setNode(null);
    setAccount(null);
    setStatus({
      code: WalletConnectionStatus.Disconnected,
      reason: "user-disconnected",
    });
  }, []);

  useEffect(() => {
    async function init() {
      const info = window.localStorage.getItem(StorageKeys.ConnectionInfo);
      if (info) {
        const json = JSON.parse(info);
        if (json.autoConnect) {
          await connect();
        } else {
          setStatus({
            code: WalletConnectionStatus.Disconnected,
            reason: "",
          });
        }
      } else {
        setStatus({
          code: WalletConnectionStatus.Disconnected,
          reason: "",
        });
      }
    }
    if (!isMounted.current) {
      init();
    }
    isMounted.current = true;
  }, []);

  return (
    <SignumXTWalletContext.Provider
      value={{
        node,
        status,
        account,
        wallet: wallet.current,
        connect,
        disconnect,
        error,
      }}
    >
      {children}
    </SignumXTWalletContext.Provider>
  );
};

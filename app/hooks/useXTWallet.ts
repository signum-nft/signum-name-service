import { GenericExtensionWallet } from "@signumjs/wallets";
import { useCallback, useEffect, useReducer, useState } from "react";
import { Address } from "@signumjs/core";

const StorageKeys = {
  ConnectionInfo: "xt-wallet:connection-info",
};

const CustomEventName = "xt-wallet:connection-status-change";

export type StatusReason =
  | ""
  | "user-disconnected"
  | "permission-removed"
  | "account-removed"
  | "account-changed"
  | "network-changed";

export enum ConnectionStatus {
  Errored = -1,
  Disconnected,
  Disconnecting,
  Connecting,
  Connected,
}

interface EventPayload {
  status: ConnectionStatus;
  statusReason?: StatusReason;
  publicKey?: string;
  watchOnly?: boolean;
  nodeHost?: string;
  network?: string;
  error?: Error;
}

// global/singleton
let wallet: GenericExtensionWallet | null = null;
let isReadySingleton = false;
interface ConnectArgs {
  appName: string;
  networkName: string;
  autoConnect?: boolean;
}

export const useXTWallet = () => {
  const [account, setAccount] = useState<{
    address: Address;
    watchOnly: boolean;
  } | null>(null);
  const [node, setNode] = useState<{ host: string; network: string } | null>(
    null
  );
  const [status, setStatus] = useState({
    code: wallet?.connection
      ? ConnectionStatus.Connected
      : ConnectionStatus.Disconnected,
    reason: "",
  });

  const [isReady, setIsReady] = useState(isReadySingleton);

  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    function onConnectionStatus(e: any) {
      const {
        status,
        publicKey,
        watchOnly,
        nodeHost,
        network,
        statusReason = "",
        error = null,
      } = e.detail as EventPayload;
      setStatus({
        code: status,
        reason: statusReason,
      });

      if (status === ConnectionStatus.Errored) {
        setAccount(null);
        setNode(null);
        setStatus({
          code: ConnectionStatus.Disconnected,
          reason: "errored",
        });
        setError(error);
        return;
      }

      if (status === ConnectionStatus.Disconnecting) {
        setAccount(null);
        setNode(null);
        setStatus({
          code: ConnectionStatus.Disconnected,
          reason: "user-requested",
        });
        return;
      }

      if (publicKey && publicKey !== account?.address.getPublicKey()) {
        setAccount({
          address: Address.fromPublicKey(publicKey),
          watchOnly: watchOnly!,
        });
      }
      if (nodeHost && nodeHost !== node?.host) {
        setNode({
          host: nodeHost,
          network: network!,
        });
      }
    }

    window.addEventListener(CustomEventName, onConnectionStatus);
    return () => {
      window.removeEventListener(CustomEventName, onConnectionStatus);
    };
  }, [account?.address, node?.host]);

  const dispatchEvent = useCallback((payload: EventPayload) => {
    window.dispatchEvent(
      new CustomEvent<EventPayload>(CustomEventName, {
        detail: payload,
      })
    );
  }, []);

  const connect = useCallback(
    async ({ appName, networkName, autoConnect = true }: ConnectArgs) => {
      if (status.code !== ConnectionStatus.Disconnected) {
        return true;
      }

      try {
        setError(null);
        dispatchEvent({ status: ConnectionStatus.Connecting });
        wallet = new GenericExtensionWallet();
        const connection = await wallet.connect({
          appName,
          networkName,
        });
        dispatchEvent({
          status: ConnectionStatus.Connected,
          publicKey: connection.publicKey,
          watchOnly: connection.watchOnly,
          nodeHost: connection.currentNodeHost,
        });

        window.localStorage.setItem(
          StorageKeys.ConnectionInfo,
          JSON.stringify({
            appName,
            networkName,
            autoConnect,
          })
        );

        connection.listen({
          onNetworkChanged: ({ networkName, networkHost }) => {
            dispatchEvent({
              status: ConnectionStatus.Connected,
              statusReason: "network-changed",
              watchOnly: account ? account.watchOnly : undefined,
              publicKey: account ? account.address.getPublicKey() : undefined,
              nodeHost: networkHost,
              network: networkName,
            });
          },
          onAccountChanged: ({ accountPublicKey }) => {
            dispatchEvent({
              status: ConnectionStatus.Connected,
              statusReason: "account-changed",
              watchOnly: connection.watchOnly, // missing on signumjs
              publicKey: accountPublicKey,
              nodeHost: node?.host,
              network: node?.network,
            });
          },
          onPermissionRemoved: () => {
            dispatchEvent({
              status: ConnectionStatus.Disconnected,
              statusReason: "permission-removed",
            });
          },
          onAccountRemoved: () => {
            dispatchEvent({
              status: ConnectionStatus.Disconnected,
              statusReason: "account-removed",
            });
          },
        });

        return true;
      } catch (e: any) {
        dispatchEvent({ status: ConnectionStatus.Errored, error: e });
        console.error(e.message);
        return false;
      } finally {
        isReadySingleton = true;
        setIsReady(true);
      }
    },
    [account, dispatchEvent, node, status]
  );

  const disconnect = useCallback(() => {
    window.localStorage.removeItem(StorageKeys.ConnectionInfo);
    wallet = new GenericExtensionWallet();
    dispatchEvent({
      status: ConnectionStatus.Disconnecting,
      statusReason: "user-disconnected",
    });
  }, [dispatchEvent]);

  useEffect(() => {
    const connectionStatus = window.localStorage.getItem(
      StorageKeys.ConnectionInfo
    );
    if (connectionStatus) {
      const data = JSON.parse(connectionStatus);
      connect(data);
      // .then(() => {
      //   isReadySingleton = true;
      //   setIsReady(isReadySingleton)
      // })
    } else {
      isReadySingleton = true;
      setIsReady(isReadySingleton);
    }
  }, [connect]);

  return {
    wallet,
    disconnect,
    connect,
    status,
    node,
    account,
    error,
    isWalletConnected: status.code === ConnectionStatus.Connected,
    isWalletReady: isReady,
  };
};

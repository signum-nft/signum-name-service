import {
  ExtensionWalletError,
  GenericExtensionWallet,
} from "@signumjs/wallets";
import { useCallback, useEffect, useState } from "react";
import { Address } from "@signumjs/core";

const StorageKeys = {
  ConnectionInfo: "xt-wallet:connection-info",
};

const CustomEventName = "xt-wallet:connection-status-change";
export interface ConnectionError {
  type: string;
  message: string;
}

export enum ConnectionStatus {
  Disconnected,
  Connecting,
  Connected,
}

type OnNetworkChangeFunction = (args: {
  networkName: string;
  networkHost: string;
}) => void;

interface EventPayload {
  status: ConnectionStatus;
  publicKey?: string;
  watchOnly?: boolean;
  nodeHost?: string;
  network?: string;
}

// global/singleton
let wallet: GenericExtensionWallet | null = null;

export const useXTWallet = () => {
  const [account, setAccount] = useState<{
    address: Address;
    watchOnly: boolean;
  } | null>(null);
  const [node, setNode] = useState<{ host: string; network: string } | null>(
    null
  );
  const [status, setStatus] = useState(ConnectionStatus.Disconnected);
  const [error, setError] = useState<ConnectionError | null>(null);

  useEffect(() => {
    function onConnectionStatus(e: any) {
      const { status, publicKey, watchOnly, nodeHost, network } =
        e.detail as EventPayload;
      setStatus(status);

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
    async (appName: string, networkName: string, isAutoConnection = true) => {
      if (status !== ConnectionStatus.Disconnected) {
        return;
      }

      try {
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
            isAutoConnection,
          })
        );

        connection.listen({
          onNetworkChanged: ({ networkName, networkHost }) => {
            dispatchEvent({
              status: ConnectionStatus.Connected,
              watchOnly: account ? account.watchOnly : undefined,
              publicKey: account ? account.address.getPublicKey() : undefined,
              nodeHost: networkHost,
              network: networkName,
            });
          },
          onAccountChanged: ({ accountPublicKey }) => {
            dispatchEvent({
              status: ConnectionStatus.Connected,
              watchOnly: connection.watchOnly, // missing on signumjs
              publicKey: accountPublicKey,
              nodeHost: node?.host,
              network: node?.network,
            });
          },
          onPermissionRemoved: () => {
            dispatchEvent({ status: ConnectionStatus.Disconnected });
          },
          onAccountRemoved: () => {
            dispatchEvent({ status: ConnectionStatus.Disconnected });
          },
        });
      } catch (e: any) {
        window.dispatchEvent(
          new CustomEvent<EventPayload>("xt-wallet:connection-status", {
            detail: {
              status: ConnectionStatus.Disconnected,
            },
          })
        );
        if (e instanceof ExtensionWalletError) {
          setError({
            message: e.message,
            type: e.name,
          });
        } else {
          setError({
            message: e.message,
            type: "UnknownError",
          });
          console.error(e);
        }
      }
    },
    [account, dispatchEvent, node, status]
  );

  const disconnect = useCallback(() => {
    wallet = new GenericExtensionWallet();
    dispatchEvent({
      status: ConnectionStatus.Disconnected,
    });
  }, [dispatchEvent]);

  return {
    wallet,
    disconnect,
    connect,
    status,
    node,
    account,
    error,
  };
};

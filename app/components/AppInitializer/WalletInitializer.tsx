import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { appActions } from "@/app/states/appState";
import { accountActions } from "@/app/states/accountState";
import {
  walletActions,
  selectRememberWalletConnection,
} from "@/app/states/walletState";
import { useEffect, useRef } from "react";
import { requestWalletConnection } from "@/app/requestWalletConnection";
import { useAppContext } from "@/app/hooks/useAppContext";
import {
  ExtensionWalletError,
  GenericExtensionWallet,
  WalletConnection,
} from "@signumjs/wallets";
import { useSnackbar } from "@/app/hooks/useSnackbar";

export const WalletInitializer = () => {
  const { Ledger, Wallet, Platform } = useAppContext();
  const { showWarning } = useSnackbar();
  const dispatch = useAppDispatch();
  const listenerRef = useRef<any>(null);
  const connectionRef = useRef<WalletConnection | null>(null);
  const rememberConnection = useAppSelector(selectRememberWalletConnection);

  useEffect(() => {
    function handleDisconnectWallet() {
      listenerRef.current?.unlisten();
      connectionRef.current = null;
      dispatch(walletActions.disconnect());
      dispatch(accountActions.resetAccountData());
      Wallet.Extension = new GenericExtensionWallet();
    }

    function onNetworkChange(args: any) {
      if (args.networkName === Ledger.Network) {
        dispatch(walletActions.setNodeHost(args.networkHost));
        return;
      }
      showWarning("Network changed");
    }

    function onAccountChange(args: any) {
      dispatch(walletActions.setPublicKey(args.accountPublicKey));
    }

    function onPermissionOrAccountRemoval() {
      showWarning("Permission or Account removed");
      handleDisconnectWallet();
    }

    function handleExtensionErrors(e: ExtensionWalletError) {
      switch (e.name) {
        case "NotFoundWalletError":
          dispatch(appActions.setWalletModal(true));
          break;
        case "InvalidNetworkError":
          dispatch(appActions.setWalletWrongNetworkModal(true));
          break;
        case "NotGrantedWalletError":
          showWarning("Action cancelled or not permitted");
          break;
        default:
          // unexpected error
          console.error(e);
      }
    }

    async function handleConnectWallet() {
      if (connectionRef.current) return;
      try {
        const connection = await Wallet.Extension.connect({
          appName: Platform.Name,
          networkName: Ledger.Network,
        });
        dispatch(walletActions.setIsWalletConnected(true));
        dispatch(walletActions.setNodeHost(connection.currentNodeHost));
        dispatch(walletActions.setPublicKey(connection.publicKey || ""));
        dispatch(walletActions.setRememberWalletConnection(true));

        listenerRef.current = connection.listen({
          onNetworkChanged: onNetworkChange,
          onAccountChanged: onAccountChange,
          onPermissionRemoved: onPermissionOrAccountRemoval,
          onAccountRemoved: onPermissionOrAccountRemoval,
        });
        connectionRef.current = connection;
      } catch (e) {
        if (e instanceof ExtensionWalletError) {
          handleExtensionErrors(e);
        } else {
          console.error(e);
        }
      }
    }

    function handleStartSigning() {
      dispatch(appActions.setSignTransactionModal(true));
    }

    function handleEndSigning() {
      dispatch(appActions.setSignTransactionModal(false));
    }

    window.addEventListener("connect-wallet", handleConnectWallet);
    window.addEventListener("disconnect-wallet", handleDisconnectWallet);
    window.addEventListener("wallet-sign-start", handleStartSigning);
    window.addEventListener("wallet-sign-end", handleEndSigning);

    if (rememberConnection) {
      requestWalletConnection();
    }

    return () => {
      listenerRef.current?.unlisten();
      window.removeEventListener("connect-wallet", handleConnectWallet);
      window.removeEventListener("disconnect-wallet", handleDisconnectWallet);
      window.removeEventListener("wallet-sign-start", handleStartSigning);
      window.removeEventListener("wallet-sign-end", handleEndSigning);
    };
  }, [rememberConnection]);

  return null;
};

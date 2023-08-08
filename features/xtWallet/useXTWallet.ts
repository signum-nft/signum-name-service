import { useContext, useEffect } from "react";
import { WalletConnectionStatus } from "./types";
import { SignumXTWalletContext } from "./SignumXTWalletProvider";

export const useXTWallet = () => {
  const { wallet, connect, disconnect, account, node, status, error } =
    useContext(SignumXTWalletContext);

  useEffect(() => {
    console.log("account xt changing", account);
  }, [account]);

  return {
    wallet,
    disconnect,
    connect,
    status,
    node,
    account,
    error,
    isWalletReady: status.code !== WalletConnectionStatus.Uninitialized,
    isWalletConnected: status.code === WalletConnectionStatus.Connected,
  };
};

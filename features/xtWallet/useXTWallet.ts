import { useContext } from "react";
import { WalletConnectionStatus } from "./types";
import { SignumXTWalletContext } from "./SignumXTWalletProvider";

const LocalhostEx = /(localhost|127\.0\.0\.1|0\.0\.0\.0)/i;
export const useXTWallet = () => {
  const { wallet, connect, disconnect, account, node, status, error } =
    useContext(SignumXTWalletContext);

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
    isLocalNode: LocalhostEx.test(node?.host ?? ""),
  };
};

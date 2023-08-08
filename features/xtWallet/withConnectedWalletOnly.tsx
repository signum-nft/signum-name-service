import { useEffect } from "react";
import { ChildrenProps } from "@/types/ChildrenProps";
import { useXTWallet } from "./useXTWallet";
import { WalletConnectionStatus } from "./types";

const DefaultWalletLoader = () => <h1>Waiting for Wallet</h1>;

interface Props extends ChildrenProps {
  WaitWalletComponent?: () => JSX.Element;
  redirectUrl: string;
}

export const WithConnectedWalletOnly = ({
  children,
  redirectUrl,
  WaitWalletComponent = DefaultWalletLoader,
}: Props) => {
  const { status, isWalletReady } = useXTWallet();

  useEffect(() => {
    if (
      isWalletReady &&
      !(
        status.code === WalletConnectionStatus.Connecting ||
        status.code === WalletConnectionStatus.Connected
      )
    ) {
      location.replace(redirectUrl);
    }
  }, [isWalletReady, status, redirectUrl]);

  return isWalletReady ? <>{children}</> : <WaitWalletComponent />;
};

import { useEffect } from "react";
import { useRouter } from "next/router";
import { ChildrenProps } from "@/types/ChildrenProps";
import { useXTWallet } from "./useXTWallet";
import { WalletConnectionStatus } from "./types";

const DefaultWalletLoader = () => <h1>Waiting for Wallet</h1>;

interface Props extends ChildrenProps {
  WaitWalletComponent?: () => JSX.Element;
}

export const WithConnectedWalletOnly = ({
  children,
  WaitWalletComponent = DefaultWalletLoader,
}: Props) => {
  const router = useRouter();
  const { status, isWalletReady } = useXTWallet();

  useEffect(() => {
    if (
      isWalletReady &&
      !(
        status.code === WalletConnectionStatus.Connecting ||
        status.code === WalletConnectionStatus.Connected
      )
    ) {
      router.replace("/");
    }
  }, [isWalletReady, status, router]);

  return isWalletReady ? <>{children}</> : <WaitWalletComponent />;
};

import { ChildrenProps } from "@/types/ChildrenProps";
import { useEffect } from "react";
import { useXTWallet } from "@/app/hooks/useXTWallet";
import { useRouter } from "next/router";

export const WithConnectedWalletOnly = (props: ChildrenProps) => {
  const router = useRouter();
  const { isWalletReady, isWalletConnected } = useXTWallet();

  useEffect(() => {
    console.log("withconnectedwallet", isWalletConnected, isWalletReady);

    if (isWalletReady && !isWalletConnected) {
      router.replace("/");
    }
  }, [isWalletReady, isWalletConnected, router]);

  if (!isWalletReady) {
    return <h1>Waiting for Wallet</h1>;
  }

  return isWalletReady && isWalletConnected ? props.children : null;
};

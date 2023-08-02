import { WalletInitializer } from "./WalletInitializer";
import { AccountInitializer } from "./AccountInitializer";
import { MarketInitializer } from "./MarketInitializer";
import { PendingTransactionsInitializer } from "./PendingTransactionsInitializer";
import { MonitorTransactionsInitializer } from "./MonitoredTransactionsInitializer";
import { NodeHostInitializer } from "./NodeHostInitializer";
import { useXTWallet } from "@/app/hooks/useXTWallet";

export const AppInitializer = () => {
  const { status } = useXTWallet();
  return (
    <>
      {/*<WalletInitializer />*/}
      {/*<NodeHostInitializer />*/}
      {/*<MarketInitializer />*/}
      {/*<AccountInitializer />*/}
      {/*<PendingTransactionsInitializer />*/}
      {/*<MonitorTransactionsInitializer />*/}
    </>
  );
};

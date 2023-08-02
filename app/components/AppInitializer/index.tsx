import { AccountInitializer } from "./AccountInitializer";
import { MarketInitializer } from "./MarketInitializer";
import { PendingTransactionsInitializer } from "./PendingTransactionsInitializer";
import { MonitorTransactionsInitializer } from "./MonitoredTransactionsInitializer";
import { LedgerInitializer } from "./LedgerInitializer";
import { useXTWallet } from "@/app/hooks/useXTWallet";

export const AppInitializer = () => {
  return (
    <>
      {/*<NodeHostInitializer />*/}
      {/*<MarketInitializer />*/}
      <AccountInitializer />
      <LedgerInitializer />
      {/*<PendingTransactionsInitializer />*/}
      {/*<MonitorTransactionsInitializer />*/}
    </>
  );
};

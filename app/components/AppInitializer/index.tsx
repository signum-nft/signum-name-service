import { AccountLoader } from "./AccountLoader";
import { LedgerInitializer } from "./LedgerInitializer";
import { MonitoredTransactionsObserver } from "./MonitoredTransactionsObserver";
import { PendingTransactionsObserver } from "./PendingTransactionsObserver";

export const AppInitializer = () => {
  return (
    <>
      {/*<NodeHostInitializer />*/}
      {/*<MarketInitializer />*/}
      <AccountLoader />
      <LedgerInitializer />
      {/*<PendingTransactionsObserver />*/}
      <MonitoredTransactionsObserver />
    </>
  );
};

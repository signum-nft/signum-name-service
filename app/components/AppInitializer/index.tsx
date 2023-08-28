import { AccountLoader } from "./AccountLoader";
import { LedgerInitializer } from "./LedgerInitializer";
import { MonitoredTransactionsObserver } from "./MonitoredTransactionsObserver";

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

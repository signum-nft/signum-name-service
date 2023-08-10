import { AccountLoader } from "./AccountLoader";
import { LedgerInitializer } from "./LedgerInitializer";

export const AppInitializer = () => {
  return (
    <>
      {/*<NodeHostInitializer />*/}
      {/*<MarketInitializer />*/}
      <AccountLoader />
      <LedgerInitializer />
      {/*<PendingTransactionsInitializer />*/}
      {/*<MonitorTransactionsInitializer />*/}
    </>
  );
};

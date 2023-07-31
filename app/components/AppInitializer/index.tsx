import { WalletInitializer } from "./WalletInitializer";
import { AccountInitializer } from "./AccountInitializer";
import { MarketInitializer } from "./MarketInitializer";
import { PendingTransactionsInitializer } from "./PendingTransactionsInitializer";
import { MonitorTransactionsInitializer } from "./MonitoredTransactionsInitializer";
import { NodeHostInitializer } from "./NodeHostInitializer";

export const AppInitializer = () => {
  return (
    <>
      <WalletInitializer />
      <NodeHostInitializer />
      {/*<MarketInitializer />*/}
      <AccountInitializer />
      <PendingTransactionsInitializer />
      <MonitorTransactionsInitializer />
    </>
  );
};

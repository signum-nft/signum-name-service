import { AssetTrade } from "@signumjs/core";
import { ChainValue, Amount } from "@signumjs/util";
import { OrderRowProps } from "@/app/types/tokenOrderTypes";

interface OrderSummary extends OrderRowProps {
  orderId: string;
  asset: string;
  percentage: number; // 0 - 1
  height: number;
  timestamp: number;
  estimatedValue: number;
  trades: AssetTrade[];
}

export const mapJournalEntryToOrderSummary = (entry: any): OrderSummary => {
  const fullQnt = Number(entry.quantityQNT);
  const execQnt = Number(entry.executedQuantityQNT);
  const percentage = fullQnt ? execQnt / fullQnt : 0;

  const amount = Number(
    ChainValue.create(entry.decimals).setAtomic(entry.quantityQNT).getCompound()
  );

  const price = Amount.fromPlanck(entry.price);

  const estimatedValue = Number(price.clone().multiply(amount).getSigna());

  return {
    type: entry.type === "bid" ? "buy" : "sell",
    orderId: entry.order,
    asset: entry.asset,
    timestamp: entry.timestamp,
    amount: amount,
    price: price.getSigna(),
    estimatedValue,
    percentage,
    height: entry.height,
    trades: entry.trades,
  };
};

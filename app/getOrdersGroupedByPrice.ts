import { AssetOrder } from "@signumjs/core";
import BigNumber from "bignumber.js";
import { Amount } from "@signumjs/util";

interface GroupedOrder {
  pricePlanck: Amount;
  totalPricePlanck: Amount;
  totalQuantity: BigNumber;
  orders: AssetOrder[];
}

export function getOrdersGroupedByPrice(
  orders: AssetOrder[],
  sortingDirection: "desc" | "asc"
) {
  let groupedOrders = new Map<string, GroupedOrder>();
  let assetId = null;
  for (let o of orders) {
    const { priceNQT, asset, quantityQNT } = o;
    if (assetId === null) {
      assetId = asset;
    }
    if (assetId !== asset) {
      throw new Error(
        "Found order of different asset... can only group orders of the same asset"
      );
    }

    const go = groupedOrders.get(priceNQT);
    const priceAmount = Amount.fromPlanck(priceNQT);
    if (!go) {
      groupedOrders.set(priceNQT, {
        pricePlanck: priceAmount,
        totalPricePlanck: priceAmount.clone(),
        totalQuantity: new BigNumber(quantityQNT),
        orders: [o],
      });
      continue;
    }

    go.orders.push(o);
    go.totalPricePlanck.add(priceAmount); // mutable add
    // arbitrary decimal adding, without the need of decimals.
    go.totalQuantity = go.totalQuantity.plus(o.quantityQNT);
  }

  return Array.from(groupedOrders.values())
    .sort((a, b) => {
      const dir = sortingDirection === "asc" ? -1 : 1;
      if (a.pricePlanck.equals(b.pricePlanck)) return 0;
      return a.pricePlanck.less(b.pricePlanck) ? 1 * dir : -1 * dir;
    })
    .map((go) => ({
      pricePlanck: go.pricePlanck.getPlanck(),
      totalPricePlanck: go.totalPricePlanck.getPlanck(),
      totalQuantity: go.totalQuantity.toString(10),
      orders: go.orders,
    }));
}

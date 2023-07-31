import { useMemo } from "react";
import {
  AssetOrder,
  isAttachmentVersion,
  Transaction,
  TransactionAssetSubtype,
  TransactionType,
} from "@signumjs/core";
import { convertAssetPriceToPlanck } from "@signumjs/util";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { selectTokenOrders, tokenActions } from "@/app/states/tokenState";
import { useTokenMetaData } from "@/app/hooks/useTokenMetaData";
import { selectIncomingOrderTransactionsPerToken } from "@/app/states/transactionState";
import { TokenMetaData } from "@/app/types/tokenMetaData";

import useSWR from "swr";
import { isEqual } from "lodash";

const mapOrderTransactionToOrder =
  (metaData: TokenMetaData) =>
  (tx: Transaction): AssetOrder => {
    const isOrderTransaction =
      tx.type === TransactionType.Asset &&
      (tx.subtype === TransactionAssetSubtype.BidOrderPlacement ||
        tx.subtype === TransactionAssetSubtype.AskOrderPlacement);

    if (!isOrderTransaction) {
      throw new Error(`Transaction ${tx.transaction} is not an order`);
    }

    const type = isAttachmentVersion(tx, "AskOrderPlacement") ? "ask" : "bid";
    const asset = tx.attachment.asset;
    if (asset !== metaData.id) {
      throw new Error(
        `Asset Id mismatch. Transaction is for ${asset}, but got ${metaData.id} as argument`
      );
    }
    const priceNQT = convertAssetPriceToPlanck(
      tx.attachment.priceNQT,
      metaData.decimals
    );
    return {
      order: tx.transaction,
      quantityQNT: tx.attachment.quantityQNT,
      asset,
      priceNQT,
      // needed for type compatibility
      price: priceNQT,
      type,
      account: tx.sender,
      accountRS: tx.senderRS,
      height: tx.height,
    };
  };

export const useTokenOrders = (tokenId: string, maxOrderCount = 100) => {
  const { ledgerService } = useLedgerService();
  const dispatch = useAppDispatch();
  const metaData = useTokenMetaData(tokenId);
  const openTokenOrders = useAppSelector(selectTokenOrders(tokenId));
  const incomingOrderTransactions = useAppSelector(
    selectIncomingOrderTransactionsPerToken(tokenId)
  );

  useSWR(
    ledgerService && metaData
      ? `useTokenOrderData/${tokenId}?count=${maxOrderCount}`
      : null,
    async () => {
      if (!metaData) return null;
      if (!metaData.id) return null;
      if (!ledgerService) return null;

      const orders = await ledgerService.token
        .with(metaData)
        .fetchOpenOrders(0, maxOrderCount);

      if (!isEqual(orders, openTokenOrders)) {
        dispatch(tokenActions.updateTokenOrders({ id: metaData.id, orders }));
      }

      return orders;
    },
    {
      dedupingInterval: 10_000,
      refreshInterval: 30_000,
    }
  );

  const upcomingTokenOrders = useMemo(() => {
    const orders = incomingOrderTransactions.map(
      mapOrderTransactionToOrder(metaData)
    );

    return {
      sell: orders.filter((o) => o.type === "ask"),
      buy: orders.filter((o) => o.type === "bid"),
    };
  }, [incomingOrderTransactions, metaData]);

  return {
    open: openTokenOrders,
    upcoming: upcomingTokenOrders,
  };
};

import { RootState } from "@/states/store";
import {
  Transaction,
  TransactionAssetSubtype,
  TransactionType,
} from "@signumjs/core";
import { createSelector } from "@reduxjs/toolkit";
import { Monitor } from "./slice";

export const selectPendingTransactions = (state: RootState): Transaction[] => {
  return state.transactionState.pendingTransactions;
};

export const selectMonitoredTransactions = (state: RootState): Monitor[] => {
  return state.transactionState.monitoredTransactions;
};

export const selectIncomingOrderTransactions = createSelector(
  selectPendingTransactions,
  (transactions) =>
    transactions.filter(
      ({ type, subtype }) =>
        type === TransactionType.Asset &&
        (subtype === TransactionAssetSubtype.AskOrderPlacement ||
          subtype === TransactionAssetSubtype.BidOrderPlacement)
    )
);

export const selectIncomingOrderTransactionsPerToken = (tokenId: string) =>
  createSelector(selectIncomingOrderTransactions, (tradeTransactions) =>
    tradeTransactions.filter(({ attachment }) => attachment?.asset === tokenId)
  );

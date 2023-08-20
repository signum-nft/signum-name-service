import { RootState } from "@/states/store";
import {
  Transaction,
  TransactionArbitrarySubtype,
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
export const selectPendingAliasTransactions = (ownerId: string) =>
  createSelector(selectPendingTransactions, (transactions) =>
    transactions.filter(
      ({ type, subtype, sender }) =>
        sender === ownerId &&
        type === TransactionType.Arbitrary &&
        (subtype === TransactionArbitrarySubtype.AliasAssignment ||
          subtype === TransactionArbitrarySubtype.AliasSale ||
          subtype === TransactionArbitrarySubtype.AliasBuy)
    )
  );

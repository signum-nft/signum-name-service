import { RootState } from "@/states/store";
import { Transaction } from "@signumjs/core";
import { Monitor } from "./slice";

export const selectPendingTransactions = (state: RootState): Transaction[] => {
  return state.transactionState.pendingTransactions;
};

export const selectMonitoredTransactions = (state: RootState): Monitor[] => {
  return state.transactionState.monitoredTransactions;
};

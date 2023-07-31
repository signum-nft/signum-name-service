import { Transaction } from "@signumjs/core";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Monitor {
  transactionId: string;
  referenceId: string;
  referenceQuantity?: string;
  type: string; // or some other type
  timestamp: number; // creation timestamp
}

interface TransactionState {
  pendingTransactions: Transaction[];
  monitoredTransactions: Monitor[];
}

const initialState: TransactionState = {
  pendingTransactions: [],
  monitoredTransactions: [],
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    reset: () => initialState,
    setPendingTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.pendingTransactions = action.payload;
    },
    addMonitor: (state, action: PayloadAction<Omit<Monitor, "timestamp">>) => {
      state.monitoredTransactions.push({
        ...action.payload,
        timestamp: Date.now(),
      });
    },
    removeMonitor: (state, action: PayloadAction<string>) => {
      const txId = action.payload;
      state.monitoredTransactions = state.monitoredTransactions.filter(
        (m) => m.transactionId !== txId
      );
    },
  },
});

export const { actions: transactionActions } = transactionSlice;

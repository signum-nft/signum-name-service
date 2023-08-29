import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NetworkInfo } from "@signumjs/core";

export interface LedgerState {
  currentBlockHeight: number;
  networkMetaData: NetworkInfo | null;
  currentNodeHost: string;
}

const initialState: LedgerState = {
  currentBlockHeight: 0,
  networkMetaData: null,
  currentNodeHost: "",
};

export const ledgerSlice = createSlice({
  name: "ledger",
  initialState,
  reducers: {
    reset: () => initialState,
    setNetworkMetaData: (state, action: PayloadAction<NetworkInfo>) => {
      state.networkMetaData = action.payload;
    },
    setCurrentNodeHost: (state, action: PayloadAction<string>) => {
      state.currentNodeHost = action.payload;
    },
  },
});

export const { actions: ledgerActions } = ledgerSlice;

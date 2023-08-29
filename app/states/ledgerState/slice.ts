import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NetworkInfo } from "@signumjs/core";

export interface LedgerState {
  networkMetaData: NetworkInfo | null;
}

const initialState: LedgerState = {
  networkMetaData: null,
};

export const ledgerSlice = createSlice({
  name: "ledger",
  initialState,
  reducers: {
    reset: () => initialState,
    setNetworkMetaData: (state, action: PayloadAction<NetworkInfo>) => {
      state.networkMetaData = action.payload;
    },
  },
});

export const { actions: ledgerActions } = ledgerSlice;

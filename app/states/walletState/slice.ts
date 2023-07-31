import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WalletState {
  publicKey: string;
  rememberWalletConnection: boolean;
  nodeHost: string;
  isWalletConnected: boolean;
  blockHeight: number;
}

const initialState: WalletState = {
  publicKey: "",
  rememberWalletConnection: false,
  nodeHost: "",
  isWalletConnected: false,
  blockHeight: 0,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    reset: () => initialState,
    setPublicKey: (state, action: PayloadAction<string>) => {
      state.publicKey = action.payload;
    },
    setRememberWalletConnection: (state, action: PayloadAction<boolean>) => {
      state.rememberWalletConnection = action.payload;
    },
    setNodeHost: (state, action: PayloadAction<string>) => {
      state.nodeHost = action.payload;
    },
    setIsWalletConnected: (state, action: PayloadAction<boolean>) => {
      state.isWalletConnected = action.payload;
    },
    setBlockHeight: (state, action: PayloadAction<number>) => {
      state.blockHeight = action.payload;
    },
    disconnect: (state) => {
      state.isWalletConnected = false;
      state.nodeHost = "";
      state.publicKey = "";
    },
  },
});

export const { actions: walletActions } = walletSlice;

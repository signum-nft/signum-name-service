import { AccountData } from "@/app/types/accountData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountDataMap {
  [key: string]: AccountData;
}

export interface AccountState {
  currentAccount: string;
  isInitialLoadingData: boolean;
  accounts: AccountDataMap;
}

const initialState: AccountState = {
  currentAccount: "",
  isInitialLoadingData: true,
  accounts: {},
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    reset: () => initialState,
    setCurrentAccount: (state, action: PayloadAction<string>) => {
      state.currentAccount = action.payload;
    },
    setAccountData: (state, action: PayloadAction<AccountData>) => {
      const { publicKey } = action.payload;
      state.currentAccount = publicKey;
      state.accounts[publicKey] = action.payload;
      state.isInitialLoadingData = false;
    },
    resetAccountData: (state) => {
      return initialState;
    },
  },
});

export const { actions: accountActions } = accountSlice;

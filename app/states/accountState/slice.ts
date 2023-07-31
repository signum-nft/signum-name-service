import { AccountData } from "@/app/types/accountData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountDataMap {
  [key: string]: AccountData;
}

export interface AccountState {
  accounts: AccountDataMap;
}

const initialState: AccountState = {
  accounts: {},
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    reset: () => initialState,
    setAccountData: (state, action: PayloadAction<AccountData>) => {
      const { publicKey } = action.payload;
      state.accounts[publicKey] = action.payload;
    },
    resetAccountData: (state) => {
      state.accounts = {};
    },
  },
});

export const { actions: accountActions } = accountSlice;

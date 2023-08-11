import { AccountData, AccountDomain } from "@/app/types/accountData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SetAccountDomainsPayload {
  publicKey: string;
  domains: AccountDomain[][];
}
interface AccountDataMap {
  [key: string]: AccountData;
}

export interface AccountState {
  currentAccount: string;
  isLoadingData: boolean;
  accounts: AccountDataMap;
}

const initialState: AccountState = {
  currentAccount: "",
  isLoadingData: true,
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
    setIsLoadingData: (state, action: PayloadAction<boolean>) => {
      state.isLoadingData = action.payload;
    },
    setAccountData: (state, action: PayloadAction<AccountData>) => {
      const { publicKey } = action.payload;
      state.accounts[publicKey] = action.payload;
    },
    setAccountDomains: (
      state,
      action: PayloadAction<SetAccountDomainsPayload>
    ) => {
      const { domains, publicKey } = action.payload;
      if (state.accounts[publicKey]) {
        state.accounts[publicKey].domains = domains;
      }
    },
    addAccountDomains: (
      state,
      action: PayloadAction<SetAccountDomainsPayload>
    ) => {
      const { domains, publicKey } = action.payload;
      const account = state.accounts[publicKey];
      if (account && account.domains) {
        account.domains.push(...domains);
      }
    },

    resetAccountData: (state) => {
      return initialState;
    },
  },
});

export const { actions: accountActions } = accountSlice;

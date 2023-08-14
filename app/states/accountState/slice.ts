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
      // only entirely loaded, when account domains are loaded also
      state.isInitialLoadingData = false;
    },
    resetAccountData: (state) => {
      return initialState;
    },
  },
});

export const { actions: accountActions } = accountSlice;

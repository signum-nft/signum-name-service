import { RootState } from "@/states/store";
import { AccountData } from "@/app/types/accountData";
import { createSelector } from "@reduxjs/toolkit";

export const selectCurrentAccountData = (
  state: RootState
): AccountData | null => {
  if (!state.accountState.currentAccount) return null;
  return state.accountState.accounts[state.accountState.currentAccount] || null;
};

export const selectIsInitialLoading = (state: RootState): boolean => {
  return state.accountState.isInitialLoadingData;
};

export const selectCurrentAccountsDomains = createSelector(
  selectCurrentAccountData,
  (account) => (account ? account.domains : null)
);
export const selectCurrentAccountsDomainStats = createSelector(
  selectCurrentAccountData,
  (account) => (account ? account.domainStats : null)
);

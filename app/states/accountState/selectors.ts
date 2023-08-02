import { RootState } from "@/states/store";
import { AccountData } from "@/app/types/accountData";

export const selectCurrentAccountData = (
  state: RootState
): AccountData | null => {
  if (!state.accountState.currentAccount) return null;
  return state.accountState.accounts[state.accountState.currentAccount] || null;
};

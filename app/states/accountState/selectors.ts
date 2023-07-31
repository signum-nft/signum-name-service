import { RootState } from "@/states/store";
import { AccountData } from "@/app/types/accountData";

export const selectCurrentAccountData = (
  state: RootState
): AccountData | null => {
  if (!state.walletState.publicKey) return null;
  return state.accountState.accounts[state.walletState.publicKey] || null;
};

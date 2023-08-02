import { RootState } from "@/states/store";

export const selectRememberWalletConnection = (state: RootState): boolean =>
  state.walletState.rememberWalletConnection;

export const selectIsWalletConnected = (state: RootState): boolean =>
  state.walletState.isWalletConnected;

export const selectNodeHost = (state: RootState): string =>
  state.walletState.nodeHost;

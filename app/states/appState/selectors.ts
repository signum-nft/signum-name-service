import { RootState } from "@/states/store";
import { createSelector } from "@reduxjs/toolkit";
import { SnackBarState } from "./slice";

export const selectThemeMode = (state: RootState): "dark" | "light" =>
  state.appState.themeMode;

export const selectIsDarkMode = createSelector(
  selectThemeMode,
  (mode) => mode === "dark"
);

export const selectIsOpenShareModal = (state: RootState): boolean =>
  state.appState.isOpenShareModal;

export const selectIsOpenWalletModal = (state: RootState): boolean =>
  state.appState.isOpenWalletModal;

export const selectIsOpenWalletWrongNetworkModal = (
  state: RootState
): boolean => state.appState.isOpenWalletWrongNetworkModal;

export const selectIsOpenSignTransactionModal = (state: RootState): boolean =>
  state.appState.isOpenSignTransactionModal;

export const selectIsOpenAccountSidebar = (state: RootState): boolean =>
  state.appState.isOpenAccountSidebar;

export const selectIsOpenSettingsSidebar = (state: RootState): boolean =>
  state.appState.isOpenSettingsSidebar;

export const selectIsOpenMobileSidebar = (state: RootState): boolean =>
  state.appState.isOpenMobileSidebar;

export const selectIsOpenPhishingAlert = (state: RootState): boolean =>
  state.appState.isOpenPhishingAlert;

export const selectSnackbarState = (state: RootState): SnackBarState =>
  state.appState.snackBar;

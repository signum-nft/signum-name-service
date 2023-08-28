import { RootState } from "@/states/store";
import { createSelector } from "@reduxjs/toolkit";
import { SnackBarState, TableSettings } from "./slice";

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

export const selectIsOpenSidebar = (state: RootState): boolean =>
  state.appState.isOpenSidebar;

export const selectSnackbarState = (state: RootState): SnackBarState =>
  state.appState.snackBar;

export const selectShowConfettiExplosion = (state: RootState): boolean =>
  state.appState.showConfettiExplosion;
export const selectDomainTableSettingsState = (
  state: RootState
): TableSettings => state.appState.domainTableSettings;
export const selectSubdomainTableSettingsState = (
  state: RootState
): TableSettings => state.appState.subdomainTableSettings;

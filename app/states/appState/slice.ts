import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSystemTheme } from "@/app/getSystemTheme";

export type SnackBarState = {
  show: boolean;
  label: string;
  severity: "" | "error" | "warning" | "info" | "success";
};

export interface AppState {
  themeMode: "light" | "dark";
  isOpenShareModal: boolean;
  isOpenWalletModal: boolean;
  isOpenWalletWrongNetworkModal: boolean;
  isOpenSignTransactionModal: boolean;
  isOpenAccountSidebar: boolean;
  isOpenSettingsSidebar: boolean;
  isOpenMobileSidebar: boolean;
  isOpenPhishingAlert: boolean;
  snackBar: SnackBarState;
}

const initialState: AppState = {
  themeMode: getSystemTheme(),
  isOpenShareModal: false,
  isOpenWalletModal: false,
  isOpenWalletWrongNetworkModal: false,
  isOpenSignTransactionModal: false,
  isOpenAccountSidebar: false,
  isOpenSettingsSidebar: false,
  isOpenMobileSidebar: false,
  isOpenPhishingAlert: true,
  snackBar: { show: false, label: "", severity: "" },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    reset: () => initialState,
    setTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.themeMode = action.payload;
    },
    setIsOpenShareModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenShareModal = action.payload;
    },
    setWalletModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenWalletModal = action.payload;
    },
    setWalletWrongNetworkModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenWalletWrongNetworkModal = action.payload;
    },
    setSignTransactionModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenSignTransactionModal = action.payload;
    },
    setAccountSidebar: (state, action: PayloadAction<boolean>) => {
      state.isOpenAccountSidebar = action.payload;
    },
    setSettingsSidebar: (state, action: PayloadAction<boolean>) => {
      state.isOpenSettingsSidebar = action.payload;
    },
    setMobileSidebar: (state, action: PayloadAction<boolean>) => {
      state.isOpenMobileSidebar = action.payload;
    },
    setPhishingAlert: (state, action: PayloadAction<boolean>) => {
      state.isOpenPhishingAlert = action.payload;
    },
    setSnackbar: (state, action: PayloadAction<SnackBarState>) => {
      state.snackBar = action.payload;
    },
  },
});

export const { actions: appActions } = appSlice;

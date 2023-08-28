import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSystemTheme } from "@/app/getSystemTheme";
import { table } from "@multiformats/multiaddr/protocols-table";

export interface TableSettings {
  sortBy: string;
  sortDirection: "asc" | "desc";
  itemsPerPage: number;
}
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
  isOpenSidebar: boolean;
  showConfettiExplosion: boolean;
  snackBar: SnackBarState;
  domainTableSettings: TableSettings;
  subdomainTableSettings: TableSettings;
}

const initialState: AppState = {
  domainTableSettings: {
    itemsPerPage: 10,
    sortBy: "name",
    sortDirection: "asc",
  },
  subdomainTableSettings: {
    itemsPerPage: 10,
    sortBy: "name",
    sortDirection: "asc",
  },
  themeMode: getSystemTheme(),
  isOpenShareModal: false,
  isOpenWalletModal: false,
  isOpenWalletWrongNetworkModal: false,
  isOpenSignTransactionModal: false,
  isOpenSidebar: false,
  showConfettiExplosion: false,
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
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpenSidebar = action.payload;
    },
    setSnackbar: (state, action: PayloadAction<SnackBarState>) => {
      state.snackBar = action.payload;
    },
    showConfettiExplosion: (state, action: PayloadAction<boolean>) => {
      state.showConfettiExplosion = action.payload;
    },
    setTableSettings: (
      state,
      action: PayloadAction<TableSettings & { table: "domains" | "subdomains" }>
    ) => {
      const { table, ...payload } = action.payload;
      if (table === "domains") {
        state.domainTableSettings = payload;
      } else {
        state.subdomainTableSettings = payload;
      }
    },
  },
});

export const { actions: appActions } = appSlice;

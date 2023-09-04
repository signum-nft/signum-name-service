import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSystemTheme } from "@/app/getSystemTheme";
import SvgIcon from "@mui/material/SvgIcon";

export interface BreadCrumbItem {
  label: string;
  href: string;
  icon: typeof SvgIcon;
}

export interface TableSettings {
  sortBy: string;
  sortDirection: "asc" | "desc";
  itemsPerPage: number;
}

interface TableSettingsArgs {
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  itemsPerPage?: number;
}

export const DefaultTableSettings: TableSettings = {
  itemsPerPage: 10,
  sortBy: "name",
  sortDirection: "asc",
};

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
  breadcrumbs: BreadCrumbItem[];
}

const initialState: AppState = {
  domainTableSettings: DefaultTableSettings,
  subdomainTableSettings: DefaultTableSettings,
  themeMode: getSystemTheme(),
  isOpenShareModal: false,
  isOpenWalletModal: false,
  isOpenWalletWrongNetworkModal: false,
  isOpenSignTransactionModal: false,
  isOpenSidebar: false,
  showConfettiExplosion: false,
  snackBar: { show: false, label: "", severity: "" },
  breadcrumbs: [],
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
    setBreadcrumbs: (state, action: PayloadAction<BreadCrumbItem[]>) => {
      state.breadcrumbs = action.payload;
    },
    setTableSettings: (
      state,
      action: PayloadAction<
        TableSettingsArgs & { table: "domains" | "subdomains" }
      >
    ) => {
      const { table, ...payload } = action.payload;
      if (table === "domains") {
        state.domainTableSettings = {
          ...state.domainTableSettings,
          ...payload,
        };
      } else {
        state.subdomainTableSettings = {
          ...state.subdomainTableSettings,
          ...payload,
        };
      }
    },
  },
});

export const { actions: appActions } = appSlice;

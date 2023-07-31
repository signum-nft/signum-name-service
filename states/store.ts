import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
} from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
  PersistConfig,
} from "redux-persist";
import { isClientSide } from "@/app/isClientSide";
import { storage } from "./storage";

import { appSlice } from "@/app/states/appState";
import { walletSlice } from "@/app/states/walletState";
import { tokenSlice } from "@/app/states/tokenState";
import { transactionSlice } from "@/app/states/transactionState";
import { accountSlice } from "@/app/states/accountState";
import { marketSlice } from "@/app/states/marketState";
import { portfolioSlice } from "@/app/states/portfolioState";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

function persist<T = any>(config: PersistConfig<any>, reducer: Reducer) {
  return isClientSide()
    ? persistReducer<T, AnyAction>(config, reducer)
    : reducer;
}

const appPersistConfig: PersistConfig<any> = {
  key: "app",
  version: 4,
  storage,
  // persist only the mentioned fields.
  whitelist: ["themeMode", "isOpenPhishingAlert"],
};

const marketPersistConfig: PersistConfig<any> = {
  key: "market",
  version: 4,
  storage,
};

const walletPersistConfig: PersistConfig<any> = {
  key: "wallet",
  version: 5,
  storage,
  whitelist: [
    "rememberWalletConnection",
    "publicKey",
    "blockHeight",
    "isWalletConnected",
    "nodeHost",
  ],
};

const tokensPersistConfig: PersistConfig<any> = {
  key: "tokens",
  version: 4,
  storage,
  whitelist: [
    "isOpenCreateTokenModal",
    "favoriteTokenIds",
    "hiddenTokenIds",
    "tokens",
    "tradingTokenIds",
    "latestActiveTokens",
  ],
  blacklist: ["isSyncingLatestActiveTokens"],
};

const accountPersistConfig: PersistConfig<any> = {
  key: "account",
  version: 4,
  storage,
  stateReconciler: autoMergeLevel2,
};

const portfolioPersistConfig: PersistConfig<any> = {
  key: "portfolio",
  version: 5,
  storage,
};

const spotTradePersistConfig: PersistConfig<any> = {
  key: "spotTrade",
  version: 4,
  storage,
};

const transactionPersistConfig: PersistConfig<any> = {
  key: "transaction",
  version: 3,
  storage,
  whitelist: ["monitoredTransactions", "pendingTransactions"],
};

const rootReducer = combineReducers({
  appState: persist<ReturnType<typeof appSlice.reducer>>(
    appPersistConfig,
    appSlice.reducer
  ),
  marketState: persist<ReturnType<typeof marketSlice.reducer>>(
    marketPersistConfig,
    marketSlice.reducer
  ),
  walletState: persist<ReturnType<typeof walletSlice.reducer>>(
    walletPersistConfig,
    walletSlice.reducer
  ),
  tokenState: persist<ReturnType<typeof tokenSlice.reducer>>(
    tokensPersistConfig,
    tokenSlice.reducer
  ),
  accountState: persist<ReturnType<typeof accountSlice.reducer>>(
    accountPersistConfig,
    accountSlice.reducer
  ),
  portfolioState: persist<ReturnType<typeof portfolioSlice.reducer>>(
    portfolioPersistConfig,
    portfolioSlice.reducer
  ),
  transactionState: persist<ReturnType<typeof transactionSlice.reducer>>(
    transactionPersistConfig,
    transactionSlice.reducer
  ),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const storePersistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

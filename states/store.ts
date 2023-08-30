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
import { transactionSlice } from "@/app/states/transactionState";
import { accountSlice } from "@/app/states/accountState";
import { subdomainOperationSlice } from "@/app/states/subdomainOperationState";
import { ledgerSlice } from "@/app/states/ledgerState";

function persist<T = any>(config: PersistConfig<any>, reducer: Reducer) {
  return isClientSide()
    ? persistReducer<T, AnyAction>(config, reducer)
    : reducer;
}

const appPersistConfig: PersistConfig<any> = {
  key: "app",
  version: 1,
  storage,
  // persist only the mentioned fields.
  whitelist: ["themeMode", "domainTableSettings", "subdomainTableSettings"],
};

const ledgerPersistConfig: PersistConfig<any> = {
  key: "ledger",
  version: 1,
  storage,
};

const accountPersistConfig: PersistConfig<any> = {
  key: "account",
  version: 1,
  storage,
  blacklist: ["isLoadingData"],
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
  ledgerState: persist<ReturnType<typeof ledgerSlice.reducer>>(
    ledgerPersistConfig,
    ledgerSlice.reducer
  ),
  accountState: persist<ReturnType<typeof accountSlice.reducer>>(
    accountPersistConfig,
    accountSlice.reducer
  ),
  transactionState: persist<ReturnType<typeof transactionSlice.reducer>>(
    transactionPersistConfig,
    transactionSlice.reducer
  ),
  subdomainOperationState: subdomainOperationSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.subdomain.__listElement", "payload.icon"],
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const storePersistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

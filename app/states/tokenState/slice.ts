import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset, AssetOrder, AssetTrade } from "@signumjs/core";
import { TokenMetaData } from "@/app/types/tokenMetaData";
import { FlagMap } from "@/app/types/flagMap";
import {
  TokenTransactionalData,
  DefaultTransactionalData,
} from "@/app/types/tokenTransactionalData";
import { Config } from "@/app/config";

export interface TokenOrders {
  buy: AssetOrder[];
  sell: AssetOrder[];
}

interface TokenData {
  metaData: TokenMetaData;
  transactionalData: TokenTransactionalData;
  trades: AssetTrade[];
  orders: TokenOrders;
}

export interface TokenMap {
  [key: string]: TokenData;
}

export interface LatestTokenMap {
  [key: string]: Asset;
}

export interface TokenState {
  tokens: TokenMap;
  hiddenTokenIds: FlagMap;
  favoriteTokenIds: FlagMap;
  tradingTokenIds: FlagMap;
  latestActiveTokens: LatestTokenMap;
  isSyncingLatestActiveTokens: boolean;
  isOpenCreateTokenModal: boolean;
}

const initialState: TokenState = {
  tokens: {},
  hiddenTokenIds: {},
  favoriteTokenIds: {},
  tradingTokenIds: {
    // Default TRT token that will always be on the list
    [Config.Signum.TokenTrtId]: true,
  },
  latestActiveTokens: {},
  isSyncingLatestActiveTokens: false,
  isOpenCreateTokenModal: true,
};

export const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    reset: () => initialState,
    storeTokenMetaData: (state, action: PayloadAction<TokenMetaData>) => {
      const metaData = action.payload;
      if (!state.tokens[metaData.id]) {
        state.tokens[metaData.id] = {
          metaData,
          transactionalData: DefaultTransactionalData,
          trades: [],
          orders: { buy: [], sell: [] },
        };
      } else {
        state.tokens[metaData.id].metaData = metaData;
      }
    },
    updateTokenTrades: (
      state,
      action: PayloadAction<{ id: string; trades: AssetTrade[] }>
    ) => {
      const { id, trades } = action.payload;
      if (state.tokens[id]) {
        state.tokens[id].trades = [...trades];
      }
    },
    updateTokenOrders: (
      state,
      action: PayloadAction<{ id: string; orders: TokenOrders }>
    ) => {
      const { id, orders } = action.payload;
      if (state.tokens[id]) {
        state.tokens[id].orders = orders;
      }
    },
    updateTokenTransactionalData: (
      state,
      action: PayloadAction<{ id: string; data: TokenTransactionalData }>
    ) => {
      const { id, data } = action.payload;
      if (state.tokens[id]) {
        state.tokens[id].transactionalData = data;
      }
    },
    hideToken: (state, action: PayloadAction<string>) => {
      state.hiddenTokenIds[action.payload] = true;
    },
    unhideToken: (state, action: PayloadAction<string>) => {
      delete state.hiddenTokenIds[action.payload];
    },
    addTokenToFavoritesList: (state, action: PayloadAction<string>) => {
      state.favoriteTokenIds[action.payload] = true;
    },
    removeTokenFromFavoritesList: (state, action: PayloadAction<string>) => {
      delete state.favoriteTokenIds[action.payload];
    },
    addTokenToTradingList: (state, action: PayloadAction<string>) => {
      state.tradingTokenIds[action.payload] = true;
    },
    removeTokenFromTradingList: (state, action: PayloadAction<string>) => {
      delete state.tradingTokenIds[action.payload];
    },
    addTokenToLatestActiveList: (state, action: PayloadAction<Asset>) => {
      state.latestActiveTokens[action.payload.asset] = action.payload;
    },
    purgeLatestActiveList: (state, action: PayloadAction<string[]>) => {
      const currentActiveIds = new Set(action.payload);
      for (let cachedId of Object.keys(state.tokens)) {
        if (!currentActiveIds.has(cachedId)) {
          delete state.latestActiveTokens[cachedId];
        }
      }
    },
    setIsSyncingLatestActiveTokens: (state, action: PayloadAction<boolean>) => {
      state.isSyncingLatestActiveTokens = action.payload;
    },
    setIsOpenCreateTokenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenCreateTokenModal = action.payload;
    },
  },
});

export const { actions: tokenActions } = tokenSlice;

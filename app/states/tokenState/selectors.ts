import { AssetTrade } from "@signumjs/core";
import { RootState } from "@/states/store";
import { TokenMetaData, TokenMetaDataMap } from "@/app/types/tokenMetaData";
import { FlagMap } from "@/app/types/flagMap";
import { TokenTransactionalData } from "@/app/types/tokenTransactionalData";
import { TokenMap, TokenOrders } from "./slice";

export const selectTokens = (state: RootState): TokenMap =>
  state.tokenState.tokens;

export const selectHiddenTokenIds = (state: RootState): FlagMap =>
  state.tokenState.hiddenTokenIds;

export const selectFavoriteTokenIds = (state: RootState): FlagMap =>
  state.tokenState.favoriteTokenIds;

export const selectTradingTokenIds = (state: RootState): FlagMap =>
  state.tokenState.tradingTokenIds;

export const selectTokenMetaData =
  (tokenId: string) =>
  (state: RootState): TokenMetaData | null =>
    state.tokenState.tokens[tokenId]
      ? state.tokenState.tokens[tokenId].metaData
      : null;

export const selectTokenMetaDataMap = (state: RootState): TokenMetaDataMap =>
  Object.keys(state.tokenState.tokens).reduce((map, k) => {
    map[k] = state.tokenState.tokens[k].metaData;
    return map;
  }, {} as TokenMetaDataMap);

export const selectTokenTransactionalData =
  (tokenId: string) =>
  (state: RootState): TokenTransactionalData | null =>
    state.tokenState.tokens[tokenId]
      ? state.tokenState.tokens[tokenId].transactionalData
      : null;

export const selectTokenTrades =
  (tokenId: string) =>
  (state: RootState): AssetTrade[] =>
    state.tokenState.tokens[tokenId]
      ? state.tokenState.tokens[tokenId].trades
      : [];

export const selectTokenOrders =
  (tokenId: string) =>
  (state: RootState): TokenOrders =>
    state.tokenState.tokens[tokenId]
      ? state.tokenState.tokens[tokenId].orders
      : { buy: [], sell: [] };

export const selectIsOpenCreateTokenModal = (state: RootState): boolean =>
  state.tokenState.isOpenCreateTokenModal;

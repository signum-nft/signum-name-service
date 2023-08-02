import { RootState } from "@/states/store";
import { NetworkInfo } from "@signumjs/core";

export const selectCurrentBlockHeight = (state: RootState): number =>
  state.ledgerState.currentBlockHeight;
export const selectCurrentNodeHost = (state: RootState): number =>
  state.ledgerState.currentNodeHost;

export const selectAmountSuffix = (state: RootState): string => {
  const metaData = state.ledgerState.networkMetaData as NetworkInfo;
  if (!metaData) return "";
  return metaData.valueSuffix;
};
export const selectAddressPrefix = (state: RootState): string => {
  const metaData = state.ledgerState.networkMetaData as NetworkInfo;
  if (!metaData) return "";
  return metaData.addressPrefix;
};

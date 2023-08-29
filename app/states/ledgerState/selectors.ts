import { RootState } from "@/states/store";
import { NetworkInfo } from "@signumjs/core";

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

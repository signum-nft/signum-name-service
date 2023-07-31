import { DefaultTokenMetaData, TokenMetaData } from "./tokenMetaData";
import { ChainValue } from "@signumjs/util";

export interface TokenBalance {
  token: TokenMetaData;
  availableBalance: ChainValue;
  reservedBalance: ChainValue;
  totalBalance: ChainValue;
}

const defaultBalance = ChainValue.create(0);
export const DefaultTokenBalance: TokenBalance = {
  token: DefaultTokenMetaData,
  availableBalance: defaultBalance,
  reservedBalance: defaultBalance,
  totalBalance: defaultBalance,
};

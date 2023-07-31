import { useMemo } from "react";
import { TokenBalance, DefaultTokenBalance } from "@/app/types/tokenBalance";
import { useAccount } from "./useAccount";

export const useTokenBalance = (tokenId: string): TokenBalance => {
  const { tokenBalances } = useAccount();

  return useMemo(() => {
    let balance = DefaultTokenBalance;

    tokenBalances.forEach((tokenData) => {
      if (tokenData.token.id == tokenId) balance = tokenData;
    });

    return balance;
  }, [tokenId, tokenBalances]);
};

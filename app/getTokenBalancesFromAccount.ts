import { ChainValue } from "@signumjs/util";
import { AccountData } from "@/app/types/accountData";
import { TokenBalance } from "./types/tokenBalance";
import { TokenMetaDataMap } from "@/app/types/tokenMetaData";

export function getTokenBalancesFromAccount(
  account: AccountData,
  tokens: TokenMetaDataMap
) {
  const balanceMap = new Map<string, TokenBalance>();

  account.assetBalances?.forEach((b) => {
    const tokenMetaData = tokens[b.asset];
    if (tokenMetaData) {
      balanceMap.set(tokenMetaData.id, {
        token: tokenMetaData,
        totalBalance: ChainValue.create(tokenMetaData.decimals).setAtomic(
          b.balanceQNT
        ),
        availableBalance: ChainValue.create(tokenMetaData.decimals),
        reservedBalance: ChainValue.create(tokenMetaData.decimals),
      });
    }
  });

  account.unconfirmedAssetBalances?.forEach((u) => {
    const tokenMetaData = tokens[u.asset];
    if (tokenMetaData) {
      const tokenBalance = balanceMap.get(tokenMetaData.id);
      balanceMap.set(tokenMetaData.id, {
        token: tokenMetaData,
        totalBalance: tokenBalance
          ? tokenBalance.totalBalance
          : ChainValue.create(tokenMetaData.decimals).setAtomic(
              u.unconfirmedBalanceQNT
            ),
        availableBalance: ChainValue.create(tokenMetaData.decimals).setAtomic(
          u.unconfirmedBalanceQNT
        ),
        reservedBalance: tokenBalance
          ? tokenBalance.totalBalance
              .clone()
              .subtract(
                ChainValue.create(tokenMetaData.decimals).setAtomic(
                  u.unconfirmedBalanceQNT
                )
              )
          : ChainValue.create(tokenMetaData.decimals).setAtomic(
              u.unconfirmedBalanceQNT
            ),
      });
    }
  });

  return Array.from(balanceMap.values());
}

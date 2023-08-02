import { useAppSelector } from "@/states/hooks";
import { Amount } from "@signumjs/util";
import { getBalancesFromAccount } from "@/app/getBalancesFromAccount";
import { useMemo } from "react";
import { TokenBalance } from "@/app/types/tokenBalance";
import { AccountBalance } from "@/app/types/accountBalance";
import { getTokenBalancesFromAccount } from "@/app/getTokenBalancesFromAccount";
import { selectTokenMetaDataMap } from "@/app/states/tokenState";
import { selectCurrentAccountData } from "@/app/states/accountState";

export interface EasyAccountData {
  accountId: string;
  accountRS: string;
  publicKey: string;
  name: string;
  description: string;
  balance: AccountBalance;
  // tokenBalances: TokenBalance[];
}

const InitialAccountData: EasyAccountData = {
  accountId: "",
  name: "",
  description: "",
  publicKey: "",
  accountRS: "",
  balance: {
    totalBalance: Amount.Zero(),
    committedBalance: Amount.Zero(),
    availableBalance: Amount.Zero(),
    reservedBalance: Amount.Zero(),
  },
  // tokenBalances: [],
};

export const useAccount = (): EasyAccountData => {
  const account = useAppSelector(selectCurrentAccountData);
  // const tokenMetaDataMap = useAppSelector(selectTokenMetaDataMap);

  console.log("account", account?.accountRS);

  return useMemo(() => {
    if (!account) return InitialAccountData;
    const balance = getBalancesFromAccount(account);
    // const tokenBalances = getTokenBalancesFromAccount(
    //   account,
    //   // tokenMetaDataMap
    // );
    return {
      accountId: account.account,
      name: account.name,
      description: account.description,
      accountRS: account.accountRS,
      publicKey: account.publicKey,
      // tokenBalances,
      balance,
    };
  }, [account]);
};

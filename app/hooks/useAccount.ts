import { useAppSelector } from "@/states/hooks";
import { Amount } from "@signumjs/util";
import { getBalancesFromAccount } from "@/app/getBalancesFromAccount";
import { useMemo } from "react";
import { AccountBalance } from "@/app/types/accountBalance";
import { selectCurrentAccountData } from "@/app/states/accountState";

export interface EasyAccountData {
  accountId: string;
  accountRS: string;
  publicKey: string;
  name: string;
  description: string;
  balance: AccountBalance;
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
};

export const useAccount = (): EasyAccountData => {
  const account = useAppSelector(selectCurrentAccountData);

  return useMemo(() => {
    if (!account) return InitialAccountData;
    const balance = getBalancesFromAccount(account);
    return {
      accountId: account.account,
      name: account.name,
      description: account.description,
      accountRS: account.accountRS,
      publicKey: account.publicKey,
      balance,
    };
  }, [account]);
};

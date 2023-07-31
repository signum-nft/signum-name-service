import { Amount } from "@signumjs/util";
import { AccountData } from "@/app/types/accountData";

export function getBalancesFromAccount(account: AccountData) {
  const totalBalance = Amount.fromPlanck(account.balanceNQT || "0");
  const availableBalance = Amount.fromPlanck(
    account.unconfirmedBalanceNQT || "0"
  );
  const lockedBalance = totalBalance.clone().subtract(availableBalance);
  const committedBalance = Amount.fromPlanck(
    account.committedBalanceNQT || "0"
  );
  const reservedBalance = lockedBalance.clone().subtract(committedBalance);
  return {
    availableBalance,
    committedBalance,
    reservedBalance,
    totalBalance,
  };
}

import { useAppDispatch } from "@/states/hooks";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { accountActions } from "@/app/states/accountState";
import { useEffect } from "react";
import useSWR from "swr";
import { useXTWallet } from "@/features/xtWallet/useXTWallet";

export const AccountInitializer = () => {
  const { ledgerService } = useLedgerService();
  const { account } = useXTWallet();
  const dispatch = useAppDispatch();

  const accountId = account ? account.address.getNumericId() : null;

  const { data: accountData } = useSWR(
    ledgerService && accountId ? `/fetchAccount/${accountId}` : null,
    () => {
      console.log("fetchData", accountId);

      if (!(ledgerService && accountId)) return null;
      return ledgerService.account.fetchAccount(accountId);
    },
    {
      refreshInterval: 30_000,
    }
  );

  useEffect(() => {
    console.log("update account", account);
    if (!account) return;

    dispatch(accountActions.setCurrentAccount(account.address.getPublicKey()));
  }, [account, dispatch]);

  useEffect(() => {
    if (!accountData) return;
    dispatch(accountActions.setAccountData(accountData));
  }, [accountData, dispatch]);

  return null;
};

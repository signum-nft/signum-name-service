import { useAppDispatch } from "@/states/hooks";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { accountActions } from "@/app/states/accountState";
import { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useXTWallet } from "@/features/xtWallet/useXTWallet";
import { useAppContext } from "@/app/hooks/useAppContext";
import { AvgBlocktimeInMilliseconds } from "@/app/types/avgBlocktime";
import { fetchAccountDomains } from "./fetchAccountDomains";
import { useTransactionMonitor } from "@/app/hooks/useTransactionMonitor";

export const AccountLoader = () => {
  const {
    Platform: { MaxAliasLoad, MaxSubdomains },
  } = useAppContext();
  const { ledgerService } = useLedgerService();
  const { account } = useXTWallet();
  const dispatch = useAppDispatch();
  const transactionMonitor = useTransactionMonitor();
  const accountId = account ? account.address.getNumericId() : null;
  const { mutate } = useSWRConfig();

  useSWR(
    ledgerService && accountId ? `/account/${accountId}` : null,
    async () => {
      if (!(ledgerService && accountId)) return null;

      const [accountData, accountDomains] = await Promise.all([
        ledgerService.account.fetchAccount(accountId),
        fetchAccountDomains({
          accountId,
          ledgerService,
          maxAliasLoad: MaxAliasLoad,
          maxSubdomains: MaxSubdomains,
        }),
      ]);

      const { domains, domainStats } = accountDomains;
      dispatch(
        accountActions.setAccountData({ ...accountData, domains, domainStats })
      );
    },
    {
      refreshInterval: AvgBlocktimeInMilliseconds / 2,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (account) {
      dispatch(
        accountActions.setCurrentAccount(account.address.getPublicKey())
      );
    }
  }, [account, dispatch]);

  useEffect(() => {
    // update alias list, when alias was removed or added
    if (!transactionMonitor) return;
    if (!accountId) return;
    const monitor = transactionMonitor.monitor;
    const type = monitor.type.toLowerCase();
    if (type.includes("add") || type.includes("delete")) {
      console.debug("Invalidating account data");
      mutate(`/account/${accountId}`);
    }
  }, [accountId, transactionMonitor, mutate]);

  return null;
};

import { useAppDispatch } from "@/states/hooks";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { accountActions } from "@/app/states/accountState";
import { useEffect } from "react";
import useSWR from "swr";
import { useXTWallet } from "@/features/xtWallet/useXTWallet";
import { useAppContext } from "@/app/hooks/useAppContext";
import { AvgBlocktimeInMilliseconds } from "@/app/types/avgBlocktime";
import { fetchAccountDomains } from "./fetchAccountDomains";

export const AccountLoader = () => {
  const {
    Platform: { MaxAliasLoad, MaxSubdomains },
  } = useAppContext();
  const { ledgerService } = useLedgerService();
  const { account } = useXTWallet();
  const dispatch = useAppDispatch();

  const accountId = account ? account.address.getNumericId() : null;

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
      refreshInterval: 30_000,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  useEffect(() => {
    if (accountId) {
      dispatch(accountActions.setCurrentAccount(accountId));
    }
  }, [accountId, dispatch]);

  return null;
};

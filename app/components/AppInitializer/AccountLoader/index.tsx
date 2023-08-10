import { useAppDispatch } from "@/states/hooks";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { accountActions } from "@/app/states/accountState";
import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { useXTWallet } from "@/features/xtWallet/useXTWallet";
import { AccountDomainList } from "@/app/types/accountData";
import { useAppContext } from "@/app/hooks/useAppContext";
import { fetchLinkedDomainList } from "./fetchLinkedDomainList";
import { AvgBlocktimeInMilliseconds } from "@/app/types/avgBlocktime";

export const AccountLoader = () => {
  const {
    Platform: { MaxAliasLoad, MaxSubdomains },
  } = useAppContext();
  const { ledgerService } = useLedgerService();
  const { account } = useXTWallet();
  const dispatch = useAppDispatch();

  const accountId = account ? account.address.getNumericId() : null;

  const { data: accountData } = useSWR(
    ledgerService && accountId ? `/account/${accountId}` : null,
    async () => {
      if (!(ledgerService && accountId)) return null;
      dispatch(accountActions.setIsLoadingData(true));
      const account = await ledgerService.account.fetchAccount(accountId);
      dispatch(accountActions.setIsLoadingData(false));
      return account;
    },
    {
      refreshInterval: AvgBlocktimeInMilliseconds,
      dedupingInterval: AvgBlocktimeInMilliseconds - 20_000,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const fetchAccountDomains = useCallback(async () => {
    if (!(ledgerService && accountData)) return;

    dispatch(accountActions.setIsLoadingData(true));
    let domainCount = 0;
    let startIndex: number | undefined = 0;
    while (startIndex !== undefined && domainCount <= MaxAliasLoad) {
      // @ts-ignore
      const { nextIndex, aliases } =
        await ledgerService.alias.fetchAccountAliases({
          accountId: accountData.account,
          startIndex: startIndex ?? 0,
          count: Math.min(500, MaxAliasLoad - domainCount),
        });

      const domains: AccountDomainList[] = [];
      const subdomainRequests = aliases.map(async (alias) => {
        const { head } = await fetchLinkedDomainList({
          ledger: ledgerService.ledgerInstance,
          alias,
          maxSubdomains: MaxSubdomains,
        });
        domains.push(head);
      });
      await Promise.all(subdomainRequests);
      startIndex = nextIndex;
      domainCount += aliases.length;
      dispatch(
        accountActions.setAccountDomains({
          publicKey: accountData.publicKey,
          domains,
        })
      );
      dispatch(accountActions.setIsLoadingData(false));
      // if(domainCount >= MaxAliasLoad){
      //   break;
      // }
    }
  }, [MaxAliasLoad, MaxSubdomains, accountData, dispatch, ledgerService]);

  useEffect(() => {
    if (!account) return;
    dispatch(accountActions.setCurrentAccount(account.address.getPublicKey()));
  }, [account, dispatch]);

  useEffect(() => {
    if (!accountData) return;
    dispatch(accountActions.setAccountData(accountData));
    fetchAccountDomains();
  }, [accountData, dispatch, fetchAccountDomains]);

  return null;
};

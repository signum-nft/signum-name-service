import { useAppDispatch } from "@/states/hooks";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { accountActions } from "@/app/states/accountState";
import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { useXTWallet } from "@/features/xtWallet/useXTWallet";
import { useAppContext } from "@/app/hooks/useAppContext";
import { AvgBlocktimeInMilliseconds } from "@/app/types/avgBlocktime";
import { createLinkedDomainList } from "@/app/components/AppInitializer/AccountLoader/createLinkedDomainList";
import { Alias } from "@signumjs/core";
import { AccountDomain } from "@/app/types/accountData";

function createToLookupMapFromAliasArray(aliases: Alias[]) {
  const map = new Map<string, Alias>();
  for (let a of aliases) {
    const aliasName =
      a.tldName === "signum" ? a.aliasName : `${a.aliasName}:${a.tldName}`;
    map.set(aliasName, a);
  }
  return map;
}

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
      return await ledgerService.account.fetchAccount(accountId);
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

    let domainCount = 0;
    let startIndex: number | undefined = 0;
    let loadedAliases: Alias[] = [];
    // fetching up to maximum aliases from ledger
    while (startIndex !== undefined && domainCount <= MaxAliasLoad) {
      // @ts-ignore
      const { nextIndex, aliases } =
        await ledgerService.alias.fetchAccountAliases({
          accountId: accountData.account,
          startIndex: startIndex ?? 0,
          count: Math.min(500, MaxAliasLoad - domainCount),
        });
      loadedAliases.push(...aliases);
      startIndex = nextIndex;
      domainCount += aliases.length;
    }

    // organize subdomains
    let domains: AccountDomain[][] = [];
    let ignoreAliasIds = new Set<string>();
    const lookupMap = createToLookupMapFromAliasArray(loadedAliases);
    for (let a of loadedAliases) {
      // skip aliases which are already identified as subdomains.
      if (ignoreAliasIds.has(a.alias)) {
        continue;
      }

      // create domain list: first in list are main domains, tail is related subdomain list.
      const { list } = createLinkedDomainList({
        domain: a,
        lookupMap,
        maxSubdomains: MaxSubdomains,
      });

      domains.push(list.toArray());
      // add domain and its subdomain to ignore list
      for (let d of list) {
        ignoreAliasIds.add(d.id);
      }
    }
    dispatch(
      accountActions.setAccountDomains({
        publicKey: accountData.publicKey,
        domains,
      })
    );
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

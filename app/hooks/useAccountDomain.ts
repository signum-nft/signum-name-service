import { useAppSelector } from "@/states/hooks";
import {
  selectCurrentAccountsDomains,
  selectIsInitialLoading,
} from "@/app/states/accountState";
import { useMemo } from "react";
import { AccountDomain } from "@/app/types/accountData";
import LinkedList from "fast-linked-list";

export const useAccountDomain = (domainName: string) => {
  const accountDomains = useAppSelector(selectCurrentAccountsDomains);
  const isLoading = useAppSelector(selectIsInitialLoading);
  const [domain, tld] = domainName.toLowerCase().split(":");
  const domainList = useMemo(() => {
    console.log("useAccountDomain", accountDomains);

    if (isLoading) return null;

    if (accountDomains) {
      const foundDomain = accountDomains.find((domains) => {
        if (!domains.length) return false;
        const head = domains[0];
        return (
          head.name.toLowerCase() === domain && head.tld?.toLowerCase() === tld
        );
      });

      if (foundDomain) {
        return new LinkedList<AccountDomain>(...foundDomain);
      }
    }
    return null;
  }, [accountDomains, domain, domainName, tld, isLoading]);

  return { domainList, domain, tld };
};

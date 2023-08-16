import { useAppSelector } from "@/states/hooks";
import {
  selectCurrentAccountsDomains,
  selectIsInitialLoading,
} from "@/app/states/accountState";
import { useMemo, useState } from "react";
import { AccountDomain } from "@/app/types/accountData";
import LinkedList from "fast-linked-list";

export const useAccountDomain = (domainName: string) => {
  const accountDomains = useAppSelector(selectCurrentAccountsDomains);
  const isLoading = useAppSelector(selectIsInitialLoading);
  const [isReady, setIsReady] = useState(false);
  const [domain, tld] = domainName.toLowerCase().split(":");
  const domainList = useMemo(() => {
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
        setIsReady(true);
        return new LinkedList<AccountDomain>(...foundDomain);
      }
    }
    setIsReady(true);
    return null;
  }, [accountDomains, domain, domainName, tld, isLoading]);

  return { domainList, domain, tld, isReady };
};

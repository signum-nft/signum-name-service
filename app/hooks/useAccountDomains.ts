import { useAppSelector } from "@/states/hooks";
import {
  selectCurrentAccountData,
  selectIsInitialLoading,
} from "@/app/states/accountState";
import { useMemo } from "react";
import { AccountDomain } from "@/app/types/accountData";
import LinkedList from "fast-linked-list";

export const useAccountDomains = () => {
  const account = useAppSelector(selectCurrentAccountData);
  const isLoading = useAppSelector(selectIsInitialLoading);
  const domainLists = useMemo(() => {
    if (account?.domains) {
      return account.domains.map(
        (list) => new LinkedList<AccountDomain>(...list)
      );
    }
    return [];
  }, [account]);

  return { domainLists, isLoading };
};

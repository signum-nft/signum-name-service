import { useLedgerService } from "@/app/hooks/useLedgerService";
import useSWR from "swr";

export const useTopLevelDomains = () => {
  const { ledgerService } = useLedgerService();

  const { data, error } = useSWR(
    ledgerService ? "/TopLevelDomainList" : null,
    async () => {
      if (!ledgerService) return undefined;
      return ledgerService.alias.fetchTopLevelDomains({
        startIndex: 0,
        count: 500,
      });
    },
    {
      refreshInterval: 120_000,
      dedupingInterval: 100_000,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const isLoading = !error && !data;

  return { tlds: data?.tlds, isLoading };
};

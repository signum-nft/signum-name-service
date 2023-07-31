import { useLedgerService } from "@/app/hooks/useLedgerService";
import useSWR from "swr";

export const useAlias = (aliasId: string) => {
  const { ledgerService } = useLedgerService();

  const { data, error } = useSWR(
    ledgerService ? `alias/${aliasId}` : null,
    async () => {
      if (!ledgerService || !aliasId) return undefined;
      return ledgerService.alias.fetchAliasById(aliasId);
    },
    {
      refreshInterval: 30_000,
    }
  );

  const isLoading = !error && !data;

  return { alias: data, isLoading };
};

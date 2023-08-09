import { useAccount } from "@/app/hooks/useAccount";
import { useLedgerService } from "@/app/hooks/useLedgerService";

import useSWR from "swr";

export const useAccountAliases = () => {
  const { ledgerService } = useLedgerService();
  const { accountId } = useAccount();

  const { data, error } = useSWR(
    ledgerService ? `account/${accountId}/aliases` : null,
    async () => {
      if (!ledgerService || !accountId) return;

      return (
        await ledgerService.alias.fetchAccountAliases({
          accountId,
          startIndex: 0,
          count: 500,
        })
      ).aliases;
    },
    {
      refreshInterval: 120_000,
    }
  );

  const isLoading = !error && !data;

  return { aliases: data || [], isLoading, accountId };
};

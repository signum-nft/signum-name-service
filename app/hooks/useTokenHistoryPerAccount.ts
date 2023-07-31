import { useLedgerService } from "@/app/hooks/useLedgerService";
import useSWR from "swr";

export const useTokenHistoryPerAccount = ({
  tokenId,
  accountId,
}: {
  tokenId: string;
  accountId: string;
}) => {
  const { ledgerService } = useLedgerService();

  const { data, error } = useSWR(
    ledgerService ? `account/${accountId}/token/${tokenId}/history` : null,
    async () => {
      if (!ledgerService) return undefined;
      if (!accountId) return undefined;
      if (!tokenId) return undefined;

      return ledgerService.account
        .with(accountId)
        .fetchTradeHistory({ tokenId, startIndex: 0, count: 100 });
    },
    {
      refreshInterval: 30_000,
    }
  );

  const isLoading = !error && !data;

  return { accountTokenHistory: data?.tradeJournal || [], isLoading };
};

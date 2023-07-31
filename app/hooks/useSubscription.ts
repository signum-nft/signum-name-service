import { useLedgerService } from "@/app/hooks/useLedgerService";
import useSWR from "swr";

export const useSubscription = (subscriptionId: string) => {
  const { ledgerService } = useLedgerService();

  const { data, error } = useSWR(
    ledgerService ? `subscription/${subscriptionId}` : null,
    async () => {
      if (!ledgerService || !subscriptionId) return undefined;
      return ledgerService.subscription.fetchSubscription(subscriptionId);
    },
    {
      refreshInterval: 30_000,
      dedupingInterval: 30_000,
      shouldRetryOnError: false,
    }
  );

  const isLoading = !error && !data;

  return { subscription: data, isLoading };
};

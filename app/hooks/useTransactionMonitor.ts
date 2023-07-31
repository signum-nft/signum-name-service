import { useEffect, useState } from "react";
import { Transaction } from "@signumjs/core";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { Monitor } from "@/app/states/transactionState";

import useSWR from "swr";

interface ConfirmedTransactionMonitor {
  monitor: Monitor;
  confirmedTransaction: Transaction;
}

export const useTransactionMonitor = () => {
  const { ledgerService } = useLedgerService();
  const [monitor, setMonitor] = useState<Monitor | null>(null);

  const { data } = useSWR(
    ledgerService && monitor
      ? `fetchConfirmedTransaction/${monitor.transactionId}`
      : null,
    async () => {
      if (!ledgerService) return null;
      if (!monitor) return null;

      const confirmedTransaction =
        await ledgerService.transaction.fetchSingleTransaction(
          monitor.transactionId
        );

      return {
        monitor,
        confirmedTransaction,
      };
    }
  );

  useEffect(() => {
    function handleConfirmedTx(e: Event) {
      // @ts-ignore
      const monitor = e.detail as Monitor;
      if (!monitor) return;
      setMonitor(monitor);
    }

    window.addEventListener("tx-confirmed", handleConfirmedTx);
    return () => {
      window.removeEventListener("tx-confirmed", handleConfirmedTx);
    };
  }, []);

  return data as ConfirmedTransactionMonitor;
};

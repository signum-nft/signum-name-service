import useSWR from "swr";
import { useDispatch } from "react-redux";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import {
  selectMonitoredTransactions,
  transactionActions,
} from "@/app/states/transactionState";
import { useAppSelector } from "@/states/hooks";
import { Transaction } from "@signumjs/core";

const Hour = 1000 * 60 * 60;

export const MonitorTransactionsInitializer = () => {
  const dispatch = useDispatch();
  const { ledgerService } = useLedgerService();
  const monitoredTransactions = useAppSelector(selectMonitoredTransactions);

  useSWR(
    `fetchMonitoredTransactions`,
    async () => {
      if (!ledgerService) return null;

      const transactionRequests: Promise<Transaction>[] = [];
      const now = Date.now();
      for (let m of monitoredTransactions) {
        if (now - m.timestamp > 4 * Hour) {
          dispatch(transactionActions.removeMonitor(m.transactionId));
        } else {
          transactionRequests.push(
            ledgerService.transaction.fetchSingleTransaction(m.transactionId)
          );
        }
      }

      const transactions = await Promise.all(transactionRequests);
      for (let tx of transactions) {
        if (tx.confirmations !== undefined) {
          const monitor = monitoredTransactions.find(
            (m) => m.transactionId === tx.transaction
          );
          monitor &&
            window.dispatchEvent(
              new CustomEvent("tx-confirmed", {
                detail: monitor,
              })
            );
          dispatch(transactionActions.removeMonitor(tx.transaction));
        }
      }
    },
    {
      refreshInterval: 30_000,
    }
  );

  return null;
};

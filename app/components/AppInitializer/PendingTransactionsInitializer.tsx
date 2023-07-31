import useSWR from "swr";
import { useDispatch } from "react-redux";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { transactionActions } from "@/app/states/transactionState";
import { hashSHA256 } from "@signumjs/crypto";
import { useState } from "react";

export const PendingTransactionsInitializer = () => {
  const dispatch = useDispatch();
  const { ledgerService } = useLedgerService();
  const [previous, setPrevious] = useState("");
  useSWR(
    `fetchPendingTransactions`,
    async () => {
      if (!ledgerService) return null;

      const pendingTransactions =
        await ledgerService.transaction.fetchPendingTransactions();
      const hash = hashSHA256(JSON.stringify(pendingTransactions));
      if (hash !== previous) {
        dispatch(
          transactionActions.setPendingTransactions(pendingTransactions)
        );
        setPrevious(hash);
      }
    },
    {
      refreshInterval: 10_000,
    }
  );

  return null;
};

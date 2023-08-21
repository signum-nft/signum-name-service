import { useAppSelector } from "@/states/hooks";
import { selectMonitoredTransactions } from "@/app/states/transactionState";
import { useMemo } from "react";

interface Props {
  type?: string;
  referenceId: string;
}

export const useMonitoredTransaction = ({ referenceId, type }: Props) => {
  const monitoredTransactions = useAppSelector(selectMonitoredTransactions);
  const monitoredTransaction = useMemo(
    () =>
      monitoredTransactions.find((mt) =>
        mt.type
          ? mt.referenceId === referenceId && mt.type === type
          : mt.referenceId === referenceId
      ),
    [monitoredTransactions, referenceId, type]
  );

  return {
    monitoredTransaction,
    isPending: Boolean(monitoredTransaction),
  };
};

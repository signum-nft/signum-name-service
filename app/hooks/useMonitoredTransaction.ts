import { useAppSelector } from "@/states/hooks";
import { selectMonitoredTransactions } from "@/app/states/transactionState";
import { useMemo } from "react";

interface Props {
  type?: string;
  referenceId?: string;
}

export const useMonitoredTransaction = ({ referenceId, type }: Props) => {
  const monitoredTransactions = useAppSelector(selectMonitoredTransactions);
  const monitoredTransaction = useMemo(
    () =>
      monitoredTransactions.find((mt) => {
        if (referenceId && type) {
          return (
            mt.referenceId === referenceId &&
            mt.type.toLowerCase() === type.toLowerCase()
          );
        }
        if (type) {
          return mt.type.toLowerCase() === type.toLowerCase();
        }
        if (referenceId) {
          return mt.referenceId === referenceId;
        }
        return false;
      }),
    [monitoredTransactions, referenceId, type]
  );

  return {
    monitoredTransaction,
    isPending: Boolean(monitoredTransaction),
  };
};

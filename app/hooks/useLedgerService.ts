import { useAppSelector } from "@/states/hooks";
import { selectNodeHost } from "@/app/states/walletState";
import { useMemo } from "react";
import { useExtensionWallet } from "@/app/hooks/useExtensionWallet";
import { LedgerService } from "@/app/services/ledgerService";

export const useLedgerService = () => {
  const wallet = useExtensionWallet();
  const nodeHost = useAppSelector(selectNodeHost);
  const ledgerService = useMemo(() => {
    if (wallet && nodeHost) {
      return new LedgerService(nodeHost, wallet);
    }
    return null;
  }, [nodeHost, wallet]);

  return { ledgerService };
};

import { useMemo } from "react";
import { LedgerService } from "@/app/services/ledgerService";
import { useXTWallet } from "@/app/hooks/useXTWallet";

let service: LedgerService;
export const useLedgerService = () => {
  const { wallet, node } = useXTWallet();

  const ledgerService = useMemo(() => {
    if (!wallet) return null;
    if (!node) return null;

    if (!service) {
      service = new LedgerService(node.host, wallet);
    }

    if (service.host !== node.host) {
      service = new LedgerService(node.host, wallet);
    }

    return service;
  }, [node, wallet]);

  const network = node ? node.network : "";

  return { ledgerService, network };
};

import { useDispatch } from "react-redux";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { AvgBlocktimeInMilliseconds } from "@/app/types/avgBlocktime";

import useSWR from "swr";
import { ledgerActions } from "@/app/states/ledgerState";

export const LedgerInitializer = () => {
  const { ledgerService, network } = useLedgerService();
  const dispatch = useDispatch();

  useSWR(
    ledgerService ? `fetchLedgerInfo/${network}` : null,
    async () => {
      if (!ledgerService) return null;

      try {
        const networkInfo = await ledgerService.node.fetchBlockChainInfo();
        if (networkInfo) {
          dispatch(ledgerActions.setNetworkMetaData(networkInfo));
        }
      } catch (error) {}
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  useSWR(
    ledgerService ? `fetchCurrentBlock/${network}` : null,
    async () => {
      if (!ledgerService) return null;

      try {
        const lastBlock = await ledgerService.node.fetchLastBlock();

        if (lastBlock) {
          dispatch(ledgerActions.setCurrentBlockHeight(lastBlock.height));
        }
      } catch (error) {}
    },
    {
      refreshInterval: AvgBlocktimeInMilliseconds,
      dedupingInterval: AvgBlocktimeInMilliseconds - 20_000,
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  return null;
};

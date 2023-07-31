import { LedgerClientFactory } from "@signumjs/core";
import { Config } from "@/app/config";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNodeHost,
  selectIsWalletConnected,
  walletActions,
} from "@/app/states/walletState";
import { useAppSelector } from "@/states/hooks";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { AvgBlocktimeInMilliseconds } from "@/app/types/avgBlocktime";

import useSWR from "swr";

export const NodeHostInitializer = () => {
  const { ledgerService } = useLedgerService();
  const dispatch = useDispatch();
  const nodeHost = useSelector(selectNodeHost);
  const isChecking = useRef(false);
  const isWalletConnected = useAppSelector(selectIsWalletConnected);

  useEffect(() => {
    if (isWalletConnected || isChecking.current) return;

    isChecking.current = true;
    const probeClient = LedgerClientFactory.createClient({
      nodeHost: Config.Signum.DefaultNode,
      reliableNodeHosts: Config.Signum.ReliableNodes,
    });

    probeClient.service.selectBestHost().then((host) => {
      dispatch(walletActions.setNodeHost(host));
      isChecking.current = false;
    });
  }, [isWalletConnected, dispatch]);

  useSWR(
    ledgerService && nodeHost ? "fetchBlockchainStatus" : null,
    async () => {
      if (!ledgerService) return null;

      try {
        const blockchainStatus = await ledgerService.node.fetchBlockChainInfo();
        const blockHeight = blockchainStatus
          ? blockchainStatus.numberOfBlocks
          : 0;

        if (blockchainStatus) {
          dispatch(walletActions.setBlockHeight(blockHeight));
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

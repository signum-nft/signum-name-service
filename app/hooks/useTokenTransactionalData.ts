import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import {
  selectTokenTransactionalData,
  tokenActions,
} from "@/app/states/tokenState";
import {
  DefaultTransactionalData,
  TokenTransactionalData,
} from "@/app/types/tokenTransactionalData";
import { useTokenMetaData } from "@/app/hooks/useTokenMetaData";
import useSWR from "swr";
import { isEqual } from "lodash";

export const useTokenTransactionalData = (
  tokenId: string
): TokenTransactionalData => {
  const { ledgerService } = useLedgerService();
  const dispatch = useAppDispatch();
  const metaData = useTokenMetaData(tokenId);
  const transactionalData = useAppSelector(
    selectTokenTransactionalData(tokenId)
  );
  useSWR(
    metaData && ledgerService
      ? `useTokenTransactionalData/${metaData.id}`
      : null,
    async () => {
      if (!ledgerService) return null;
      if (!metaData) return null;
      if (!metaData.id) return null;

      const updatedTransactionalData = await ledgerService.token
        .with(metaData)
        .fetchTransactionalData();

      if (!updatedTransactionalData) return null;

      if (!isEqual(updatedTransactionalData, transactionalData)) {
        dispatch(
          tokenActions.updateTokenTransactionalData({
            id: tokenId,
            data: updatedTransactionalData,
          })
        );
      }
      return updatedTransactionalData;
    },
    {
      refreshInterval: 30_000,
    }
  );

  return transactionalData || DefaultTransactionalData;
};

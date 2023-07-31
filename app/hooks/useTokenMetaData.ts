import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { selectTokenMetaData, tokenActions } from "@/app/states/tokenState";
import { DefaultTokenMetaData, TokenMetaData } from "@/app/types/tokenMetaData";
import useSWR from "swr";

interface UseTokenMetadataProps extends TokenMetaData {
  isLoading: boolean;
}

export const useTokenMetaData = (tokenId: string): UseTokenMetadataProps => {
  const { ledgerService } = useLedgerService();
  const tokenMetaData = useAppSelector(selectTokenMetaData(tokenId));

  const dispatch = useAppDispatch();

  const { data, error } = useSWR(
    ledgerService ? `useTokenMetaData/${tokenId}` : null,
    async () => {
      if (!ledgerService) return null;
      if (!tokenId || tokenId === "0") return DefaultTokenMetaData;
      if (tokenMetaData?.id && tokenMetaData?.id !== "0") return tokenMetaData;

      const metaData = await ledgerService.token.fetchMetaData(tokenId);
      if (!metaData) return null;

      dispatch(tokenActions.storeTokenMetaData(metaData));
      return metaData;
    }
  );

  const isLoading = !error && !data;
  const tokenMetadata = data || DefaultTokenMetaData;

  return { ...tokenMetadata, isLoading };
};

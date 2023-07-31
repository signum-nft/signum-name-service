import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { accountActions } from "@/app/states/accountState";
import { tokenActions } from "@/app/states/tokenState";
import { useEffect } from "react";
import useSWR from "swr";
import { WalletState } from "@/app/states/walletState";
import { Address } from "@signumjs/core";

export const AccountInitializer = () => {
  const { ledgerService } = useLedgerService();
  const dispatch = useAppDispatch();
  const { publicKey } = useAppSelector<WalletState>(
    (state) => state.walletState
  );
  const tokens = useAppSelector((state) => state.tokenState.tokens);

  const { data: account } = useSWR(
    ledgerService && publicKey ? `/fetchAccount/${publicKey}` : null,
    () => {
      if (!(ledgerService && publicKey)) return null;
      const accountId = Address.fromPublicKey(publicKey).getNumericId();
      return ledgerService.account.fetchAccount(accountId);
    },
    {
      refreshInterval: 30_000,
    }
  );

  useEffect(() => {
    if (!account) return;
    const tokenIdsToFetch = new Set<string>(
      account.assetBalances?.map(({ asset }) => asset) || []
    );
    account.unconfirmedAssetBalances?.forEach(({ asset }) =>
      tokenIdsToFetch.add(asset)
    );

    tokenIdsToFetch.forEach((tokenId) => {
      if (tokens[tokenId]) return;
      ledgerService?.token
        .fetchMetaData(tokenId)
        .then((data) => {
          dispatch(tokenActions.storeTokenMetaData(data));
        })
        .catch(console.debug);
    });

    dispatch(accountActions.setAccountData(account));

    // do not add `tokens` here - otherwise it gets triggered more often
  }, [dispatch, account, ledgerService]);

  return null;
};

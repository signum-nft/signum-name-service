interface AssetBalance {
  asset: string;
  balanceQNT: string;
}

interface UnconfirmedAssetBalance {
  asset: string;
  unconfirmedBalanceQNT: string;
}

export interface AccountData {
  balanceNQT: string;
  unconfirmedBalanceNQT: string;
  committedBalanceNQT: string;
  forgedBalanceNQT: string;
  guaranteedBalanceNQT: string;
  account: string;
  accountRS: string;
  accountRSExtended: string;
  publicKey: string;
  name: string;
  description: string;
  assetBalances?: AssetBalance[];
  unconfirmedAssetBalances?: UnconfirmedAssetBalance[];
}

import { DescriptorData } from "@signumjs/standards";

interface AssetBalance {
  asset: string;
  balanceQNT: string;
}

interface UnconfirmedAssetBalance {
  asset: string;
  unconfirmedBalanceQNT: string;
}

interface DomainData {
  name: string; // nm
  url: string; // hp
  account: string; // ac
}

export interface AccountDomainList {
  id: string;
  name: string;
  tld?: string;
  data?: DomainData;
  status: string;
  price: number;
  previousDomain?: AccountDomainList;
  nextDomain?: AccountDomainList;
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
  domains?: AccountDomainList[];
}

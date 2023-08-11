import { DescriptorData } from "@signumjs/standards";
import LinkedList from "fast-linked-list";

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

export interface AccountDomain {
  id: string;
  name: string;
  tld?: string;
  data?: DomainData;
  status: string;
  price: number;
}

export type AccountDomainList = LinkedList<AccountDomain>;

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
  domains?: AccountDomain[][];
}

export interface TokenMetaData {
  id: string;
  ticker: string;
  description: string;
  decimals: number;
  isMintable: boolean;
  issuerId: string;
  issuerIsSmartContract: boolean;
  machineCodeHash: string;
}

export interface TokenMetaDataMap {
  [key: string]: TokenMetaData;
}

export const DefaultTokenMetaData = {
  id: "",
  ticker: "",
  description: "",
  decimals: 0,
  isMintable: false,
  issuerId: "",
  issuerIsSmartContract: false,
  machineCodeHash: "",
};

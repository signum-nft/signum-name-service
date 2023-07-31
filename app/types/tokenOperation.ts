export type action =
  | ""
  | "transfer"
  | "airdrop"
  | "mint"
  | "burn"
  | "addTreasuryAccount"
  | "transferAssetOwnership";

export type TokenOperationState = {
  show: boolean;
  id: string; // Token ID
  ticker: string; // Token Ticker
  action: action;
};

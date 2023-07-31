export type action =
  | ""
  | "view"
  | "edit"
  | "sale"
  | "transfer"
  | "cancelRenewalFee";

export type AliasOperationState = {
  show: boolean;
  id: string;
  name: string;
  action: action;
};

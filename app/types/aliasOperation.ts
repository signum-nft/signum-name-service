export type action =
  | ""
  | "add"
  | "view"
  | "edit"
  | "sale"
  | "transfer"
  | "delete";

export type AliasOperationState = {
  show: boolean;
  id: string;
  name: string;
  action: action;
};

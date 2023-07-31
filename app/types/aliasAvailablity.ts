import { Alias } from "@signumjs/core";
import { AliasStatus } from "./aliasStatus";

export interface AliasAvailablity {
  alias?: Alias;
  owner?: string;
  pricePlanck?: string;
  status: AliasStatus;
}

export const defaultAvailability: AliasAvailablity = {
  alias: undefined,
  owner: "",
  pricePlanck: "",
  status: "",
};

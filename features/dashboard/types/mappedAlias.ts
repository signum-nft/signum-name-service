import { AliasUpdateMode } from "@/app/types/aliasUpdateMode";
import { AliasStatus } from "@/app/types/aliasStatus";

export interface MappedAlias {
  id: string;
  registeredAlias: string;
  resolvableAlias: string;
  stld: string;
  renewalFee: string;
  type: AliasUpdateMode;
  price: number;
  status: AliasStatus;
}

import { AliasStatus } from "@/app/types/aliasStatus";
import { AliasUpdateMode } from "@/app/types/aliasUpdateMode";

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

export interface HeadCell {
  id: keyof MappedAlias;
  label: string;
  secondLabel?: string;
}

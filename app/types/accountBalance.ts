import { Amount } from "@signumjs/util";

export interface AccountBalance {
  totalBalance: Amount;
  committedBalance: Amount;
  reservedBalance: Amount;
  availableBalance: Amount;
}

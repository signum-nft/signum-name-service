import { Amount } from "@signumjs/util";
import { formatAmount } from "./formatAmount";
import { getNativeTicker } from "./getNativeTicker";

export const asSignaString = (amount: Amount): string =>
  formatAmount(amount.getSigna()) + " " + getNativeTicker();

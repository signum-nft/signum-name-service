import { AliasStatus } from "@/app/types/aliasStatus";

export const getAliasStatus = (
  priceNQT?: string,
  buyer?: string,
  accountId?: string,
  detectPrivateSale = false
): AliasStatus => {
  let status: AliasStatus = "onSale";

  // Determine whether the alias is on a private sale
  if (priceNQT && buyer) {
    if (detectPrivateSale) return "onPrivateSale";

    return buyer === accountId ? "onPrivateSale" : "notOnSale";
  }

  // Check if alias is on public sale
  if (priceNQT) return status;

  // Alias is already taken, and it is not on sale
  return "notOnSale";
};

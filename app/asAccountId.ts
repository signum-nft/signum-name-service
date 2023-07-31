import { asAccountAddress } from "@/app/asAccountAddress";

export const asAccountId = (accountId: string): string | null => {
  try {
    return asAccountAddress(accountId).getNumericId();
  } catch (error) {
    return null;
  }
};

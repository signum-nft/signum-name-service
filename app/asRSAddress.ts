import { asAccountAddress } from "@/app/asAccountAddress";

export const asRSAddress = (accountId: string): string | null => {
  try {
    return asAccountAddress(accountId).getReedSolomonAddress();
  } catch (error) {
    return null;
  }
};

import { Config } from "@/app/config";
import { Address, AddressPrefix } from "@signumjs/core";

export const asAccountAddress = (accountId: string): Address => {
  const Prefix = Config.Signum.IsTestnet
    ? AddressPrefix.TestNet
    : AddressPrefix.MainNet;
  return Address.create(accountId, Prefix);
};

import { Ledger } from "@signumjs/core";
import { WalletDecorator } from "./WalletDecorator";

export interface LedgerServiceContext {
  ledger: Ledger;
  wallet: WalletDecorator;
}

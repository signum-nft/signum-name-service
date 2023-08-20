import { LedgerServiceContext } from "./LedgerServiceContext";
import { FeeType } from "@/app/services/ledgerService/types/feeType";
import { ConfirmedTransaction } from "@signumjs/wallets";
import { Amount } from "@signumjs/util";

export class LedgerSubService {
  constructor(protected context: LedgerServiceContext) {}

  protected getAccount() {
    const address = this.context.wallet.connectedAccount;

    if (!address) {
      throw new Error("Wallet not connected");
    }

    return address;
  }

  protected withCurrentNetworkFees(
    fn: (fees: FeeType) => Promise<ConfirmedTransaction>,
    feeOverride?: Amount
  ) {
    return async () => {
      let fees: FeeType = {
        cheap: 1000000,
        standard: 2000000,
        priority: 3000000,
      };
      try {
        if (!feeOverride) {
          fees = await this.context.ledger.network.getSuggestedFees();
        } else {
          const feePlanck = parseInt(feeOverride.getPlanck());
          fees = {
            cheap: feePlanck,
            standard: feePlanck,
            priority: feePlanck,
          };
        }
      } catch (e: any) {
        console.warn("withBaseNetworkFees() failed:", e);
        // ignore error...
      }
      return fn(fees);
    };
  }
}

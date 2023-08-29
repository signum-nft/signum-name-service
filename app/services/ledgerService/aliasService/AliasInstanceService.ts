import { LedgerSubService } from "../LedgerSubService";
import { LedgerServiceContext } from "../LedgerServiceContext";
import { handleError } from "../handleError";
import { Alias } from "@signumjs/core";
import { calculateAliasFee } from "@/app/calculateAliasFee";

export class AliasInstanceService extends LedgerSubService {
  constructor(private alias: Alias, context: LedgerServiceContext) {
    super(context);
  }

  async cancelSubscription() {
    return handleError(
      this.withCurrentNetworkFees(async (fees) => {
        const { ledger, wallet } = this.context;

        const { unsignedTransactionBytes } =
          await ledger.transaction.cancelSubscription({
            subscriptionId: this.alias.alias,
            senderPublicKey: this.getAccount().getPublicKey(),
            feePlanck: fees.cheap.toString(10),
          });

        return wallet.confirm(unsignedTransactionBytes);
      })
    );
  }

  async buyAlias(amountPlanck: string) {
    return handleError(
      this.withCurrentNetworkFees(async (fees) => {
        const { ledger, wallet } = this.context;
        const { unsignedTransactionBytes } = await ledger.alias.buyAlias({
          aliasId: this.alias.alias,
          tld: this.alias.tldName,
          senderPublicKey: this.getAccount().getPublicKey(),
          feePlanck: fees.cheap.toString(10),
          amountPlanck,
        });
        return wallet.confirm(unsignedTransactionBytes);
      })
    );
  }

  async updateAlias(arbitraryData: string) {
    return handleError(async () => {
      const { ledger, wallet } = this.context;
      const { unsignedTransactionBytes } = await ledger.alias.setAlias({
        aliasName: this.alias.aliasName,
        tld: this.alias.tldName,
        aliasURI: arbitraryData,
        feePlanck: calculateAliasFee(arbitraryData).getPlanck(),
        senderPublicKey: this.getAccount().getPublicKey(),
      });
      return wallet.confirm(unsignedTransactionBytes);
    });
  }
}

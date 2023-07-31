import { LedgerSubService } from "@/app/services/ledgerService/LedgerSubService";
import { LedgerServiceContext } from "@/app/services/ledgerService/LedgerServiceContext";
import { handleError } from "@/app/services/ledgerService/handleError";

export class SubscriptionInstanceService extends LedgerSubService {
  constructor(private subscriptionId: string, context: LedgerServiceContext) {
    super(context);
  }

  async cancelSubscription() {
    return handleError(
      this.withCurrentNetworkFees(async (fees) => {
        const { ledger, wallet } = this.context;

        const { unsignedTransactionBytes } =
          await ledger.transaction.cancelSubscription({
            subscriptionId: this.subscriptionId,
            senderPublicKey: this.getAccount().getPublicKey(),
            feePlanck: fees.cheap.toString(10),
          });

        return wallet.confirm(unsignedTransactionBytes);
      })
    );
  }
}

import { LedgerSubService } from "@/app/services/ledgerService/LedgerSubService";
import { LedgerServiceContext } from "@/app/services/ledgerService/LedgerServiceContext";
import { handleError } from "@/app/services/ledgerService/handleError";
import { SubscriptionInstanceService } from "@/app/services/ledgerService/subscriptionService/SubscriptionInstanceService";

export class SubscriptionService extends LedgerSubService {
  constructor(context: LedgerServiceContext) {
    super(context);
  }

  fetchSubscription(subscriptionId: string) {
    return handleError(async () =>
      this.context.ledger.transaction.getSubscription(subscriptionId)
    );
  }

  with(subscriptionId: string) {
    return new SubscriptionInstanceService(subscriptionId, this.context);
  }
}

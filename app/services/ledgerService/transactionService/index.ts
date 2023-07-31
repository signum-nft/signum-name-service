import { LedgerSubService } from "@/app/services/ledgerService/LedgerSubService";
import { LedgerServiceContext } from "@/app/services/ledgerService/LedgerServiceContext";
import { handleError } from "@/app/services/ledgerService/handleError";

export class TransactionService extends LedgerSubService {
  constructor(context: LedgerServiceContext) {
    super(context);
  }

  fetchPendingTransactions() {
    return handleError(async () => {
      const { unconfirmedTransactions } =
        await this.context.ledger.transaction.getUnconfirmedTransactions();
      return unconfirmedTransactions;
    });
  }

  fetchSingleTransaction(txId: string) {
    return handleError(async () =>
      this.context.ledger.transaction.getTransaction(txId)
    );
  }
}

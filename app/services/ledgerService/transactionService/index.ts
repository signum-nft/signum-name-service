import { LedgerSubService } from "../LedgerSubService";
import { handleError } from "../handleError";

export class TransactionService extends LedgerSubService {
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

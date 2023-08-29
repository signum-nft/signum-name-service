import { LedgerSubService } from "../LedgerSubService";
import { handleError } from "../handleError";

export class AccountService extends LedgerSubService {
  fetchAccount(accountId: string) {
    return handleError(async () =>
      this.context.ledger.account.getAccount({
        accountId,
        includeCommittedAmount: true,
      })
    );
  }

  async exists(accountId: string): Promise<boolean> {
    try {
      await this.context.ledger.account.getAccount({ accountId });
      return true;
    } catch (e: any) {
      return false;
    }
  }
}

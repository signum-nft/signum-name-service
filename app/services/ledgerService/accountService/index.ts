import { LedgerSubService } from "@/app/services/ledgerService/LedgerSubService";
import { LedgerServiceContext } from "@/app/services/ledgerService/LedgerServiceContext";
import { handleError } from "@/app/services/ledgerService/handleError";
import { AccountInstanceService } from "@/app/services/ledgerService/accountService/AccountInstanceService";

export class AccountService extends LedgerSubService {
  constructor(context: LedgerServiceContext) {
    super(context);
  }

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

  with(accountId: string) {
    return new AccountInstanceService(accountId, this.context);
  }
}

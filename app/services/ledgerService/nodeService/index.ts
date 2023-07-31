import { LedgerSubService } from "@/app/services/ledgerService/LedgerSubService";
import { LedgerServiceContext } from "@/app/services/ledgerService/LedgerServiceContext";
import { handleError } from "@/app/services/ledgerService/handleError";

export class NodeService extends LedgerSubService {
  constructor(context: LedgerServiceContext) {
    super(context);
  }

  fetchBlockChainInfo() {
    return handleError(async () => {
      return this.context.ledger.network.getBlockchainStatus();
    });
  }
}

import { LedgerSubService } from "../LedgerSubService";
import { handleError } from "../handleError";

export class NodeService extends LedgerSubService {
  fetchBlockChainInfo() {
    return handleError(async () => {
      return this.context.ledger.network.getNetworkInfo();
    });
  }
}

import { LedgerSubService } from "@/app/services/ledgerService/LedgerSubService";
import { handleError } from "@/app/services/ledgerService/handleError";
import { AliasInstanceService } from "@/app/services/ledgerService/aliasService/AliasInstanceService";
import { Alias } from "@signumjs/core";
import { Paginable } from "@/app/types/paginable";
import { calculateAliasFee } from "@/app/calculateAliasFee";

interface CreateAliasArgs {
  name: string;
  tldName: string;
  content: string;
}

export class AliasService extends LedgerSubService {
  fetchAliasById(aliasId: string) {
    return handleError(async () =>
      this.context.ledger.alias.getAliasById(aliasId)
    );
  }

  fetchAccountAliases(args: { accountId: string } & Paginable) {
    return handleError(async () => {
      const { accountId, startIndex = 0, count = 500 } = args;
      return this.context.ledger.alias.getAliases({
        accountId,
        firstIndex: startIndex,
        lastIndex: count,
      });
    });
  }

  async createAlias({ content, name, tldName }: CreateAliasArgs) {
    return handleError(async () => {
      const { ledger, wallet } = this.context;
      const { unsignedTransactionBytes } = await ledger.account.setAlias({
        aliasName: name,
        tld: tldName,
        aliasURI: content,
        feePlanck: calculateAliasFee(content).getPlanck(),
        senderPublicKey: this.getAccount().getPublicKey(),
      });
      return wallet.confirm(unsignedTransactionBytes);
    });
  }

  with(alias: Alias) {
    return new AliasInstanceService(alias, this.context);
  }
}

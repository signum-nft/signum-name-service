import { LedgerSubService } from "@/app/services/ledgerService/LedgerSubService";
import { LedgerServiceContext } from "@/app/services/ledgerService/LedgerServiceContext";
import { handleError } from "@/app/services/ledgerService/handleError";
import { AliasInstanceService } from "@/app/services/ledgerService/aliasService/AliasInstanceService";
import { Alias } from "@signumjs/core";
import { DescriptorData, DescriptorDataClient } from "@signumjs/standards";
import { Paginable } from "@/app/types/paginable";
import { calculateAliasFee } from "@/app/calculateAliasFee";
import { AliasAvailablity } from "@/app/types/aliasAvailablity";
import { getAliasStatus } from "@/app/getAliasStatus";

interface CreateAliasArgs {
  name: string;
  tldName: string;
  content: string;
}

interface CreateAliasWithProfileArgs {
  name: string;
  descriptorData: DescriptorData;
}

export class AliasService extends LedgerSubService {
  constructor(context: LedgerServiceContext) {
    super(context);
  }

  fetchAliasById(aliasId: string) {
    return handleError(async () =>
      this.context.ledger.alias.getAliasById(aliasId)
    );
  }

  fetchAliasByName(aliasName: string) {
    return handleError(async () =>
      this.context.ledger.alias.getAliasByName(aliasName)
    );
  }

  fetchAllAliasesOnSale({ count, startIndex }: Paginable) {
    return handleError(async () =>
      this.context.ledger.alias.getAliasesOnSale({
        firstIndex: startIndex,
        lastIndex: count,
      })
    );
  }

  fetchAccountAliasesDirectOffers(args: { buyerId: string } & Paginable) {
    return handleError(async () => {
      const { buyerId, startIndex, count } = args;
      return this.context.ledger.alias.getAliasesOnSale({
        buyerId,
        firstIndex: startIndex,
        lastIndex: count,
      });
    });
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

  fetchTopLevelDomains({ count, startIndex }: Paginable) {
    return handleError(async () =>
      this.context.ledger.alias.getTopLevelDomains({
        firstIndex: startIndex,
        lastIndex: count,
      })
    );
  }

  async fetchAliasesByName(args: { aliasName: string } & Paginable) {
    try {
      const { aliasName, startIndex = 0, count = 500 } = args;

      return this.context.ledger.alias.getAliases({
        aliasName,
        firstIndex: startIndex,
        lastIndex: count,
      });
    } catch (e: any) {
      return undefined;
    }
  }

  async fetchAliasAvailability(aliasName: string): Promise<AliasAvailablity> {
    try {
      const { ledger, wallet } = this.context;

      let accountId;
      if (wallet.connectedAccount) {
        accountId = this.getAccount().getNumericId();
      }
      const alias = await ledger.alias.getAliasByName(aliasName);
      const { buyer, priceNQT } = alias;
      const status = getAliasStatus(priceNQT, buyer, accountId);
      return {
        alias,
        owner: alias.account,
        status,
      };
    } catch (e: any) {
      console.error(e);

      // Alias is not minted on Signum Blockchain
      return {
        status: "available",
        pricePlanck: "0",
      };
    }
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

  async createAliasWithProfile({
    descriptorData,
    name,
  }: CreateAliasWithProfileArgs) {
    return handleError(async () => {
      const { ledger, wallet } = this.context;
      const profileClient = new DescriptorDataClient(ledger);
      const { unsignedTransactionBytes } =
        await profileClient.setAliasDescriptor({
          aliasName: name,
          descriptorData,
          senderPublicKey: this.getAccount().getPublicKey(),
        });
      return wallet.confirm(unsignedTransactionBytes);
    });
  }

  async exists(aliasName: string): Promise<boolean> {
    try {
      await this.context.ledger.alias.getAliasByName(aliasName);
      return true;
    } catch (e: any) {
      return false;
    }
  }

  with(alias: Alias) {
    return new AliasInstanceService(alias, this.context);
  }
}

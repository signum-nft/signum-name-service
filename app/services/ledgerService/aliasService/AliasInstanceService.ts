import { LedgerSubService } from "@/app/services/ledgerService/LedgerSubService";
import { LedgerServiceContext } from "@/app/services/ledgerService/LedgerServiceContext";
import { handleError } from "@/app/services/ledgerService/handleError";
import { Alias } from "@signumjs/core";
import { DescriptorData, DescriptorDataClient } from "@signumjs/standards";
import { calculateAliasFee } from "@/app/calculateAliasFee";

export class AliasInstanceService extends LedgerSubService {
  constructor(private alias: Alias, context: LedgerServiceContext) {
    super(context);
  }

  async cancelSubscription() {
    return handleError(
      this.withCurrentNetworkFees(async (fees) => {
        const { ledger, wallet } = this.context;

        const { unsignedTransactionBytes } =
          await ledger.transaction.cancelSubscription({
            subscriptionId: this.alias.alias,
            senderPublicKey: this.getAccount().getPublicKey(),
            feePlanck: fees.cheap.toString(10),
          });

        return wallet.confirm(unsignedTransactionBytes);
      })
    );
  }

  async buyAlias(amountPlanck: string) {
    return handleError(
      this.withCurrentNetworkFees(async (fees) => {
        const { ledger, wallet } = this.context;
        const { unsignedTransactionBytes } = await ledger.alias.buyAlias({
          aliasId: this.alias.alias,
          tld: this.alias.tldName,
          senderPublicKey: this.getAccount().getPublicKey(),
          feePlanck: fees.cheap.toString(10),
          amountPlanck,
        });
        return wallet.confirm(unsignedTransactionBytes);
      })
    );
  }

  async setAliasOnSale(amountPlanck: string) {
    return handleError(
      this.withCurrentNetworkFees(async (fees) => {
        const { ledger, wallet } = this.context;
        const { unsignedTransactionBytes } = await ledger.alias.sellAlias({
          aliasId: this.alias.alias,
          tld: this.alias.tldName,
          senderPublicKey: this.getAccount().getPublicKey(),
          feePlanck: fees.cheap.toString(10),
          amountPlanck,
        });
        return wallet.confirm(unsignedTransactionBytes);
      })
    );
  }

  async setAliasOnSaleForSingleAccount(
    amountPlanck: string,
    recipientId: string
  ) {
    return handleError(
      this.withCurrentNetworkFees(async (fees) => {
        const { ledger, wallet } = this.context;
        const { unsignedTransactionBytes } = await ledger.alias.sellAlias({
          aliasId: this.alias.alias,
          tld: this.alias.tldName,
          senderPublicKey: this.getAccount().getPublicKey(),
          feePlanck: fees.cheap.toString(10),
          amountPlanck,
          recipientId,
        });
        return wallet.confirm(unsignedTransactionBytes);
      })
    );
  }

  async updateAlias(arbitraryData: string) {
    return handleError(async () => {
      const { ledger, wallet } = this.context;
      const { unsignedTransactionBytes } = await ledger.alias.setAlias({
        aliasName: this.alias.aliasName,
        tld: this.alias.tldName,
        aliasURI: arbitraryData,
        feePlanck: calculateAliasFee(arbitraryData).getPlanck(),
        senderPublicKey: this.getAccount().getPublicKey(),
      });
      return wallet.confirm(unsignedTransactionBytes);
    });
  }

  async updateAliasProfile(descriptorData: DescriptorData) {
    return handleError(async () => {
      const { ledger, wallet } = this.context;
      const client = new DescriptorDataClient(ledger);
      const { unsignedTransactionBytes } = await client.setAliasDescriptor({
        aliasName: this.alias.aliasName,
        tld: this.alias.tldName,
        senderPublicKey: this.getAccount().getPublicKey(),
        descriptorData,
      });
      return wallet.confirm(unsignedTransactionBytes);
    });
  }

  async transferAlias(recipientId: string) {
    return handleError(
      this.withCurrentNetworkFees(async (fees) => {
        const { ledger, wallet } = this.context;
        const { unsignedTransactionBytes } = await ledger.alias.sellAlias({
          aliasId: this.alias.alias,
          tld: this.alias.tldName,
          senderPublicKey: this.getAccount().getPublicKey(),
          feePlanck: fees.cheap.toString(10),
          amountPlanck: "0",
          recipientId,
        });
        return wallet.confirm(unsignedTransactionBytes);
      })
    );
  }
}

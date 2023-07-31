import { LedgerSubService } from "@/app/services/ledgerService/LedgerSubService";
import { LedgerServiceContext } from "@/app/services/ledgerService/LedgerServiceContext";
import { handleError } from "@/app/services/ledgerService/handleError";
import { Paginable } from "@/app/types/paginable";
import { Config } from "@/app/config";

export class AccountInstanceService extends LedgerSubService {
  constructor(private accountId: string, context: LedgerServiceContext) {
    super(context);
  }

  fetchIssuedTokenIds(): Promise<string[]> {
    return handleError(async () => {
      const { ledger } = this.context;
      const { assets } = await ledger.asset.getAssetsByIssuer({
        accountId: this.accountId,
      });

      // Detect if the found asset still belongs to the issuer
      const filteredAssets = assets.filter((a) => a.account === this.accountId);

      return filteredAssets.map((a: any) => a.asset);
    });
  }

  fetchOwnedTokenIds(): Promise<string[]> {
    return handleError(async () => {
      const { ledger } = this.context;

      // @ts-ignore
      const { assets } = await ledger.service.query("getAssetsByOwner", {
        account: this.accountId,
      });

      return assets.map((a: any) => a.asset);
    });
  }

  fetchOwnedContracts(codeHash: string) {
    return handleError(async () => {
      const { ledger } = this.context;
      const contracts = await ledger.contract.getAllContractsByCodeHash({
        machineCodeHash: codeHash,
        includeDetails: false,
      });

      return contracts.ats.filter((at) => at.creator === this.accountId);
    });
  }

  fetchCreatedStakingPoolContracts() {
    return this.fetchOwnedContracts(Config.Contracts.StakingContract.CodeHash);
  }

  fetchTradeHistory({
    tokenId,
    startIndex,
    count,
  }: Paginable & { tokenId?: string }) {
    return handleError(async () => {
      const { ledger } = this.context;
      return ledger.asset.getTradeHistoryPerAccount({
        accountId: this.accountId,
        assetId: tokenId,
        firstIndex: startIndex,
        lastIndex: startIndex + count - 1,
      });
    });
  }
}

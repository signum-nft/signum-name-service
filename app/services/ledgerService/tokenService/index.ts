import { Amount, ChainValue } from "@signumjs/util";
import { Config } from "@/app/config";
import { TokenInstanceService } from "@/app/services/ledgerService/tokenService/TokenInstanceService";
import { TokenMetaData } from "@/app/types/tokenMetaData";
import { handleError } from "@/app/services/ledgerService/handleError";
import { mapAssetToTokenMetadata } from "@/app/mapAssetToTokenMetadata";
import { LedgerServiceContext } from "../LedgerServiceContext";
import { LedgerSubService } from "../LedgerSubService";

export interface CreateTokenArgs {
  description: string;
  decimals: number;
  ticker: string;
  isMintable: boolean;
  tokenAmount: string | number;
}

interface FetchLatestActiveTokenArgs {
  firstIndex: number;
  count: number;
}

function isTokenId(term: string): boolean {
  return /^\d{16,21}$/.test(term);
}

export class TokenService extends LedgerSubService {
  constructor(context: LedgerServiceContext) {
    super(context);
  }

  public async exists(tokenId: string) {
    try {
      await this.context.ledger.asset.getAsset({ assetId: tokenId });
      return true;
    } catch (e: any) {
      return false;
    }
  }

  fetchMetaData(tokenId: string): Promise<TokenMetaData> {
    return handleError<TokenMetaData>(async () => {
      const { ledger } = this.context;
      const tokenInfo = await ledger.asset.getAsset({
        assetId: tokenId,
      });
      return mapAssetToTokenMetadata(tokenInfo, ledger);
    });
  }

  with(tokenMetaData: TokenMetaData) {
    return new TokenInstanceService(tokenMetaData, this.context);
  }

  fetchLatestActiveTokens({ count, firstIndex }: FetchLatestActiveTokenArgs) {
    return handleError(async () => {
      const { ledger } = this.context;
      const { assets: tokens, nextIndex } = await ledger.asset.getAllAssets({
        firstIndex,
        lastIndex: firstIndex + count,
        skipZeroVolume: true,
      });

      // If there is no trending tokens, Add TRT by default
      if (!tokens.length) {
        const trtAsset = await ledger.asset.getAsset({
          assetId: Config.Signum.TokenTrtId,
        });

        tokens.push(trtAsset);
      }

      return {
        nextIndex,
        tokens,
      };
    });
  }

  issueToken(args: CreateTokenArgs) {
    return handleError(async () => {
      const { ledger, wallet } = this.context;
      const { unsignedTransactionBytes } = await ledger.asset.issueAsset({
        feePlanck: Amount.fromSigna(150).getPlanck(),
        senderPublicKey: this.getAccount().getPublicKey(),
        name: args.ticker,
        decimals: args.decimals,
        description: args.description,
        mintable: args.isMintable,
        quantity: ChainValue.create(args.decimals)
          .setCompound(args.tokenAmount)
          .getAtomic(),
      });
      return wallet.confirm(unsignedTransactionBytes);
    });
  }

  searchToken(nameOrId: string) {
    return handleError(async () => {
      const { ledger } = this.context;
      if (isTokenId(nameOrId)) {
        try {
          const asset = await ledger.asset.getAsset({
            assetId: nameOrId,
          });
          return [asset];
        } catch (e: any) {
          // ignore and try name
        }
      }

      const { assets } = await ledger.asset.getAssetsByName({
        name: nameOrId,
      });

      // Due to https://github.com/signum-network/signum-node/issues/689
      // it's necessary to fetch the asset data per default for 24h again
      const assetRequests = assets.map(({ asset }) =>
        ledger.asset.getAsset({ assetId: asset })
      );
      return Promise.all(assetRequests);
    });
  }
}

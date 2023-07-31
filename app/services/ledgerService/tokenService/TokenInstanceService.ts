import { LedgerSubService } from "../LedgerSubService";
import { LedgerServiceContext } from "../LedgerServiceContext";
import { handleError } from "@/app/services/ledgerService/handleError";
import { TokenMetaData } from "@/app/types/tokenMetaData";
import { Amount, ChainValue } from "@signumjs/util";
import { TokenTransactionalData } from "@/app/types/tokenTransactionalData";
import {
  AssetOrder,
  AssetTrade,
  MultioutAssetQuantities,
  TransactionAssetSubtype,
  TransactionType,
} from "@signumjs/core";
import { Feeable } from "@/app/types/feeable";
import { optionalSigna } from "../optionalSigna";

interface TransferTokenArgs extends Feeable {
  recipientId: string;
  tokenAmount: string | number;
  signa?: string;
}

interface TokenAmount {
  tokenId: string;
  decimals: number;
  tokenAmount: string;
}

interface TransferMultipleTokenArgs extends Feeable {
  recipientId: string;
  tokenAmounts: TokenAmount[];
  signa?: string;
}

interface BurnTokenArgs extends Feeable {
  tokenAmount: string | number;
}

interface PlaceTokenOrderArgs extends Feeable {
  tokenAmount: string | number;
  pricePerToken: string | number;
}

interface CancelOrderArgs extends Feeable {
  orderId: string;
}

interface DistributeTokenArgs {
  signa?: string;
  airdropToken?: {
    metadata: TokenMetaData;
    quantity: string | number;
  };
  minimumHoldersQuantity: string | number;
  feeSigna: number; // required
}

interface SetTreasuryAccountArgs extends Feeable {
  accountId: string;
}

interface TransferTokenOwnershipArgs {
  recipientId: string;
}

const mapOrderPriceToPlanck = ({ price, ...rest }: AssetOrder) => ({
  ...rest,
  // needed for type compatibility
  price,
  priceNQT: price,
});

export class TokenInstanceService extends LedgerSubService {
  constructor(private metaData: TokenMetaData, context: LedgerServiceContext) {
    super(context);
  }

  public getMetaData() {
    return this.metaData;
  }

  public async calculateDistributionFees(minimumQuantity?: number | string) {
    return handleError(async () => {
      const { decimals, id } = this.metaData;

      const { numberOfAccounts } = await this.context.ledger.asset.getAsset({
        assetId: id,
        minimumQuantity: minimumQuantity
          ? ChainValue.create(decimals).setCompound(minimumQuantity).getAtomic()
          : undefined,
      });

      /**
       * Calculation
       *  long minFeeHolders = (numberOfHolders*minFee)/10L;
       *  minFee = Math.max(minFee, minFeeHolders);
       */
      const minFee = Amount.fromSigna(0.01);
      const feePerHolders = minFee.clone().multiply(numberOfAccounts);
      const fee = feePerHolders.greater(minFee) ? feePerHolders : minFee;

      return {
        fee,
        numberOfAccounts,
      };
    });
  }

  public fetchTransactionalData(): Promise<TokenTransactionalData> {
    return handleError(async () => {
      const { ledger } = this.context;
      const assetId = this.metaData.id;
      const [tokenInfo, recentTrades] = await Promise.all([
        ledger.asset.getAsset({ assetId }),
        ledger.asset.getAssetTradesPerAsset({
          assetId,
          lastIndex: 0,
          firstIndex: 0,
        }),
      ]);

      const priceNQT = recentTrades.trades.length
        ? recentTrades.trades[0].price
        : "0";
      const maximumSupplyQNT = tokenInfo.quantityQNT;
      const circulatingSupplyQNT = tokenInfo.quantityCirculatingQNT;
      const numberOfTrades = tokenInfo.numberOfTrades;
      const numberOfHolders = tokenInfo.numberOfAccounts;
      const numberOfTransfers = tokenInfo.numberOfTransfers;
      const volumeQNT = tokenInfo.volumeQNT;
      const priceHighNQT = tokenInfo.priceHigh;
      const priceLowNQT = tokenInfo.priceLow;
      const priceOpenNQT = tokenInfo.priceOpen;
      const priceCloseNQT = tokenInfo.priceClose;

      return {
        priceNQT,
        maximumSupplyQNT,
        circulatingSupplyQNT,
        numberOfTrades,
        numberOfHolders,
        numberOfTransfers,
        volumeQNT,
        priceHighNQT,
        priceLowNQT,
        priceOpenNQT,
        priceCloseNQT,
      };
    });
  }

  public fetchTrades(count = 500, offset = 0) {
    return handleError(async () => {
      const lastIndexMaxDelta = count > 499 ? 499 : count - 1;
      let firstIndex = offset;
      let lastIndex = firstIndex + lastIndexMaxDelta;
      let allTrades: AssetTrade[] = [];
      while (allTrades.length < count) {
        const { trades, nextIndex } =
          await this.context.ledger.asset.getAssetTradesPerAsset({
            assetId: this.metaData.id,
            firstIndex,
            lastIndex,
          });
        allTrades.push(...trades);
        if (nextIndex === undefined) {
          break;
        }
        firstIndex = nextIndex;
        lastIndex = nextIndex + lastIndexMaxDelta;
      }

      return allTrades;
    });
  }

  public fetchOpenOrders(pageIndex = 0, pageSize = 500) {
    return handleError(async () => {
      const firstIndex = pageIndex * pageSize;
      const lastIndex = firstIndex + pageSize - 1;
      const args = {
        assetId: this.metaData.id,
        firstIndex,
        lastIndex,
      };
      const [{ bidOrders }, { askOrders }] = await Promise.all([
        this.context.ledger.asset.getOpenBidOrdersPerAsset(args),
        this.context.ledger.asset.getOpenAskOrdersPerAsset(args),
      ]);
      const buy = bidOrders.map(mapOrderPriceToPlanck);
      const sell = askOrders.map(mapOrderPriceToPlanck);
      return { buy, sell };
    });
  }

  private async placeOrder(
    args: PlaceTokenOrderArgs & { type: "buy" | "sell" }
  ) {
    return handleError(
      this.withCurrentNetworkFees(async (fees) => {
        const { ledger, wallet } = this.context;
        const { id, decimals } = this.metaData;
        const orderOperation = {
          buy: ledger.asset.placeBidOrder,
          sell: ledger.asset.placeAskOrder,
        };
        const { unsignedTransactionBytes } = await orderOperation[args.type]({
          assetId: id,
          decimals,
          quantity: ChainValue.create(decimals)
            .setCompound(args.tokenAmount)
            .getAtomic(),
          feePlanck: fees.cheap.toString(10),
          senderPublicKey: this.getAccount().getPublicKey(),
          pricePlanck: Amount.fromSigna(args.pricePerToken).getPlanck(),
        });

        return wallet.confirm(unsignedTransactionBytes);
      }, optionalSigna(args.feeSigna))
    );
  }

  public async placeSellOrder(args: PlaceTokenOrderArgs) {
    return this.placeOrder({ ...args, type: "sell" });
  }

  public async placeBuyOrder(args: PlaceTokenOrderArgs) {
    return this.placeOrder({ ...args, type: "buy" });
  }

  private async cancelOrder(args: CancelOrderArgs & { type: "buy" | "sell" }) {
    return handleError(
      this.withCurrentNetworkFees(async (fees) => {
        const { ledger, wallet } = this.context;
        const orderOperation = {
          buy: ledger.asset.cancelBidOrder,
          sell: ledger.asset.cancelAskOrder,
        };
        const { unsignedTransactionBytes } = await orderOperation[args.type]({
          order: args.orderId,
          feePlanck: fees.cheap.toString(10),
          senderPublicKey: this.getAccount().getPublicKey(),
        });

        return wallet.confirm(unsignedTransactionBytes);
      }, optionalSigna(args.feeSigna))
    );
  }

  public async cancelSellOrder(args: CancelOrderArgs) {
    return this.cancelOrder({ ...args, type: "sell" });
  }

  public async cancelBuyOrder(args: CancelOrderArgs) {
    return this.cancelOrder({ ...args, type: "buy" });
  }

  public async transferToken(args: TransferTokenArgs) {
    return handleError(
      this.withCurrentNetworkFees(async (fees) => {
        const { ledger, wallet } = this.context;
        const { id, decimals } = this.metaData;
        const { unsignedTransactionBytes } = await ledger.asset.transferAsset({
          assetId: id,
          quantity: ChainValue.create(decimals)
            .setCompound(args.tokenAmount)
            .getAtomic(),
          amountPlanck: args.signa || "",
          feePlanck: fees.cheap.toString(10),
          senderPublicKey: this.getAccount().getPublicKey(),
          recipientId: args.recipientId,
        });

        return wallet.confirm(unsignedTransactionBytes);
      }, optionalSigna(args.feeSigna))
    );
  }

  public async transferMultipleToken(args: TransferMultipleTokenArgs) {
    return handleError(
      this.withCurrentNetworkFees(async (fees) => {
        const { ledger, wallet } = this.context;
        const assetQuantities = args.tokenAmounts.map(
          ({ tokenId, tokenAmount, decimals }) => {
            return {
              assetId: tokenId,
              quantity: ChainValue.create(decimals)
                .setCompound(tokenAmount)
                .getAtomic(),
            };
          }
        ) as MultioutAssetQuantities[];
        const { unsignedTransactionBytes } =
          await ledger.asset.transferMultipleAssets({
            assetQuantities,
            amountPlanck: args.signa || "",
            feePlanck: Amount.fromSigna(0.02).getPlanck(),
            senderPublicKey: this.getAccount().getPublicKey(),
            recipientId: args.recipientId,
          });

        return wallet.confirm(unsignedTransactionBytes);
      }, optionalSigna(args.feeSigna))
    );
  }

  public async mintToken(args: BurnTokenArgs) {
    return handleError(
      this.withCurrentNetworkFees(async (fees) => {
        const { ledger, wallet } = this.context;
        const { id, decimals } = this.metaData;
        const { unsignedTransactionBytes } = await ledger.asset.mintAsset({
          assetId: id,
          quantity: ChainValue.create(decimals)
            .setCompound(args.tokenAmount)
            .getAtomic(),
          feePlanck: fees.cheap.toString(10),
          senderPublicKey: this.getAccount().getPublicKey(),
        });

        return wallet.confirm(unsignedTransactionBytes);
      }, optionalSigna(args.feeSigna))
    );
  }

  public async burnToken(
    args: Omit<TransferTokenArgs, "recipientId" | "signa">
  ) {
    return this.transferToken({ ...args, recipientId: "0" });
  }

  public async distribute(args: DistributeTokenArgs) {
    return handleError(async () => {
      const { ledger, wallet } = this.context;
      const { id, decimals } = this.metaData;
      const { unsignedTransactionBytes } =
        await ledger.asset.distributeToAssetHolders({
          assetId: id,
          // @ts-ignore
          totalAmountPlanck: optionalSigna(args.signa)?.getPlanck(),
          additionalAssetId: args.airdropToken
            ? args.airdropToken.metadata.id
            : undefined,
          additionalAssetQuantity: args.airdropToken
            ? ChainValue.create(args.airdropToken.metadata.decimals)
                .setCompound(args.airdropToken.quantity)
                .getAtomic()
            : undefined,
          minimumHoldQuantity: args.minimumHoldersQuantity
            ? ChainValue.create(decimals)
                .setCompound(args.minimumHoldersQuantity)
                .getAtomic()
            : undefined,
          feePlanck: Amount.fromSigna(args.feeSigna).getPlanck(),
          senderPublicKey: this.getAccount().getPublicKey(),
        });
      return wallet.confirm(unsignedTransactionBytes);
    });
  }

  private async getTokenIssuerTransactionHash(tokenId: string) {
    try {
      const issuingTransaction =
        await this.context.ledger.transaction.getTransaction(tokenId);
      if (
        issuingTransaction.type !== TransactionType.Asset &&
        issuingTransaction.subtype !== TransactionAssetSubtype.AssetIssuance
      ) {
        throw new Error(`Unexpected Transaction type for tx:${tokenId}`);
      }
      return issuingTransaction.fullHash;
    } catch (e: any) {
      console.debug(e);
      // ignore....meaning no issuing transaction as issued by Smart Contract
    }
    return "";
  }

  public async setTreasuryAccount(args: SetTreasuryAccountArgs) {
    return handleError(
      this.withCurrentNetworkFees(async (fees) => {
        const { ledger, wallet } = this.context;
        const { issuerIsSmartContract, id } = this.metaData;
        if (issuerIsSmartContract) {
          throw new Error(
            "This token is controlled by a Smart Contract and cannot have treasury accounts"
          );
        }
        const issuerTransactionHash = await this.getTokenIssuerTransactionHash(
          id
        );
        const { unsignedTransactionBytes } =
          await ledger.asset.addAssetTreasuryAccount({
            accountId: args.accountId,
            feePlanck: fees.cheap.toString(10),
            senderPublicKey: this.getAccount().getPublicKey(),
            referencedTransactionFullHash: issuerTransactionHash,
          });
        return wallet.confirm(unsignedTransactionBytes);
      }, optionalSigna(args.feeSigna))
    );
  }

  public async transferTokenOwnership(args: TransferTokenOwnershipArgs) {
    return handleError(async () => {
      const { ledger, wallet } = this.context;
      const { issuerIsSmartContract, id } = this.metaData;
      if (issuerIsSmartContract) {
        throw new Error(
          "This token is controlled by a Smart Contract and cannot transfer ownership"
        );
      }
      const issuerTransactionHash = await this.getTokenIssuerTransactionHash(
        id
      );
      const { unsignedTransactionBytes } =
        await ledger.asset.transferAssetOwnership({
          recipientId: args.recipientId,
          feePlanck: Amount.fromSigna(150).getPlanck(),
          senderPublicKey: this.getAccount().getPublicKey(),
          referencedTransactionFullHash: issuerTransactionHash,
        });

      return wallet.confirm(unsignedTransactionBytes);
    });
  }

  public async fetchTreasuryAccounts() {
    return handleError(async () => {
      const { ledger } = this.context;
      let treasuryAccounts: { accountId: string; accountRS: string }[] = [];
      let hasMore = true;
      let firstIndex = 0;
      while (hasMore) {
        const { accountAssets, nextIndex } = await ledger.asset.getAssetHolders(
          {
            assetId: this.metaData.id,
            firstIndex,
          }
        );
        for (let acc of accountAssets) {
          if (acc.account !== "0" && acc.isTreasury) {
            treasuryAccounts.push({
              accountId: acc.account,
              accountRS: acc.accountRS,
            });
          }
        }
        firstIndex = nextIndex || 0;
        hasMore = nextIndex !== undefined;
      }
      return treasuryAccounts;
    });
  }
}

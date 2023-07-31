import { Amount } from "@signumjs/util";
import { AssetBalance } from "@signumjs/core";

export interface StakingPoolData {
  metaData: StakingPoolMetaData;
  transactionalData: StakingPoolTransactionalData;
}

export interface NftStakingPoolData {
  royaltiesOwnerId: string;
  count: number;
  isNftStake: boolean;
}

export interface StakingPoolMetaData {
  id: string;
  description: string;
  creatorId: string;
  stakingTokenId: string;
  stakingTokenTicker: string;
  stakingTokenDecimals: number;
  pledgeTokenId: string;
  pledgeTokenDigitsFactor: number;
  pledgeTokenDecimals: number;
  yieldTokenId: string;
  yieldTokenDigitsFactor: number;
  yieldTokenDecimals: number;
  airdroppedTokenMinimumQuantity: string;
  paymentIntervalInBlocks: number;
  contractExpiryInMinutes: number;
  stakingTimeoutBlockHeight: number;
  qualifiedMinimumQuantity: string;
  minAmountToDistributeSigna: string;
  minQuantityToDistributeYieldToken: string;
  lockPeriodInMinutes: number;
  lockPeriodTimeEnd: number;
}

export interface StakingPoolTransactionalData {
  balance: string;
  maxAmountPerPayment: string;
  maxQuantityPerPayment: string;
  signaRatio: number;
  yieldTokenRatio: number;
  isLastPayoutDone: boolean;
  totalStaked: number;
  distributedAmount: string;
  distributedQuantity: string;
  lastBlockDistributed: number;
  isExpired: boolean;
  distributionPayouts: StakingContractDistributionPayout[];
  yieldTokenBalance: AssetBalance;
  otherTokenBalances: AssetBalance[];
  nftStaking: NftStakingPoolData;
}

export interface StakingContractDistributionPayout {
  timestamp: number;
  amountSigna: string; // in signa
  quantityToken: string; // in quantity/atomic
  blockHeight: number;
  transactionId: string;
  tokenId: string;
}

export const DefaultStakingPoolMetaData: StakingPoolMetaData = {
  id: "",
  description: "",
  creatorId: "",
  stakingTokenTicker: "",
  stakingTokenDecimals: 0,
  pledgeTokenId: "",
  pledgeTokenDigitsFactor: 0,
  pledgeTokenDecimals: 0,
  yieldTokenId: "",
  yieldTokenDigitsFactor: 0,
  yieldTokenDecimals: 0,
  airdroppedTokenMinimumQuantity: "",
  paymentIntervalInBlocks: 0,
  contractExpiryInMinutes: 0,
  stakingTimeoutBlockHeight: 0,
  qualifiedMinimumQuantity: "",
  minAmountToDistributeSigna: "",
  minQuantityToDistributeYieldToken: "",
  lockPeriodInMinutes: 0,
  lockPeriodTimeEnd: 0,
  stakingTokenId: "",
};

export const DefaultStakingPoolTransactionalData: StakingPoolTransactionalData =
  {
    balance: "",
    maxAmountPerPayment: "",
    maxQuantityPerPayment: "",
    signaRatio: 0,
    yieldTokenRatio: 0,
    totalStaked: 0,
    distributedAmount: "",
    distributedQuantity: "",
    lastBlockDistributed: 0,
    isLastPayoutDone: false,
    isExpired: false,
    distributionPayouts: [],
    otherTokenBalances: [],
    yieldTokenBalance: { asset: "0", balanceQNT: "0" },
    nftStaking: {
      count: 0,
      isNftStake: false,
      royaltiesOwnerId: "",
    },
  };

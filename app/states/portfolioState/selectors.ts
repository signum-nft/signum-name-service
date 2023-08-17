import { RootState } from "@/states/store";
import { TokenOperationState } from "@/app/types/tokenOperation";
import { StakingPoolOperationState } from "@/app/types/stakingPoolOperation";

export const selectTokenOperation = (state: RootState): TokenOperationState =>
  state.portfolioState.tokenOperation;

export const selectAliasOperation = (state: RootState) =>
  state.portfolioState.aliasOperation;

export const selectStakingPoolOperation = (
  state: RootState
): StakingPoolOperationState => state.portfolioState.stakingPoolOperation;

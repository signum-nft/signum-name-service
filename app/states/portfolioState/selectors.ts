import { RootState } from "@/states/store";
import { TokenOperationState } from "@/app/types/tokenOperation";
import { AliasOperationState } from "@/app/types/aliasOperation";
import { StakingPoolOperationState } from "@/app/types/stakingPoolOperation";

export const selectTokenOperation = (state: RootState): TokenOperationState =>
  state.portfolioState.tokenOperation;

export const selectAliasOperation = (state: RootState): AliasOperationState =>
  state.portfolioState.aliasOperation;

export const selectStakingPoolOperation = (
  state: RootState
): StakingPoolOperationState => state.portfolioState.stakingPoolOperation;

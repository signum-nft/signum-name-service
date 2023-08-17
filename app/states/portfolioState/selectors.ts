import { RootState } from "@/states/store";
import { TokenOperationState } from "@/app/types/tokenOperation";
import { SubdomainOperationState } from "@/app/types/subdomainOperation";
import { StakingPoolOperationState } from "@/app/types/stakingPoolOperation";

export const selectTokenOperation = (state: RootState): TokenOperationState =>
  state.portfolioState.tokenOperation;

export const selectAliasOperation = (
  state: RootState
): SubdomainOperationState => state.portfolioState.aliasOperation;

export const selectStakingPoolOperation = (
  state: RootState
): StakingPoolOperationState => state.portfolioState.stakingPoolOperation;

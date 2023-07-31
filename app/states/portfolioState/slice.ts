import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenOperationState } from "@/app/types/tokenOperation";
import { AliasOperationState } from "@/app/types/aliasOperation";
import { StakingPoolOperationState } from "@/app/types/stakingPoolOperation";

export interface PortfolioState {
  tokenOperation: TokenOperationState;
  aliasOperation: AliasOperationState;
  stakingPoolOperation: StakingPoolOperationState;
}

export const initialState: PortfolioState = {
  tokenOperation: { show: false, id: "", ticker: "", action: "" },
  aliasOperation: { show: false, id: "", name: "", action: "" },
  stakingPoolOperation: { show: false, id: "", action: "" },
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    reset: () => initialState,
    setTokenOperation: (state, action: PayloadAction<TokenOperationState>) => {
      state.tokenOperation = action.payload;
    },
    setAliasOperation: (state, action: PayloadAction<AliasOperationState>) => {
      state.aliasOperation = action.payload;
    },
    setStakingPoolOperation: (
      state,
      action: PayloadAction<StakingPoolOperationState>
    ) => {
      state.stakingPoolOperation = action.payload;
    },
  },
});

export const { actions: portfolioActions } = portfolioSlice;

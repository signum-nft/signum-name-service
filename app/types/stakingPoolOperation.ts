export type action = "" | "stake" | "unstake" | "defund";

export type StakingPoolOperationState = {
  show: boolean;
  id: string;
  action: action;
};

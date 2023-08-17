import { RootState } from "@/states/store";
import { SubdomainOperation } from "./slice";

export const selectSubdomainOperation = (
  state: RootState
): SubdomainOperation | null => state.subdomainOperationState.operation;

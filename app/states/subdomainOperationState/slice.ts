import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubdomainAction } from "@/app/types/subdomainOperation";
import { AliasProxy } from "@/app/types/aliasProxy";

export interface SubdomainOperation {
  action: SubdomainAction;
  subdomainName: string;
  alias: AliasProxy;
  nextAlias?: AliasProxy;
  previousAlias?: AliasProxy;
}

interface SubdomainOperationState {
  operation: SubdomainOperation | null;
}
export const initialState: SubdomainOperationState = {
  operation: null,
};

export const subdomainOperationSlice = createSlice({
  name: "subdomainOperation",
  initialState,
  reducers: {
    reset: () => initialState,
    openModal: (state, action: PayloadAction<SubdomainOperation>) => {
      state.operation = action.payload;
    },
    closeModal: (state) => {
      state.operation = null;
    },
  },
});

export const { actions: subdomainOperationsActions } = subdomainOperationSlice;

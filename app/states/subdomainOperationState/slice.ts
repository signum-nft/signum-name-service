import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubdomainAction } from "@/app/types/subdomainAction";
import { AliasProxy } from "@/app/types/aliasProxy";
import { MappedSubdomain } from "@/app/types/mappedSubdomain";

function createSubdomainNameMap(subdomain: MappedSubdomain) {
  let head = subdomain.__listElement;
  while (head.prev) {
    head = head.prev;
  }

  let del = head.next; // head itself is parent domain
  let map: Record<string, 1> = {};
  while (del?.next) {
    if (del.value.data) {
      map[del.value.data.name] = 1;
    }
    del = del.next;
  }

  return map;
}

interface OpenModalArgs {
  action: SubdomainAction;
  subdomain: MappedSubdomain;
}

export interface SubdomainOperation {
  action: SubdomainAction;
  subdomainName: string;
  domainName: string;
  alias: AliasProxy;
  nextAlias?: AliasProxy;
  previousAlias?: AliasProxy;
  subdomainNameMap: Record<string, 1>;
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
    openModal: (state, payloadAction: PayloadAction<OpenModalArgs>) => {
      const { action, subdomain } = payloadAction.payload;

      const next = subdomain.__listElement.next?.value;
      const prev = subdomain.__listElement.prev?.value;
      const subdomainNameMap = createSubdomainNameMap(subdomain);

      state.operation = {
        action,
        domainName: subdomain.domainName,
        subdomainName: subdomain.name,
        subdomainNameMap,
        alias: {
          aliasId: subdomain.aliasId,
          aliasName: subdomain.aliasName,
          aliasTld: subdomain.aliasTld,
        },
        previousAlias: prev
          ? {
              aliasId: prev.id,
              aliasName: prev.name,
              aliasTld: prev.tld,
            }
          : undefined,
        nextAlias: next
          ? {
              aliasId: next.id,
              aliasName: next.name,
              aliasTld: next.tld,
            }
          : undefined,
      };
    },
    closeModal: (state) => {
      state.operation = null;
    },
  },
});

export const { actions: subdomainOperationsActions } = subdomainOperationSlice;

import { DescriptorData } from "@signumjs/standards";
import { Alias, Ledger } from "@signumjs/core";
import { AccountDomain, AccountDomainList } from "@/app/types/accountData";
import LinkedList, { Token } from "fast-linked-list";
import { AliasStatus } from "@/app/types/aliasStatus";

function getSRC44(aliasContent: string) {
  try {
    return DescriptorData.parse(aliasContent, false);
  } catch (e) {
    return null;
  }
}

export const getStatus = (alias: Alias): AliasStatus => {
  const { priceNQT, buyer, account } = alias;

  if (priceNQT && buyer && buyer !== account) {
    return "onPrivateSale";
  }

  if (priceNQT) return "onSale";

  return "notOnSale";
};

function getSubdomainData(d: DescriptorData) {
  return {
    name: d.name ?? "",
    account: d.account ?? "",
    url: d.homePage ?? "",
  };
}

function aliasToDomainAccount(alias: Alias): AccountDomain {
  return {
    tld: alias.tldName,
    name: alias.aliasName,
    price: Number(alias.priceNQT ?? "0"),
    status: getStatus(alias),
    id: alias.alias,
  };
}

export enum StopCode {
  Normal,
  CircularReference,
  MaxDomainsReached,
}

interface FetchSubdomainsArgs {
  ledger: Ledger;
  alias: Alias;
  maxSubdomains: number;
}

interface DomainListResult {
  list: AccountDomainList;
  stopCode: StopCode;
}

/**
 * Fetches a maximum of subdomains per alias (as linked list) from the ledger. Avoids/Breaks on circular references.
 */
export async function fetchLinkedDomainList({
  ledger,
  alias,
  maxSubdomains,
}: FetchSubdomainsArgs): Promise<DomainListResult> {
  const head: AccountDomain = {
    tld: alias.tldName,
    name: alias.aliasName,
    id: alias.alias,
    status: getStatus(alias),
    price: Number(alias.priceNQT ?? "0"),
  };
  const list = new LinkedList<AccountDomain>(head);

  let descriptor = getSRC44(alias.aliasURI);
  if (!descriptor) {
    return Promise.resolve({
      list,
      stopCode: StopCode.Normal,
    });
  }

  head.data = getSubdomainData(descriptor);
  if (!descriptor.alias) {
    return Promise.resolve({
      list,
      stopCode: StopCode.Normal,
    });
  }

  // to control circular references
  const visitedAliasIds = new Set<string>();
  visitedAliasIds.add(alias.alias);
  let currentEl: Token<AccountDomain> = list.firstToken;
  let stopCode: StopCode = StopCode.Normal;
  try {
    const [aliasName, tld] = descriptor.alias.split(":");
    let alias = await ledger.alias.getAliasByName(aliasName, tld);
    currentEl = list.push(aliasToDomainAccount(alias));
    descriptor = DescriptorData.parse(alias.aliasURI); // throws
    currentEl.value.data = getSubdomainData(descriptor);
    let stopSearch = !descriptor.alias;
    let iterationCount = 0;
    while (!stopSearch) {
      // @ts-ignore
      const [aliasName, tld] = descriptor.alias.split(":");
      alias = await ledger.alias.getAliasByName(aliasName, tld);
      currentEl = list.push(aliasToDomainAccount(alias));
      descriptor = DescriptorData.parse(alias.aliasURI);
      currentEl.value.data = getSubdomainData(descriptor);

      stopSearch = !descriptor.alias;
      stopCode = StopCode.Normal;
      if (visitedAliasIds.has(alias.alias)) {
        stopSearch = true;
        stopCode = StopCode.CircularReference;
      }
      if (++iterationCount > maxSubdomains) {
        stopSearch = true;
        stopCode = StopCode.MaxDomainsReached;
      }
      visitedAliasIds.add(alias.alias);
    }
  } catch (e: any) {
    // ignore
  }

  return {
    list,
    stopCode,
  };
}

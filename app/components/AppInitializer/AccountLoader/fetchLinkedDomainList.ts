import { DescriptorData } from "@signumjs/standards";
import { Alias, Ledger } from "@signumjs/core";
import { AccountDomainList } from "@/app/types/accountData";

function getSRC44(aliasContent: string) {
  try {
    return DescriptorData.parse(aliasContent, false);
  } catch (e) {
    return null;
  }
}

function getStatus(alias: Alias) {
  // FIXME: implement get Status
  return "";
}

function getSubdomainData(d: DescriptorData) {
  return {
    name: d.name ?? "",
    account: d.account ?? "",
    url: d.homePage ?? "",
  };
}

function linkDomains(previous: AccountDomainList, alias: Alias) {
  const newDomain: AccountDomainList = {
    tld: alias.tldName,
    name: alias.aliasName,
    price: Number(alias.priceNQT ?? "0"),
    status: getStatus(alias),
    id: alias.alias,
  };
  previous.nextDomain = newDomain;
  newDomain.previousDomain = previous;
  return newDomain;
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
  head: AccountDomainList;
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
  const head: AccountDomainList = {
    tld: alias.tldName,
    name: alias.aliasName,
    id: alias.alias,
    status: getStatus(alias),
    price: Number(alias.priceNQT ?? "0"),
  };

  let descriptor = getSRC44(alias.aliasURI);
  if (!descriptor) {
    return Promise.resolve({
      head,
      stopCode: StopCode.Normal,
    });
  }

  head.data = getSubdomainData(descriptor);
  if (!descriptor.alias) {
    return Promise.resolve({
      head,
      stopCode: StopCode.Normal,
    });
  }

  // to control circular references
  const visitedAliasIds = new Set<string>();
  visitedAliasIds.add(alias.alias);
  let currentEl: AccountDomainList = head;
  let stopCode: StopCode = StopCode.Normal;
  try {
    const [aliasName, tld] = descriptor.alias.split(":");
    let alias = await ledger.alias.getAliasByName(aliasName, tld);
    currentEl = linkDomains(currentEl, alias);
    descriptor = DescriptorData.parse(alias.aliasURI); // throws
    currentEl.data = getSubdomainData(descriptor);
    let stopSearch = !descriptor.alias;
    let iterationCount = 0;
    while (!stopSearch) {
      // @ts-ignore
      const [aliasName, tld] = descriptor.alias.split(":");
      alias = await ledger.alias.getAliasByName(aliasName, tld);
      currentEl = linkDomains(currentEl, alias);
      descriptor = DescriptorData.parse(alias.aliasURI);
      currentEl.data = getSubdomainData(descriptor);

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
    head,
    stopCode,
  };
}

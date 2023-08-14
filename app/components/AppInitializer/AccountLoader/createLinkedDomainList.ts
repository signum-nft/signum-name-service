import { DescriptorData } from "@signumjs/standards";
import { Alias } from "@signumjs/core";
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

interface CreateLinkedDomainList {
  domain: Alias;
  loadedAliases: Alias[];
  maxSubdomains: number;
}

interface DomainListResult {
  list: AccountDomainList;
  stopCode: StopCode;
}

function mountAliasNameWithTld(alias: Alias) {
  return `${alias.aliasName}:${alias.tldName}`;
}

function createToLookupMapFromAliasArray(aliases: Alias[]) {
  const map = new Map<string, Alias>();
  for (let a of aliases) {
    map.set(mountAliasNameWithTld(a), a);
  }
  return map;
}

export function createLinkedDomainList({
  domain,
  loadedAliases,
  maxSubdomains,
}: CreateLinkedDomainList): DomainListResult {
  const head: AccountDomain = {
    tld: domain.tldName,
    name: domain.aliasName,
    id: domain.alias,
    status: getStatus(domain),
    price: Number(domain.priceNQT ?? "0"),
  };
  const lookupMap = createToLookupMapFromAliasArray(loadedAliases);
  const list = new LinkedList<AccountDomain>(head);

  let descriptor = getSRC44(domain.aliasURI);
  if (!descriptor) {
    return {
      list,
      stopCode: StopCode.Normal,
    };
  }

  head.data = getSubdomainData(descriptor);
  if (!descriptor.alias) {
    return {
      list,
      stopCode: StopCode.Normal,
    };
  }

  // to control circular references
  const visitedAliasIds = new Set<string>();
  visitedAliasIds.add(domain.alias);
  let currentEl: Token<AccountDomain> = list.firstToken;
  let stopCode: StopCode = StopCode.Normal;
  const alias = lookupMap.get(descriptor.alias);
  if (!alias) {
    return {
      list,
      stopCode: StopCode.Normal,
    };
  }
  currentEl = list.push(aliasToDomainAccount(alias));
  descriptor = DescriptorData.parse(alias.aliasURI); // throws
  currentEl.value.data = getSubdomainData(descriptor);
  let stopSearch = !descriptor.alias;
  let iterationCount = 0;
  while (!stopSearch) {
    const alias = lookupMap.get(descriptor.alias);
    if (!alias) {
      break;
    }
    currentEl = list.push(aliasToDomainAccount(alias));
    descriptor = DescriptorData.parse(alias.aliasURI);
    currentEl.value.data = getSubdomainData(descriptor);

    stopSearch = !descriptor.alias;
    stopCode = StopCode.Normal;
    if (visitedAliasIds.has(alias.alias)) {
      stopSearch = true;
      stopCode = StopCode.CircularReference;
      console.warn(
        `Circular Reference detected for ${alias.aliasName}:${
          alias.tldName || "signum"
        } - aborted`
      );
    }
    if (++iterationCount > maxSubdomains) {
      stopSearch = true;
      stopCode = StopCode.MaxDomainsReached;
      console.warn(
        `Maximum Amount of Subdomains reached for ${alias.aliasName}:${
          alias.tldName || "signum"
        } - stopped`
      );
    }
    visitedAliasIds.add(alias.alias);
  }

  return {
    list,
    stopCode,
  };
}

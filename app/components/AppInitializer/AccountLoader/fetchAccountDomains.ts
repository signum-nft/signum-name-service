import { Alias } from "@signumjs/core";
import { AccountDomain } from "@/app/types/accountData";
import { createLinkedDomainList } from "./createLinkedDomainList";
import { LedgerService } from "@/app/services/ledgerService";
import { Config } from "@/app/config";

function getSRC44AliasReference(alias: Alias) {
  try {
    const parsed = JSON.parse(alias.aliasURI);
    return parsed.al;
  } catch (e) {
    return "";
  }
}

function createSubdomainLookupSet(aliasMap: Map<string, Alias>) {
  const set = new Set<string>();
  aliasMap.forEach((a) => {
    const src44AliasReference = getSRC44AliasReference(a);
    if (src44AliasReference) {
      const alias = aliasMap.get(src44AliasReference);
      if (alias) {
        set.add(alias.alias);
      }
    }
  });
  return set;
}

function createToLookupMapFromAliasArray(aliases: Alias[]) {
  const map = new Map<string, Alias>();
  for (let a of aliases) {
    const aliasName =
      a.tldName === Config.Signum.DefaultTld
        ? a.aliasName
        : `${a.aliasName}@${a.tldName}`;

    map.set(aliasName, a);
  }
  return map;
}

interface Args {
  ledgerService: LedgerService;
  accountId: string;
  maxAliasLoad: number;
  maxSubdomains: number;
}

export async function fetchAccountDomains({
  accountId,
  maxAliasLoad,
  maxSubdomains,
  ledgerService,
}: Args) {
  let domainCount = 0;
  let startIndex: number | undefined = 0;
  let loadedAliases: Alias[] = [];
  // fetching up to maximum aliases from ledger
  while (startIndex !== undefined && domainCount <= maxAliasLoad) {
    // @ts-ignore
    const { nextIndex, aliases } =
      await ledgerService.alias.fetchAccountAliases({
        accountId,
        startIndex: startIndex ?? 0,
        count: Math.min(500, maxAliasLoad - domainCount),
      });
    loadedAliases.push(...aliases);
    startIndex = nextIndex;
    domainCount += aliases.length;
  }

  // organize subdomains
  let domains: AccountDomain[][] = [];
  const lookupMap = createToLookupMapFromAliasArray(loadedAliases);
  const subdomainSet = createSubdomainLookupSet(lookupMap);
  for (let a of loadedAliases) {
    if (subdomainSet.has(a.alias)) {
      continue;
    }
    // create domain list: first in list are main domains, tail is related subdomain list.
    const { list } = createLinkedDomainList({
      domain: a,
      lookupMap,
      maxSubdomains,
    });
    domains.push(list.toArray());
  }
  return {
    domains,
    domainStats: {
      subdomainCount: subdomainSet.size,
      aliasCount: loadedAliases.length,
      domainCount: domains.length,
    },
  };
}

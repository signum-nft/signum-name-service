import { Alias } from "@signumjs/core";
import { AccountDomain } from "@/app/types/accountData";
import { createLinkedDomainList } from "./createLinkedDomainList";
import { LedgerService } from "@/app/services/ledgerService";
import { Config } from "@/app/config";

function createToLookupMapFromAliasArray(aliases: Alias[]) {
  const map = new Map<string, Alias>();
  for (let a of aliases) {
    const aliasName =
      a.tldName === Config.Signum.DefaultTld
        ? a.aliasName
        : `${a.aliasName}:${a.tldName}`;
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
  let ignoreAliasIds = new Set<string>();
  const lookupMap = createToLookupMapFromAliasArray(loadedAliases);
  for (let a of loadedAliases) {
    // skip aliases which are already identified as subdomains.
    if (ignoreAliasIds.has(a.alias)) {
      console.log("ignoring alias", a.alias, a.aliasName);
      continue;
    }

    console.log("using alias", a.alias, a.aliasName);

    // create domain list: first in list are main domains, tail is related subdomain list.
    const { list } = createLinkedDomainList({
      domain: a,
      lookupMap,
      maxSubdomains,
    });

    domains.push(list.toArray());
    // add domain and its subdomain to ignore list
    for (let d of list) {
      console.log("adding to ignore list", d.id, d.name);
      ignoreAliasIds.add(d.id);
    }
  }
  return domains;
}

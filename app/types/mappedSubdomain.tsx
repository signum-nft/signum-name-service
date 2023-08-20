import { Tail, Token } from "fast-linked-list";
import { AccountDomain } from "@/app/types/accountData";

export interface MappedSubdomain {
  aliasId: string;
  aliasName: string;
  aliasTld: string;
  domainName: string;
  name: string;
  accountId: string;
  accountAddress: string;
  url: string;
  __listElement: Token<AccountDomain>;
}

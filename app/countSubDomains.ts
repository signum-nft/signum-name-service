import LinkedList from "fast-linked-list";
import { AccountDomain } from "@/app/types/accountData";

export function countSubDomains(domainList: LinkedList<AccountDomain>): number {
  let count = 0;
  for (let d of domainList) {
    count++;
  }
  return count - 1; // first is parent domain
}

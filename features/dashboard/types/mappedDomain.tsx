import { AccountDomain } from "@/app/types/accountData";

export interface MappedDomain extends AccountDomain {
  subdomainCount: number;
}

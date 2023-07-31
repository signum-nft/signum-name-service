export type AccountType =
  | "hum"
  | "smc"
  | "bot"
  | "tok"
  | "biz"
  | "cex"
  | "dex"
  | "oth";

// Array used for map rendering
export const AccountTypesList: AccountType[] = [
  "hum",
  "smc",
  "bot",
  "tok",
  "biz",
  "cex",
  "dex",
  "oth",
];

// Map used for identifying labels
export const AccountTypeMap = new Map<AccountType, string>([
  ["hum", "humanAccount"],
  ["smc", "smartContractAccount"],
  ["bot", "botAccount"],
  ["tok", "token"],
  ["biz", "businessAccount"],
  ["cex", "centralizedExchangeAccount"],
  ["dex", "decentralizedExchangeAccount"],
  ["oth", "other"],
]);

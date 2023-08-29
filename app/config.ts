import * as process from "process";

const toNumber = (v: any): number => {
  const n = parseFloat(v);
  return Number.isNaN(n) ? -1 : n;
};

const toBoolean = (v: string): boolean => v.toLowerCase() === "true";

const IsTestnet = toBoolean(
  process.env.NEXT_PUBLIC_SIGNUM_IS_TESTNET || "false"
);

const ReliableNodes = process.env.NEXT_PUBLIC_SIGNUM_RELIABLE_NODES?.split(
  ","
) || [
  IsTestnet
    ? "https://europe3.testnet.signum.network"
    : "https://europe.signum.network",
];

export const Config = {
  Signum: {
    IsTestnet,
    Explorer: process.env.NEXT_PUBLIC_SIGNUM_EXPLORER || "",
    Network: process.env.NEXT_PUBLIC_SIGNUM_NETWORK || "Signum-TESTNET",
    SignumSwap: process.env.NEXT_PUBLIC_SIGNUM_SWAP || "",
    PlatformAccounts: {},
    ReliableNodes,
    DefaultNode: ReliableNodes[0],
    DefaultTld: "signum",
  },
  Platform: {
    IsMaintenance: toBoolean(process.env.NEXT_PUBLIC_IS_MAINTENANCE || "false"),
    Name: process.env.NEXT_PUBLIC_PLATFORM_NAME || "signumswap.com",
    MaxAliasLoad: toNumber(process.env.NEXT_PUBLIC_MAX_ALIASES || "5000"),
    MaxSubdomains: toNumber(process.env.NEXT_PUBLIC_MAX_SUBDOMAINS || "100"),
    DocumentationUrl:
      process.env.NEXT_PUBLIC_PLATFORM_DOCUMENTATION_URL ||
      "https://docs.signum.network/signumswap",
    CanonicalUrl:
      process.env.NEXT_PUBLIC_PLATFORM_CANONICAL_URL ||
      "https://signumswap.com",
  },
};

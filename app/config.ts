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
  Contracts: {
    StakingContract: {
      Reference: process.env.NEXT_PUBLIC_STAKING_CONTRACT_REFERENCE || "",
      DeploymentCosts: toNumber(
        process.env.NEXT_PUBLIC_STAKING_CONTRACT_DEPLOYMENT_COSTS || "2.5"
      ),
      CodeHash: process.env.NEXT_PUBLIC_STAKING_CONTRACT_CODE_HASH || "",
    },
    LiquidityContract: {
      PortalFees:
        process.env.NEXT_PUBLIC_LIQUIDITY_CONTRACT_PORTAL_FEES || "0.05",
    },
  },
  Platform: {
    IsMaintenance: toBoolean(process.env.NEXT_PUBLIC_IS_MAINTENANCE || "false"),
    Name: process.env.NEXT_PUBLIC_PLATFORM_NAME || "signumswap.com",
    MaxAliasLoad: toNumber(process.env.NEXT_PUBLIC_MAX_ALIASES || "10000"),
    MaxSubdomains: toNumber(process.env.NEXT_PUBLIC_MAX_SUBDOMAINS || "100"),
    SignumArtUrl: process.env.NEXT_PUBLIC_SIGNUM_ART || "",
    DocumentationUrl:
      process.env.NEXT_PUBLIC_PLATFORM_DOCUMENTATION_URL ||
      "https://docs.signum.network/signumswap",
    CanonicalUrl:
      process.env.NEXT_PUBLIC_PLATFORM_CANONICAL_URL ||
      "https://signumswap.com",
  },
};

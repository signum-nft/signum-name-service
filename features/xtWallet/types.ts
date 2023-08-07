export enum WalletConnectionStatus {
  Uninitialized = -2,
  Errored = -1,
  Disconnected,
  Disconnecting,
  Connecting,
  Connected,
}
export type NetworkNameType = "Signum" | "Signum-TESTNET" | string;
export type StatusReason =
  | ""
  | "user-disconnected"
  | "permission-removed"
  | "account-removed"
  | "account-changed"
  | "network-changed";

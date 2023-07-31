import { Config } from "@/app/config";

export const getNativeTicker = (): string =>
  Config.Signum.IsTestnet ? "TSIGNA" : "SIGNA";

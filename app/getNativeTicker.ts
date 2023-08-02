import { Config } from "@/app/config";

/**
 * @deprecated Use selector
 */
export const get = (): string => (Config.Signum.IsTestnet ? "TSIGNA" : "SIGNA");

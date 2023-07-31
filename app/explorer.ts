import { Config } from "./config";
import { openExternalUrl } from "./openExternalUrl";

export const getExplorerUrl = (url: string): string => {
  if (url.startsWith("/")) {
    url = url.slice(1);
  }

  return Config.Signum.Explorer + url;
};

export const openExplorer = (path: string): void =>
  openExternalUrl(getExplorerUrl(path));

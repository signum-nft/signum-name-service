import { FC, createContext } from "react";
import { isMobile, isFirefox } from "react-device-detect";
import { DeeplinkableWallet, GenericExtensionWallet } from "@signumjs/wallets";
import { isClientSide } from "../isClientSide";
import { Config } from "../config";
import { ChildrenProps } from "../../types/ChildrenProps";

export interface AppContextType {
  NativeTicker: string;
  TokenTrtId: string;
  IsClientSide: boolean;
  IsMobile: boolean;
  IsFirefox: boolean;
  Wallet: {
    Extension: GenericExtensionWallet;
    Deeplink: DeeplinkableWallet;
  };
  Ledger: {
    IsTestnet: boolean;
    Network: string;
  };
  Platform: typeof Config.Platform;
  Contracts: typeof Config.Contracts;
  Explorer: string;
}

const config: AppContextType = {
  IsMobile: isMobile,
  IsFirefox: isFirefox,
  IsClientSide: isClientSide(),
  NativeTicker: Config.Signum.NativeTicker,
  TokenTrtId: Config.Signum.TokenTrtId,
  Platform: { ...Config.Platform },
  Contracts: { ...Config.Contracts },
  Wallet: {
    Extension: new GenericExtensionWallet(),
    Deeplink: new DeeplinkableWallet({ openInBrowser: true }),
  },
  Ledger: {
    IsTestnet: Config.Signum.IsTestnet,
    Network: Config.Signum.Network,
  },
  Explorer: Config.Signum.Explorer,
};

export const AppContext = createContext<AppContextType>(config);

export const AppContextProvider: FC<ChildrenProps> = ({ children }) => {
  return <AppContext.Provider value={config}>{children}</AppContext.Provider>;
};

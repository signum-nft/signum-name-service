import { FC, createContext } from "react";
import { isMobile, isFirefox } from "react-device-detect";
import { DeeplinkableWallet, GenericExtensionWallet } from "@signumjs/wallets";
import { isClientSide } from "../isClientSide";
import { Config } from "../config";
import { ChildrenProps } from "@/types/ChildrenProps";
import { MarketService } from "@/app/services/marketService";

export interface AppContextType {
  IsClientSide: boolean;
  IsMobile: boolean;
  IsFirefox: boolean;
  Ledger: {
    IsTestnet: boolean;
    Network: string;
  };
  Platform: typeof Config.Platform;
  Explorer: string;
  SignumSwap: string;
  Services: {
    Market: MarketService;
  };
}

const config: AppContextType = {
  IsMobile: isMobile,
  IsFirefox: isFirefox,
  IsClientSide: isClientSide(),
  Platform: { ...Config.Platform },
  Ledger: {
    IsTestnet: Config.Signum.IsTestnet,
    Network: Config.Signum.Network,
  },
  Explorer: Config.Signum.Explorer,
  SignumSwap: Config.Signum.SignumSwap,
  Services: {
    Market: new MarketService(),
  },
};

export const AppContext = createContext<AppContextType>(config);

export const AppContextProvider: FC<ChildrenProps> = ({ children }) => {
  return <AppContext.Provider value={config}>{children}</AppContext.Provider>;
};

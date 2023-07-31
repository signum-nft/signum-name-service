import { useAppContext } from "./useAppContext";

export const useExtensionWallet = () => {
  const { Wallet } = useAppContext();
  return Wallet.Extension;
};

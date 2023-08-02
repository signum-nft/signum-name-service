import { useXTWallet } from "@/app/hooks/useXTWallet";

export const useExtensionWallet = () => {
  const { wallet } = useXTWallet();
  return wallet;
};

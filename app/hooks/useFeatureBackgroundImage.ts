import { useRouter } from "next/router";
import { useMemo } from "react";
import { useAppSelector } from "@/states/hooks";
import { selectIsDarkMode } from "@/app/states/appState";

export const useFeatureBackgroundImage = (disableGradient = false) => {
  const router = useRouter();
  const { pathname } = router;
  const isDarkMode = useAppSelector(selectIsDarkMode);

  const backgroundImage = useMemo(() => {
    if (disableGradient) return isDarkMode ? "#1E1E1E" : "#FFFFFF";

    // Alias related routes
    if (pathname.includes("/alias"))
      return isDarkMode
        ? "linear-gradient(rgba(30, 150, 0,0.3) 0%, rgb(25, 28, 31) 85%)"
        : "radial-gradient(100% 100% at 50% 0%, rgba(82, 194, 52,0.3) 0%, rgba(255, 255, 255, 0) 100%)";

    // Staking pool related routes
    if (pathname.includes("/staking-pools"))
      return isDarkMode
        ? "linear-gradient(rgba(243, 144, 79, 0.3) 0%, rgb(25, 28, 31) 85%)"
        : "radial-gradient(100% 100% at 50% 0%, rgba(252, 160, 101,0.3) 0%, rgba(255, 255, 255, 0) 100%)";

    // Liquidity pool related routes
    if (pathname.includes("/liquidity-pools"))
      return isDarkMode
        ? "linear-gradient(rgba(59, 67, 113, 0.3) 0%, rgb(22, 25, 44) 85%)"
        : "radial-gradient(100% 100% at 50% 0%, rgba(98, 104, 141, 0.3) 0%, rgba(255, 255, 255, 0) 100%)";

    // Default route
    return isDarkMode
      ? "linear-gradient(rgb(43, 32, 56) 0%, rgb(25, 28, 31) 85%)"
      : "radial-gradient(100% 100% at 50% 0%, rgba(183, 95, 253, 0.3) 0%, rgba(255, 255, 255, 0) 100%)";
  }, [isDarkMode, pathname, disableGradient]);

  return backgroundImage;
};

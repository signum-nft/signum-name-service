import { useRouter } from "next/router";
import { useMemo } from "react";
import { useAppSelector } from "@/states/hooks";
import { selectIsDarkMode } from "@/app/states/appState";

const Colors = {
  Orange: (alpha = 1.0) => `rgb(243,177,103, ${alpha})`,
  Pink: (alpha = 1.0) => `rgb(236,56,188, ${alpha})`,
  Violet: (alpha = 1.0) => `rgb(115,3,192, ${alpha})`,
};

export const useFeatureBackgroundImage = (disableGradient = false) => {
  const router = useRouter();
  const { pathname } = router;
  const isDarkMode = useAppSelector(selectIsDarkMode);

  return useMemo(() => {
    if (disableGradient) return isDarkMode ? "#1E1E1E" : "#FFFFFF";

    if (pathname.includes("/dashboard"))
      return isDarkMode
        ? `linear-gradient(${Colors.Orange()} 0%, ${Colors.Pink(
            0.6
          )} 66%, ${Colors.Violet(0.1)})`
        : `radial-gradient(100% 100% at 50% 0%, ${Colors.Orange()} 0%, ${Colors.Pink(
            0.5
          )} 50%, rgba(255, 255, 255, 0) 100%)`;

    if (pathname.includes("/domains"))
      return isDarkMode
        ? `linear-gradient(${Colors.Orange()} 0%, ${Colors.Pink(
            0.6
          )} 66%, ${Colors.Violet(0.1)})`
        : `radial-gradient(100% 100% at 50% 0%, ${Colors.Orange()} 0%, ${Colors.Pink(
            0.5
          )} 50%, rgba(255, 255, 255, 0) 100%)`;

    // Default route
    return isDarkMode
      ? "linear-gradient(rgb(43, 32, 56) 0%, rgb(25, 28, 31) 85%)"
      : "radial-gradient(100% 100% at 50% 0%, rgba(183, 95, 253, 0.3) 0%, rgba(255, 255, 255, 0) 100%)";
  }, [isDarkMode, pathname, disableGradient]);
};

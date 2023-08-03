import { useRouter } from "next/router";
import { useMemo, FC, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { createEmotionCache } from "@/app/createEmotionCache";
import { useAppSelector } from "@/states/hooks";
import { selectThemeMode } from "@/app/states/appState";
import { ChildrenProps } from "@/types/ChildrenProps";

import CssBaseline from "@mui/material/CssBaseline";

export interface ThemeContextType {
  themeMode: "dark" | "light";
}

export const ThemeContext = createContext<ThemeContextType>({
  themeMode: "dark",
});

export const ThemeContextProvider: FC<ChildrenProps> = ({ children }) => {
  const themeMode = useAppSelector(selectThemeMode);
  const router = useRouter();
  const { pathname } = router;

  const theme = useMemo(() => {
    const scrollbarThumbBackgroundColor =
      themeMode === "light" ? "#a0a0a0" : "#6b6b6b";

    const scrollbarThumbHighlight =
      themeMode === "light" ? "#cbcbcb" : "#959595";

    const contrastText =
      themeMode === "light" ? "rgba(0, 0, 0, 0.87)" : "#ffffff";

    const lightThemeBackground = { paper: "#ffffff", default: "#ffffff" };
    const darkThemeBackground = {
      paper: "rgb(25, 28, 31)",
      default: "rgb(25, 28, 31)",
    };

    // Default colors
    let selectedThemeColor = {
      primary: {
        main: "#7b1fa2",
        contrastText,
      },
    };

    // Alias related colors
    if (pathname.includes("/alias")) {
      selectedThemeColor = {
        // @ts-ignore
        primary: {
          main: "#1E9600",
          contrastText,
        },
      };
    }

    // Staking pool related colors
    if (pathname.includes("/staking-pools")) {
      selectedThemeColor = {
        // @ts-ignore
        primary: {
          main: "#F3904F",
          contrastText,
        },
      };
    }

    // Liquidity pool related colors
    if (pathname.includes("/liquidity-pools")) {
      selectedThemeColor = {
        // @ts-ignore
        primary: {
          main: "#3B4371",
          contrastText,
        },
      };
    }

    return createTheme({
      palette: {
        mode: themeMode,
        ...selectedThemeColor,
        secondary: {
          light: "#ffca84",
          main: "#ffb856",
          dark: "#d79937",
          contrastText,
        },
        background:
          themeMode === "light" ? lightThemeBackground : darkThemeBackground,
      },
      typography: {
        button: { textTransform: "none" },
      },
      shape: {
        borderRadius: 2,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              scrollbarWidth: "thin",
              scrollbarColor: `${scrollbarThumbBackgroundColor} transparent`,
              "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                backgroundColor: "transparent",
                width: 4,
              },
              "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                borderRadius: 8,
                backgroundColor: scrollbarThumbBackgroundColor,
                minHeight: 24,
              },
              "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
                {
                  backgroundColor: scrollbarThumbHighlight,
                },
              "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
                {
                  backgroundColor: scrollbarThumbHighlight,
                },
              "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                {
                  backgroundColor: scrollbarThumbHighlight,
                },
            },
          },
        },
      },
    });
  }, [themeMode, pathname]);

  const clientSideEmotionCache = createEmotionCache();

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeContext.Provider value={{ themeMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  );
};

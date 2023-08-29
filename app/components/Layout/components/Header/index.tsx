import { useAppContext } from "@/app/hooks/useAppContext";
import { useAppSelector } from "@/states/hooks";
import { selectIsDarkMode } from "@/app/states/appState";
import { AppSideBar } from "./components/AppSideBar";
import { Stamp } from "./components/Stamp";
import { LogoLabel } from "./components/LogoLabel";
import { Breadcrumbs } from "./components/BreadCrumbs";

import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export const Header = () => {
  const {
    IsFirefox,
    Platform: { IsMaintenance },
    Ledger: { IsTestnet },
  } = useAppContext();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  let background: any = isDarkMode
    ? { xs: "rgba(25, 28, 31, 1)", lg: "rgba(25, 28, 31, 0.8)" }
    : { xs: "#ffffff", lg: "rgba(255, 255, 255, 0.8)" };

  if (IsFirefox) background = isDarkMode ? "rgba(25, 28, 31, 1)" : "#ffffff";

  return (
    <AppBar
      position="sticky"
      sx={{
        transition: "all .2s ease 0s",
        backdropFilter: "saturate(180%) blur(20px)",
        boxShadow: "inset 0 -0.5px 0 0 hsla(0, 0%, 100%, 0.1)",
        background,
      }}
    >
      <Toolbar
        sx={{
          position: "relative",
          flexGrow: 1,
          maxWidth: 1600,
          width: "100%",
          mx: "auto",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Breadcrumbs />
        </Box>
        {IsTestnet && <Stamp label="Testnet 😊" />}

        <Box display="flex">
          <Link href="/" passHref>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={{ textDecoration: "none" }}
            >
              <Image
                src={`/assets/img/${
                  isDarkMode ? "white_logo.svg" : "black_logo.svg"
                }`}
                width={32}
                height={32}
                alt="SignumSwap logo"
                priority
                unoptimized
              />

              <LogoLabel />
            </Box>
          </Link>
        </Box>

        {!IsMaintenance && (
          <>
            <Box display="flex">
              <AppSideBar />
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

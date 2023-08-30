import { useAppContext } from "@/app/hooks/useAppContext";
import { useAppSelector } from "@/states/hooks";
import { selectIsDarkMode } from "@/app/states/appState";
import { AppSideBar } from "./components/AppSideBar";
import { Stamp } from "./components/Stamp";
import { Breadcrumbs } from "../Breadcrumbs/BreadCrumbs";

import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { AttentionSeeker } from "react-awesome-reveal";
import { OverlayStamp } from "@/app/components/OverlayStamp";
export const Header = () => {
  const {
    IsFirefox,
    Platform: { IsMaintenance },
  } = useAppContext();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  let background: any = isDarkMode
    ? { xs: "rgba(25, 28, 31, 0.2)", lg: "rgba(25, 28, 31, 0.2)" }
    : { xs: "rgba(255, 255, 255, 0.2)", lg: "rgba(255, 255, 255, 0.2)" };

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
      <OverlayStamp />
      <Toolbar
        sx={{
          position: "relative",
          flexGrow: 1,
          maxWidth: 1500,
          width: "100%",
          mx: "auto",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          position="relative"
        >
          <Link
            href="https://signum.network"
            rel="nofollow noopener noreferrer"
          >
            <AttentionSeeker
              effect="heartBeat"
              delay={2_000}
              triggerOnce={false}
            >
              <Image
                src={`/assets/img/${
                  isDarkMode ? "white_logo.svg" : "black_logo.svg"
                }`}
                width={40}
                height={40}
                alt="Signum logo"
                priority
                unoptimized
              />
            </AttentionSeeker>
          </Link>
          <Box ml={3} sx={{ display: { xs: "none", md: "flex" } }}>
            <Breadcrumbs />
          </Box>
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

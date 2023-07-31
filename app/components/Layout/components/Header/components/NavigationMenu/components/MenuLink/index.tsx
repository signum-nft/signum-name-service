/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { useAppSelector } from "@/states/hooks";
import { useAppContext } from "@/app/hooks/useAppContext";
import { selectIsDarkMode } from "@/app/states/appState";
import { useTranslation } from "next-i18next";
import { TradeMenu } from "./sections/TradeMenu";
import { PoolMenu } from "./sections/PoolMenu";
import { ExtraMenu } from "./sections/ExtraMenu";

import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
  type: "trade" | "pool" | "alias" | "extra";
  url?: string;
}

export const MenuLink = ({ type, url }: Props) => {
  const { t } = useTranslation();
  const { IsFirefox } = useAppContext();
  const theme = useTheme();
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const navigationMenuRef = useRef<HTMLDivElement | null>(null);

  const itemHasMenu = type == "trade" || type === "pool" || type == "extra";

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const openSubmenu = () => itemHasMenu && setIsSubMenuOpen(true);
  const closeSubmenu = () => setIsSubMenuOpen(false);

  let title = "";
  switch (type) {
    case "trade":
      title = t("trade");
      break;

    case "pool":
      title = t("pool_other");
      break;

    case "alias":
      title = t("alias");
      break;

    case "extra":
      title = t("more");
      break;

    default:
      break;
  }

  let background: any = isDarkMode
    ? { xs: "rgba(25, 28, 31, 1)", lg: "rgba(25, 28, 31, 0.9)" }
    : { xs: "#ffffff", lg: "rgba(255, 255, 255, 0.8)" };

  if (IsFirefox) background = isDarkMode ? "rgba(25, 28, 31, 1)" : "#ffffff";

  return (
    <Box
      display="flex"
      component="li"
      position="relative"
      mr={2}
      role="none"
      onMouseOver={openSubmenu}
      onFocus={openSubmenu}
      onMouseOut={closeSubmenu}
      onBlur={closeSubmenu}
    >
      <Link href={url || ""} passHref>
        <Typography
          fontWeight={500}
          px={2}
          py={1}
          component={url ? "a" : "span"}
          ref={navigationMenuRef}
          aria-expanded={isSubMenuOpen ? "true" : "false"}
          sx={{
            color: "inherit",
            borderRadius: 2,
            alignItems: "center",
            display: "flex",
            cursor: "pointer",
          }}
          css={css`
            :hover {
              color: ${theme.palette.primary.main};
            }
          `}
        >
          {title}
          {itemHasMenu && <KeyboardArrowDownIcon />}
        </Typography>
      </Link>

      <Popper
        open={isSubMenuOpen}
        anchorEl={navigationMenuRef.current}
        transition
        placement="bottom-start"
        sx={{ zIndex: 1200, pointerEvents: isSubMenuOpen ? "visible" : "none" }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              variant="outlined"
              sx={{
                minWidth: 250,
                borderRadius: 2,
                overflow: "hidden",
                borderColor: "divider",
                backdropFilter: { xs: "none", lg: "saturate(180%) blur(20px)" },
                background,
              }}
            >
              {type == "trade" && <TradeMenu />}
              {type == "pool" && <PoolMenu />}
              {type == "extra" && <ExtraMenu />}
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "@/app/hooks/useAppContext";
import { useAppSelector } from "@/states/hooks";
import { selectIsDarkMode } from "@/app/states/appState";

import Typography from "@mui/material/Typography";

export const LogoLabel = () => {
  const { IsMobile } = useAppContext();
  const theme = useTheme();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  return (
    <Typography
      sx={{
        ml: 1,
        fontSize: { xs: "1rem", md: "1.6rem" },
      }}
      color="textPrimary"
      fontWeight={700}
      fontFamily="Montserrat, sans-serif"
    >
      {IsMobile && "SignumSwap"}

      {!IsMobile && (
        <>
          <Typography
            component="span"
            variant="inherit"
            fontWeight="inherit"
            css={css`
              background: linear-gradient(
                45deg,
                ${isDarkMode ? "rgba(232, 243, 255, 1)" : "rgba(0, 0, 0, 0.9)"}
                  62%,
                ${theme.palette.primary.main} 100%
              );

              background-size: 100% 100%;
              background-position-y: 0px;
              background-clip: text;
              -webkit-background-clip: text;
              -moz-background-clip: text;
              -webkit-text-fill-color: transparent;
              -moz-text-fill-color: transparent;
            `}
          >
            Signum
          </Typography>

          <Typography
            component="span"
            variant="inherit"
            fontWeight="inherit"
            css={css`
              background: linear-gradient(
                83deg,
                #c0392b 0%,
                ${theme.palette.primary.main} 50%,
                #c0392b 100%
              );

              background-size: 400% 100%;
              background-clip: text;
              -webkit-background-clip: text;
              -moz-background-clip: text;
              -webkit-text-fill-color: transparent;
              -moz-text-fill-color: transparent;
              animation: gradient 30s ease infinite;

              @keyframes gradient {
                0% {
                  background-position: 0% 0%;
                }
                50% {
                  background-position: 100% 100%;
                }
                100% {
                  background-position: 0% 0%;
                }
              }
            `}
          >
            Swap
          </Typography>
        </>
      )}
    </Typography>
  );
};

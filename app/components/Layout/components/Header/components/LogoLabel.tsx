import { useAppContext } from "@/app/hooks/useAppContext";
import { useAppSelector } from "@/states/hooks";
import { selectIsDarkMode } from "@/app/states/appState";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { css } from "@emotion/react";

export const LogoLabel = () => {
  const { IsMobile } = useAppContext();
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
      {IsMobile && "SignumNS"}

      {!IsMobile && (
        <Box sx={{ position: "relative" }}>
          {/* @ts-ignore */}
          <Typography
            component="span"
            variant="inherit"
            fontWeight="inherit"
            css={css`
              background: linear-gradient(
                83deg,
                #f3b167 0%,
                #ec38bc 33%,
                #7303c0 66%,
                ${isDarkMode ? "rgba(232, 243, 255, 1)" : "#03001e"} 100%
              );
              background-size: 400% 100%;
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: gradient 60s ease infinite;

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
            SignumNS
          </Typography>
        </Box>
      )}
    </Typography>
  );
};

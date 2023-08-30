import { useTranslation } from "next-i18next";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useXTWallet } from "@/features/xtWallet/useXTWallet";
import { useAppDispatch } from "@/states/hooks";
import CircularProgress from "@mui/material/CircularProgress";
import { ExtensionWalletError } from "@signumjs/wallets";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { appActions } from "@/app/states/appState";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AttentionSeeker, Fade, Slide } from "react-awesome-reveal";

export const TopSection = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showError } = useSnackbar();
  const { connect, isWalletConnected, error } = useXTWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

  useEffect(() => {
    if (error instanceof ExtensionWalletError) {
      switch (error.name) {
        case "NotFoundWalletError":
          dispatch(appActions.setWalletModal(true));
          break;
        case "InvalidNetworkError":
          dispatch(appActions.setWalletWrongNetworkModal(true));
          break;
        default:
          showError(error.message);
      }
    }
  }, [dispatch, error]); // don't add showError! - loops

  const handleOnWalletConnect = async () => {
    setIsConnecting(true);
    const isConnected = await connect();
    if (isConnected) {
      await goToDashboard();
    } else {
      setIsConnecting(false);
    }
  };

  const goToDashboard = () => router.push("/dashboard");

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="stretch"
      position="relative"
      mb={2}
      px={2}
      sx={{
        py: { xs: 4, md: 8, xl: 10 },
        filter: "drop-shadow(0px 4px 20px black)",
      }}
    >
      <Box
        width="100%"
        height="100%"
        position="absolute"
        top={"-64px"}
        left={0}
        zIndex={-2}
        sx={{
          height: "504px",
          background: `linear-gradient(to bottom, #f3b167, #ec38bc, #7303c0, #03001e)`,
          clipPath: "url(#myCurve)",
        }}
      />

      <svg width="0" height="0">
        <defs>
          <clipPath id="myCurve" clipPathUnits="objectBoundingBox">
            <path
              d="M 0,1
									L 0,0
									L 1,0
									L 1,1
									C .65 .8, .35 .8, 0 1
									Z"
            />
          </clipPath>
        </defs>
      </svg>

      <Box
        width={"360px"}
        height={"360px"}
        position="fixed"
        top={0}
        left={{ xs: "-20%", sm: "20%" }}
        zIndex={-2}
        sx={{
          display: "block",
          opacity: 0.1,
        }}
      >
        <img src="/assets/img/signum_node_white.svg" alt="Signum Node Logo" />
      </Box>

      <Stack
        direction="column"
        sx={{
          textAlign: { xs: "center", lg: "left" },
          justifyContent: { xs: "center", lg: "flex-start" },
        }}
      >
        <Typography
          component="h1"
          fontWeight={700}
          color="white"
          sx={{
            fontSize: { xs: 32, md: 52 },
            flexDirection: "row",
            display: "flex",
            position: "relative",
          }}
        >
          <Fade cascade triggerOnce={true} duration={200}>
            Signum Name System
          </Fade>

          <Fade delay={2_250}>
            <Slide direction="up" delay={2_000} triggerOnce={true}>
              <Typography
                fontWeight={800}
                color="secondary"
                sx={{
                  top: 0,
                  fontSize: { xs: "1rem", md: "2rem" },
                  filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.5))",
                }}
              >
                beta
              </Typography>
            </Slide>
          </Fade>
        </Typography>

        <Fade triggerOnce={true}>
          <Typography
            component="h1"
            fontWeight={700}
            color="white"
            sx={{
              fontSize: { xs: 26, md: 42 },
            }}
          >
            {t("topSectionSubTitle")}
          </Typography>

          <Typography fontWeight={700} color="white" sx={{ mb: 2 }}>
            {t("topSectionDescription")}
          </Typography>
        </Fade>

        <AttentionSeeker effect="tada">
          <Stack
            direction="row"
            flexWrap="nowrap"
            alignItems="stretch"
            justifyContent="center"
            mt={2}
            width="100%"
          >
            {isWalletConnected ? (
              <Button
                variant="contained"
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: { xs: "22px", sm: "28px" },
                  color: "white",
                  fontSize: { xs: "18px", sm: "24px" },
                  filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.5))",
                  backgroundColor: "#ec38bc",
                }}
                className="glance-effect"
                onClick={goToDashboard}
                startIcon={
                  isConnecting ? (
                    <CircularProgress variant="indeterminate" size={20} />
                  ) : (
                    <DashboardIcon />
                  )
                }
                disabled={isConnecting}
              >
                {t("gotoDashboard")}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: { xs: "22px", sm: "28px" },
                  color: "white",
                  fontSize: { xs: "18px", sm: "24px" },
                  filter: "drop-shadow(0px 2px 3px #f3b167)",
                }}
                className="glance-effect"
                onClick={handleOnWalletConnect}
                startIcon={
                  isConnecting ? (
                    <CircularProgress variant="indeterminate" size={20} />
                  ) : (
                    <AccountBalanceWalletIcon />
                  )
                }
                disabled={isConnecting}
              >
                {t("connectWallet")}
              </Button>
            )}
          </Stack>
        </AttentionSeeker>
      </Stack>
    </Box>
  );
};

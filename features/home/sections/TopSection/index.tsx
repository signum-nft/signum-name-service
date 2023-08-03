import { useTranslation } from "next-i18next";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppContext } from "@/app/hooks/useAppContext";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { ConnectionStatus, useXTWallet } from "@/app/hooks/useXTWallet";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { selectIsDarkMode } from "@/app/states/appState";
import CircularProgress from "@mui/material/CircularProgress";
import { ExtensionWalletError } from "@signumjs/wallets";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { appActions } from "@/app/states/appState";
import { useEffect } from "react";

export const TopSection = () => {
  const { t } = useTranslation();
  const {
    Platform,
    Ledger: { Network },
  } = useAppContext();
  const { connect, status, error } = useXTWallet();
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const dispatch = useAppDispatch();
  const { showError } = useSnackbar();

  const isWalletConnected = status.code === ConnectionStatus.Connected;

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
  }, [dispatch, error]);

  const handleOnWalletConnect = () => {
    connect(Platform.Name, Network);
  };

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
        top={0}
        left={0}
        zIndex={-1}
        sx={{
          height: "400px",
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
          }}
        >
          {t("topSectionTitle")}
        </Typography>
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

        <Stack
          direction="row"
          flexWrap="nowrap"
          alignItems="stretch"
          justifyContent="center"
          mb={2}
          width="100%"
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              color: "white",
              fontSize: { xs: "18px", sm: "24px" },
              filter: "drop-shadow(0px 2px 3px #f3b167)",
            }}
            onClick={handleOnWalletConnect}
            startIcon={
              isWalletConnected ? (
                <CircularProgress variant="indeterminate" size={20} />
              ) : (
                <AccountBalanceWalletIcon />
              )
            }
            disabled={isWalletConnected}
          >
            {t("connectWallet")}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

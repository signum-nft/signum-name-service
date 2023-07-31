import { useTranslation } from "next-i18next";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { useAppContext } from "@/app/hooks/useAppContext";
import { useAccount } from "@/app/hooks/useAccount";
import { formatAmount } from "@/app/formatAmount";
import { appActions } from "@/app/states/appState";
import { selectIsWalletConnected } from "@/app/states/walletState";
import { requestWalletConnection } from "@/app/requestWalletConnection";
import { AccountAvatar } from "@/app/components/AccountAvatar";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export const Options = () => {
  const { t } = useTranslation();
  const { setSettingsSidebar, setAccountSidebar, setMobileSidebar } =
    appActions;
  const { accountId, publicKey, balance } = useAccount();
  const { TokenTrtId, NativeTicker } = useAppContext();
  const dispatch = useAppDispatch();
  const isWalletConnected = useAppSelector(selectIsWalletConnected);

  const openSettingsSidebar = () => dispatch(setSettingsSidebar(true));
  const openAccountSidebar = () => dispatch(setAccountSidebar(true));
  const openMobileSidebar = () => dispatch(setMobileSidebar(true));

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      columnSpacing={3}
    >
      {!!(isWalletConnected && accountId) && (
        <Grid item>
          <IconButton
            edge="start"
            color="inherit"
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
            }}
            onClick={openAccountSidebar}
          >
            <AccountAvatar />

            <Typography
              fontWeight={500}
              variant="body2"
              sx={{ display: { xs: "none", md: "flex" }, ml: 1 }}
            >
              {formatAmount(balance.availableBalance.getSigna()) +
                " " +
                NativeTicker}
            </Typography>
          </IconButton>
        </Grid>
      )}

      {isWalletConnected && !publicKey && (
        <Tooltip title={`${t("inactiveAccountDescription")}`} arrow>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
              py: 1,
              px: 2,
              ml: 1,
            }}
          >
            <ReportProblemIcon color="warning" />

            <Typography fontWeight={500} variant="body2" color="warning.main">
              {t("inactiveAccount")}
            </Typography>
          </Stack>
        </Tooltip>
      )}

      {!isWalletConnected && (
        <Grid item sx={{ display: { xs: "none", md: "flex" } }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              color: "white",
            }}
            onClick={requestWalletConnection}
            startIcon={<AccountBalanceWalletIcon />}
          >
            {t("connectWallet")}
          </Button>
        </Grid>
      )}

      <Grid item>
        <Tooltip title={`${t("settings")}`} arrow>
          <IconButton
            edge="start"
            color="inherit"
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
            }}
            onClick={openSettingsSidebar}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Grid>

      <Grid item sx={{ display: { xs: "flex", lg: "none" } }}>
        <IconButton
          color="primary"
          edge="start"
          sx={{
            border: 1,
            borderColor: "primary",
            borderRadius: 2,
          }}
          onClick={openMobileSidebar}
        >
          <MenuIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

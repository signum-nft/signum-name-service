import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { useAppContext } from "@/app/hooks/useAppContext";
import { useAccount } from "@/app/hooks/useAccount";
import { formatAmount } from "@/app/formatAmount";
import { appActions } from "@/app/states/appState";
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
import { ConnectionStatus, useXTWallet } from "@/app/hooks/useXTWallet";
import { selectAmountSuffix } from "@/app/states/ledgerState";
import { FormattedNumber } from "@/app/components/FormattedNumber";

export const Options = () => {
  const { t } = useTranslation();
  const { setSettingsSidebar, setAccountSidebar, setMobileSidebar } =
    appActions;
  const { balance } = useAccount();
  const suffix = useAppSelector(selectAmountSuffix);
  const { connect, status, account } = useXTWallet();
  const dispatch = useAppDispatch();
  const isWalletConnected = status === ConnectionStatus.Connected;

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
      {!!(isWalletConnected && account) && (
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
              <FormattedNumber
                value={balance.availableBalance.getSigna()}
                decimals={2}
                suffix={suffix}
              />
            </Typography>
          </IconButton>
        </Grid>
      )}

      {!isWalletConnected && (
        <Grid item sx={{ display: { xs: "none", sm: "flex" } }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              color: "white",
            }}
            onClick={() => connect("Signum Name Service", "Signum-TESTNET")}
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

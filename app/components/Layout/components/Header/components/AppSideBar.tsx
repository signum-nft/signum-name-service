import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { useAccount } from "@/app/hooks/useAccount";
import { appActions } from "@/app/states/appState";
import { AccountAvatar } from "@/app/components/AccountAvatar";

import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import { useXTWallet } from "@/features/xtWallet/useXTWallet";
import { selectAmountSuffix } from "@/app/states/ledgerState";
import { FormattedNumber } from "@/app/components/FormattedNumber";

export const AppSideBar = () => {
  const { t } = useTranslation();
  const { setSidebarOpen } = appActions;
  const { balance } = useAccount();
  const suffix = useAppSelector(selectAmountSuffix);
  const { account, isWalletConnected } = useXTWallet();
  const dispatch = useAppDispatch();

  const openSettingsSidebar = () => dispatch(setSidebarOpen(true));
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      columnSpacing={3}
    >
      {isWalletConnected && account ? (
        <Grid item>
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
      ) : (
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
      )}
    </Grid>
  );
};

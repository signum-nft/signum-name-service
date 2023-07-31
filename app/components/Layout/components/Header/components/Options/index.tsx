import { useTranslation } from "next-i18next";
import { Amount } from "@signumjs/util";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { useAppContext } from "@/app/hooks/useAppContext";
import { useActiveMarketData } from "@/app/hooks/useActiveMarketData";
import { useAccount } from "@/app/hooks/useAccount";
import { useTokenMetaData } from "@/app/hooks/useTokenMetaData";
import { useTokenTransactionalData } from "@/app/hooks/useTokenTransactionalData";
import { formatAmount } from "@/app/formatAmount";
import { appActions } from "@/app/states/appState";
import { selectIsWalletConnected } from "@/app/states/walletState";
import { requestWalletConnection } from "@/app/requestWalletConnection";
import { TokenAvatar } from "@/app/components/TokenAvatar";
import { AccountAvatar } from "@/app/components/AccountAvatar";

import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
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
  const activeMarketData = useActiveMarketData();
  const tokenTrtMetadata = useTokenMetaData(TokenTrtId);
  const tokenTransactionalData = useTokenTransactionalData(TokenTrtId);
  const isWalletConnected = useAppSelector(selectIsWalletConnected);

  const openSettingsSidebar = () => dispatch(setSettingsSidebar(true));
  const openAccountSidebar = () => dispatch(setAccountSidebar(true));
  const openMobileSidebar = () => dispatch(setMobileSidebar(true));

  const canShowTrtPrice = !!(
    activeMarketData.price &&
    tokenTrtMetadata.id &&
    tokenTransactionalData.priceNQT
  );

  const price = canShowTrtPrice
    ? Number(Amount.fromPlanck(tokenTransactionalData.priceNQT).getSigna()) *
      activeMarketData.price
    : 0;

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      columnSpacing={3}
    >
      <Grid item sx={{ display: { xs: "none", lg: "flex" } }}>
        <Link href={"/tokens/" + TokenTrtId} passHref>
          <Tooltip
            title={`${t(canShowTrtPrice ? "tradeTRT" : "loadingPrice")}`}
            arrow
            placement="left"
          >
            <Box
              component="a"
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              <TokenAvatar
                tokenId={TokenTrtId}
                sx={{
                  width: 28,
                  height: 28,
                  mr: 1,
                  border: 1,
                  borderColor: "divider",
                }}
              />

              {canShowTrtPrice && (
                <Typography
                  fontWeight={500}
                  variant="body2"
                  color="textPrimary"
                >
                  {activeMarketData.symbol +
                    formatAmount(price, false, "", true)}
                </Typography>
              )}

              {!canShowTrtPrice && (
                <Skeleton
                  variant="rectangular"
                  width="48px"
                  height={20}
                  sx={{ borderRadius: 0.5 }}
                />
              )}
            </Box>
          </Tooltip>
        </Link>
      </Grid>

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

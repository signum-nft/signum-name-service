import { useTranslation } from "next-i18next";
import { useMemo, useState, MouseEvent } from "react";
import { Alias } from "@signumjs/core";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import {
  transactionActions,
  selectMonitoredTransactions,
} from "@/app/states/transactionState";
import { selectIsWalletConnected } from "@/app/states/walletState";
import { selectIsDarkMode } from "@/app/states/appState";
import { AliasStatus } from "@/app/types/aliasStatus";
import { ProcessingIndicatorChip } from "@/app/components/ProcessingIndicatorChip";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface Props extends Alias {
  status: AliasStatus;
}

export const BuyAliasButton = (aliasData: Props) => {
  const { t } = useTranslation();
  const { showError, showSuccess } = useSnackbar();
  const { ledgerService } = useLedgerService();
  const { aliasName, tldName, status, priceNQT } = aliasData;
  const dispatch = useAppDispatch();
  const monitoredTransactions = useAppSelector(selectMonitoredTransactions);
  const isWalletConnected = useAppSelector(selectIsWalletConnected);

  const isDarkMode = useAppSelector(selectIsDarkMode);

  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const buyAlias = async () => {
    if (!ledgerService) return;

    try {
      let confirmation: any = undefined;

      switch (status) {
        case "available":
          if (!tldName) return;

          confirmation = await ledgerService.alias.createAlias({
            content: "",
            name: aliasName,
            tldName: tldName,
          });
          break;

        case "onSale":
        case "onPrivateSale":
          if (!priceNQT) return;

          confirmation = await ledgerService.alias
            .with(aliasData)
            .buyAlias(priceNQT);
          break;

        default:
          break;
      }

      if (confirmation && confirmation.transactionId) {
        dispatch(
          transactionActions.addMonitor({
            transactionId: confirmation.transactionId,
            referenceId: aliasName + "." + tldName,
            type: "alias-buy",
          })
        );
      }

      showSuccess(t("aliasRequestSuccessfully"));
    } catch (e: any) {
      console.error(e);
      showError(t(e.message));
    } finally {
      closeMenu();
    }
  };

  const isBuying = useMemo(
    () =>
      monitoredTransactions.findIndex(({ referenceId, type }) => {
        if (type === "alias-buy") {
          return referenceId === aliasName + "." + tldName;
        }
        return false;
      }) !== -1,
    [monitoredTransactions, aliasName, tldName]
  );

  const canBeOpen = open && Boolean(anchorEl);

  const id = canBeOpen ? "transition-popper" : undefined;

  const background = isDarkMode ? "rgba(25, 28, 31, 1)" : "#ffffff";

  let buyButtonTooltipLabel = t("available");
  if (status === "onSale") buyButtonTooltipLabel = t("onSaleAliasStatus");
  if (status === "onPrivateSale") buyButtonTooltipLabel = t("privateSale");

  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <Box sx={{ position: "relative" }}>
        {isBuying && <ProcessingIndicatorChip label={t("waitAliasBuying")} />}

        {!isBuying && (
          <Tooltip title={buyButtonTooltipLabel} arrow placement="top">
            <Button
              color="primary"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleClick}
              sx={{
                position: "relative",
                bgcolor: open ? "primary.main" : "",
                color: open ? "white" : undefined,
              }}
            >
              {t("buy")}
            </Button>
          </Tooltip>
        )}

        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          transition
          placement="right-start"
          sx={{ zIndex: 1200 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  overflow: "hidden",
                  borderColor: "divider",
                  background,
                }}
              >
                {isWalletConnected ? (
                  <Stack direction="column">
                    <Typography variant="body2" gutterBottom>
                      {t("doYouWantToBuyThisAlias")}
                    </Typography>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      spacing={2}
                      mt={1}
                    >
                      <Button
                        size="small"
                        color="secondary"
                        onClick={closeMenu}
                      >
                        {t("no")}
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        sx={{ flex: 1, color: "white" }}
                        onClick={buyAlias}
                      >
                        {t("yes")}
                      </Button>
                    </Stack>
                  </Stack>
                ) : (
                  <Alert severity="info">{t("aliasNeedAccountNotice")}</Alert>
                )}
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

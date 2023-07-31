import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { selectIsOpenWalletModal, appActions } from "@/app/states/appState";
import { openExternalUrl } from "@/app/openExternalUrl";
import { isFirefox, isMobile } from "react-device-detect";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AppsIcon from "@mui/icons-material/Apps";
import LockIcon from "@mui/icons-material/Lock";

export const SetupWalletModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpenWalletModal);

  const handleClose = () => dispatch(appActions.setWalletModal(false));

  const openStore = () => {
    let url =
      "https://addons.mozilla.org/en-US/firefox/addon/signum-xt-wallet/";

    if (!isFirefox)
      url =
        "https://chrome.google.com/webstore/detail/signum-xt-wallet/kdgponmicjmjiejhifbjgembdcaclcib";

    openExternalUrl(url);
  };

  const resetWebsite = () => window.location.reload();

  if (isMobile) return <></>;

  return (
    <Dialog onClose={handleClose} open={isOpen} maxWidth="xs">
      <DialogTitle sx={{ textAlign: "center" }}>
        {t("tryTheXtWallet")}
      </DialogTitle>

      <DialogContent dividers>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          columnSpacing={2}
        >
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mb: 1, py: 1, color: "#ffffff" }}
              startIcon={<AccountBalanceWalletIcon />}
              onClick={openStore}
            >
              {t("install")}
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 1, py: 1, color: "#ffffff" }}
              onClick={resetWebsite}
            >
              {t("iInstalledWallet")}
            </Button>
          </Grid>
        </Grid>

        <DialogContentText sx={{ textAlign: "center" }}>
          {t("tryTheXtWalletDescription")}
        </DialogContentText>
      </DialogContent>

      <DialogContent>
        <Alert
          severity="info"
          icon={<AppsIcon fontSize="inherit" />}
          sx={{ mb: 1, width: "100%" }}
        >
          {t("xtWalletFirstBenefit")}
        </Alert>

        <Alert
          severity="success"
          icon={<LockIcon fontSize="inherit" />}
          sx={{ width: "100%" }}
        >
          {t("xtWalletSecondBenefit")}
        </Alert>
      </DialogContent>
    </Dialog>
  );
};

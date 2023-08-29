import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import {
  selectIsOpenWalletModal,
  appActions,
  selectIsDarkMode,
} from "@/app/states/appState";
import { openExternalUrl } from "@/app/openExternalUrl";
import { isFirefox, isMobile } from "react-device-detect";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AppsIcon from "@mui/icons-material/Apps";
import LockIcon from "@mui/icons-material/Lock";
import Link from "next/link";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";

const WalletUrl = isFirefox
  ? "https://addons.mozilla.org/en-US/firefox/addon/signum-xt-wallet/"
  : "https://chrome.google.com/webstore/detail/signum-xt-wallet/kdgponmicjmjiejhifbjgembdcaclcib";

export const SetupWalletModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpenWalletModal);
  const isDarkMode = useAppSelector(selectIsDarkMode);

  const handleClose = () => dispatch(appActions.setWalletModal(false));

  const resetWebsite = () => window.location.reload();

  if (isMobile) return <></>;

  return (
    <Dialog onClose={handleClose} open={isOpen} maxWidth="xs">
      <DialogTitle sx={{ textAlign: "center" }}>
        {t("tryTheXtWallet")}
      </DialogTitle>

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

      <DialogContent dividers>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          columnSpacing={2}
        >
          <DialogContentText p={1} sx={{ textAlign: "justify" }}>
            {t("tryTheXtWalletDescription")}
          </DialogContentText>

          <DialogContentText
            p={1}
            fontSize="small"
            sx={{ textAlign: "justify" }}
          >
            {t("tryTheXtWalletHint")}
          </DialogContentText>

          <Grid container flexDirection="row" sx={{ textAlign: "center" }}>
            <Grid item xs={6}>
              <Button
                variant="text"
                sx={{ color: isDarkMode ? "#ffffff" : undefined }}
                onClick={resetWebsite}
              >
                {t("iInstalledWallet")}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Link href={WalletUrl} rel="noopener noreferrer" target="_blank">
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  startIcon={<InstallDesktopIcon />}
                >
                  {t("install")}
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

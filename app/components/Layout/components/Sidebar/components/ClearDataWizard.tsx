import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/states/hooks";

import { accountActions } from "@/app/states/accountState";
import { appActions } from "@/app/states/appState";
import { marketActions } from "@/app/states/marketState";
import { portfolioActions } from "@/app/states/portfolioState";
import { transactionActions } from "@/app/states/transactionState";
import { walletActions } from "@/app/states/walletState";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Props {
  handleClose: () => void;
}

export const ClearDataWizard = ({ handleClose }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const closeWizard = () => {
    closeDialog();
    handleClose();
  };

  const wipeData = () => {
    router.replace("/");

    dispatch(accountActions.reset());
    dispatch(appActions.reset());
    dispatch(marketActions.reset());
    dispatch(portfolioActions.reset());
    dispatch(transactionActions.reset());
    dispatch(walletActions.reset());

    closeWizard();
  };

  return (
    <>
      <Dialog open={open} onClose={closeWizard}>
        <DialogTitle>{t("clearLocalDataWizardTitle")}</DialogTitle>

        <DialogContent>
          <DialogContentText whiteSpace="pre-line">
            {t("clearLocalDataWizardDescription")}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button color="secondary" onClick={closeWizard}>
            {t("cancel")}
          </Button>

          <Button
            onClick={wipeData}
            variant="contained"
            color="error"
            sx={{ color: "white" }}
            startIcon={<DeleteForeverIcon />}
            autoFocus
          >
            {t("clearData")}
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        fullWidth
        color="error"
        variant="outlined"
        startIcon={<DeleteForeverIcon />}
        onClick={openDialog}
      >
        {t("clearLocalData")}
      </Button>
    </>
  );
};

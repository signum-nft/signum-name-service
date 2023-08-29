import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/states/hooks";

import { accountActions } from "@/app/states/accountState";
import { appActions } from "@/app/states/appState";
import { transactionActions } from "@/app/states/transactionState";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useXTWallet } from "@/features/xtWallet";

interface Props {
  handleClose: () => void;
}

export const ClearDataWizard = ({ handleClose }: Props) => {
  const { t } = useTranslation();
  const { disconnect } = useXTWallet();
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

    disconnect();
    dispatch(accountActions.reset());
    dispatch(appActions.reset());
    dispatch(transactionActions.reset());
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

import { useTranslation } from "next-i18next";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export const PreviousOwnerRenewalFeeFeedback = ({
  isOpen,
  handleClose,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen}>
      <DialogTitle>{t("previousOwnerIsPayingFees")}</DialogTitle>

      <DialogContent>
        <DialogContentText whiteSpace="pre-line" mb={2}>
          {t("PreviousOwnerRenewalFeeFeedbackParagraph")}
        </DialogContentText>

        <DialogContentText whiteSpace="pre-line">
          {t("PreviousOwnerRenewalFeeFeedbackSecondParagraph")}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          color="info"
          sx={{ color: "white" }}
          startIcon={<CheckCircleIcon />}
          autoFocus
        >
          {t("agreetokenImportDisclaimer")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

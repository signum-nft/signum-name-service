import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { selectAliasOperation } from "@/app/states/portfolioState";
import {
  transactionActions,
  selectMonitoredTransactions,
} from "@/app/states/transactionState";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import DeleteIcon from "@mui/icons-material/DeleteForever";

interface Props {
  onComplete: () => void;
}

export const Add = ({ onComplete }: Props) => {
  const { t } = useTranslation();
  const { ledgerService } = useLedgerService();
  const { showError } = useSnackbar();
  const dispatch = useAppDispatch();
  const monitoredTransactions = useAppSelector(selectMonitoredTransactions);

  const { id } = useAppSelector(selectAliasOperation);

  const isCancelingSubscription = useMemo(
    () =>
      Boolean(
        monitoredTransactions.find(
          ({ referenceId, type }) =>
            referenceId === id && type === "subscription-cancelation"
        )
      ),
    [monitoredTransactions, id]
  );

  const cancelFees = async () => {
    if (!ledgerService || !id) return;

    try {
      const confirmation = await ledgerService.subscription
        .with(id)
        .cancelSubscription();

      // @ts-ignore
      const transactionId = confirmation?.transactionId || undefined;

      if (transactionId) {
        dispatch(
          transactionActions.addMonitor({
            transactionId,
            referenceId: id,
            type: "subscription-cancelation",
          })
        );
        onComplete();
      }
    } catch (e: any) {
      showError(t(e.message));
    }
  };

  return (
    <Box>
      <DialogContent>
        <Typography fontWeight={700}>
          {t("doYouWantToCancelRenewalFees")}
        </Typography>

        <Typography gutterBottom>
          {t("doYouWantToCancelRenewalFeesDescription")}
        </Typography>

        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ color: "white" }}
          startIcon={<DeleteIcon />}
          onClick={cancelFees}
          fullWidth
          disabled={isCancelingSubscription}
        >
          {t("deleteSubdomain")}
        </Button>
      </DialogContent>
    </Box>
  );
};

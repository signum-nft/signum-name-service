import { useTranslation } from "next-i18next";
import { useMemo, useState } from "react";
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
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { WizardSubmitter } from "@/app/components/Modals/SubdomainOperationModal/components/WizardSubmitter";

interface Props {
  onComplete: (ok?: boolean) => void;
  onCancel: () => void;
  subdomainOperation: SubdomainOperation;
}

export const DeleteForm = ({
  onComplete,
  subdomainOperation,
  onCancel,
}: Props) => {
  const { t } = useTranslation();
  const { ledgerService } = useLedgerService();
  const [confirming, setConfirming] = useState(false);
  const { showError } = useSnackbar();
  const dispatch = useAppDispatch();
  const releaseAlias = async () => {
    if (!ledgerService) return;
    try {
      setConfirming(true);
      const alias = await ledgerService.alias.fetchAliasById(
        subdomainOperation.alias.aliasId
      );
      const confirmation = await ledgerService.alias
        .with(alias)
        .cancelSubscription();
      dispatch(
        transactionActions.addMonitor({
          transactionId: confirmation.transactionId,
          referenceId: alias.alias,
          type: "alias-delete",
        })
      );
      onComplete(true);
    } catch (e: any) {
      onComplete(false);
      showError(t(e.message));
    } finally {
      setConfirming(false);
    }
  };

  return (
    <Box>
      <Typography fontWeight={700}>{t("doYouWantToDeleteDomain")}</Typography>

      <Typography gutterBottom>
        {t("doYouWantToDeleteDomainDescription")}
      </Typography>
      <WizardSubmitter allowSubmit={!confirming} onCancel={onCancel} />
    </Box>
  );
};

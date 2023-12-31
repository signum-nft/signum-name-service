import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useAppDispatch } from "@/states/hooks";
import { transactionActions } from "@/app/states/transactionState";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { WizardSubmitter } from "@/app/components/Modals/SubdomainOperationModal/components/WizardSubmitter";
import { asDomainString } from "@/app/asDomainString";

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
  const releaseAlias = async (event: any) => {
    event.preventDefault();

    if (!ledgerService) return;
    try {
      setConfirming(true);
      const alias = await ledgerService.alias.fetchAliasById(
        subdomainOperation.alias.aliasId
      );
      const confirmation = await ledgerService.alias
        .with(alias)
        .cancelSubscription();
      const fullDomainName = asDomainString({
        tld: subdomainOperation.alias.aliasTld,
        name: subdomainOperation.domainName,
      });
      dispatch(
        transactionActions.addMonitor({
          transactionId: confirmation.transactionId,
          referenceId: alias.alias,
          type: `alias-delete-${fullDomainName}`,
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

  const aliasName = asDomainString({
    tld: subdomainOperation.alias.aliasTld,
    name: subdomainOperation.alias.aliasName,
  });
  return (
    <Box>
      <form onSubmit={releaseAlias}>
        <Typography fontWeight={700}>{t("doYouWantToDeleteDomain")}</Typography>
        <Typography gutterBottom>
          {t("doYouWantToDeleteDomainDescription", { aliasName })}
        </Typography>
        <WizardSubmitter allowSubmit={!confirming} onCancel={onCancel} />
      </form>
    </Box>
  );
};

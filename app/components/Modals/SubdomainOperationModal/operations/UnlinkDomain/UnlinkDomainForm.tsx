import { useTranslation } from "next-i18next";

import Grid from "@mui/material/Grid";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { Config } from "@/app/config";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { DescriptorData, DescriptorDataBuilder } from "@signumjs/standards";
import { transactionActions } from "@/app/states/transactionState";
import { useAppDispatch } from "@/states/hooks";
import Typography from "@mui/material/Typography";
import React from "react";
import { WizardSubmitter } from "../../components/WizardSubmitter";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface Props {
  subdomainOperation: SubdomainOperation;
  onComplete: (ok: boolean) => void;
  onCancel: () => void;
}

export const UnlinkDomainForm = ({
  onComplete,
  onCancel,
  subdomainOperation: { alias, domainName },
}: Props) => {
  const { t } = useTranslation();
  const { ledgerService } = useLedgerService();
  const { showError } = useSnackbar();
  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ledgerService) return;
    try {
      const ledgerAlias = await ledgerService.alias.fetchAliasById(
        alias.aliasId
      );
      let builder: DescriptorDataBuilder;
      try {
        const oldData = DescriptorData.parse(ledgerAlias.aliasURI, false);
        builder = DescriptorDataBuilder.createWith(oldData);
        // @ts-ignore
        builder.setAlias(undefined);
      } catch (e) {
        // previous data is non-SRC44, so we create a complete new one.
        builder = DescriptorDataBuilder.create();
      }

      const confirmation = await ledgerService.alias
        .with(ledgerAlias)
        .updateAlias(builder.build().stringify());

      dispatch(
        transactionActions.addMonitor({
          transactionId: confirmation.transactionId,
          referenceId: ledgerAlias.alias,
          type: "alias-content-update",
        })
      );
      dispatch(
        transactionActions.addMonitor({
          transactionId: confirmation.transactionId,
          referenceId: ledgerAlias.alias,
          type: `alias-delete-${domainName}:${
            alias.aliasTld ?? Config.Signum.DefaultTld
          }`,
        })
      );

      onComplete(true);
    } catch (e: any) {
      showError(t(e.message || e));
      onComplete(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container gap={1}>
        <Grid item xs={12} justifyItems="center">
          <Alert severity="success" sx={{ mb: 2 }}>
            <AlertTitle>{t("summary")}</AlertTitle>

            <Typography variant="body2" whiteSpace="pre-line" gutterBottom>
              {t("unlinkDomainDescription", { domain: domainName })}
            </Typography>
          </Alert>
        </Grid>
        <Grid item mt={2} width="100%">
          <WizardSubmitter
            allowSubmit={true}
            onCancel={onCancel}
            label={t("unlinkDomain")}
          />
        </Grid>
      </Grid>
    </form>
  );
};

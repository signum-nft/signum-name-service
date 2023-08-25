import { useTranslation } from "next-i18next";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import AddLinkIcon from "@mui/icons-material/AddLink";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import RelinkIcon from "@mui/icons-material/DatasetLinked";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { Config } from "@/app/config";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { DescriptorData, DescriptorDataBuilder } from "@signumjs/standards";
import { transactionActions } from "@/app/states/transactionState";
import { useAppDispatch } from "@/states/hooks";
import { AliasLinkCard } from "./AliasLinkCard";
import Typography from "@mui/material/Typography";
import React from "react";

interface Props {
  subdomainOperation: SubdomainOperation;
  onComplete: (ok: boolean) => void;
  onCancel?: () => void;
}

export const DelinkageForm = ({
  onComplete,
  onCancel,
  subdomainOperation: { previousAlias, alias, nextAlias, domainName },
}: Props) => {
  const { t } = useTranslation();
  const { ledgerService } = useLedgerService();
  const { showError } = useSnackbar();
  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    if (!ledgerService) return;
    if (!previousAlias) return;

    try {
      const ledgerAlias = await ledgerService.alias.fetchAliasById(
        previousAlias.aliasId
      );
      let builder: DescriptorDataBuilder;
      try {
        const oldData = DescriptorData.parse(ledgerAlias.aliasURI, false);
        builder = DescriptorDataBuilder.createWith(oldData);
      } catch (e) {
        // previous data is non-SRC44, so we create a complete new one.
        builder = DescriptorDataBuilder.create(previousAlias.subdomain);
      }
      if (nextAlias) {
        builder.setAlias(
          nextAlias.aliasName,
          nextAlias.aliasTld === Config.Signum.DefaultTld
            ? undefined
            : nextAlias.aliasTld
        );
      } else {
        builder.setAlias("");
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
    <Grid container gap={1}>
      <Grid item xs={12} justifyItems="center">
        <Typography variant="caption">{t("delinkAliasNow")}</Typography>
        <Stack
          direction="row"
          gap={1}
          justifyContent="center"
          alignItems="center"
        >
          {previousAlias && (
            <>
              <AliasLinkCard alias={previousAlias} title={t("previousAlias")} />
              <LinkOffIcon fontSize="large" />
            </>
          )}
          <AliasLinkCard
            alias={alias}
            title={t("currentAlias")}
            newName={alias.subdomain}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption">{t("delinkAliasThen")}</Typography>
        <Stack
          direction="row"
          gap={1}
          justifyContent="center"
          alignItems="center"
        >
          {previousAlias && (
            <>
              <AliasLinkCard alias={previousAlias} title={t("previousAlias")} />
              <AddLinkIcon fontSize="large" />
            </>
          )}
          {nextAlias ? (
            <AliasLinkCard alias={nextAlias} title={t("nextAlias")} />
          ) : (
            <AliasLinkCard
              alias={{
                subdomain: t("tailAlias"),
                aliasName: t("noDomain"),
                aliasId: "0",
              }}
              title={t("nextAlias")}
            />
          )}
        </Stack>
      </Grid>
      <Grid item mt={2}>
        <Stack direction="column" width="100%" spacing={2}>
          <Alert
            sx={{
              width: "100%",
              whiteSpace: "pre-line",
            }}
            severity="info"
          >
            {t("relinkageSummary")}
          </Alert>

          <Stack direction="row" width="100%" spacing={2}>
            {onCancel && (
              <Button color="error" onClick={onCancel} fullWidth>
                {t("cancel")}
              </Button>
            )}

            <Button
              variant="contained"
              color="secondary"
              sx={{ color: "white" }}
              onClick={onSubmit}
              startIcon={<RelinkIcon />}
              fullWidth
            >
              {t("relinkAlias")}
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

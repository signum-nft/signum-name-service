import { useTranslation } from "next-i18next";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { AliasProxy } from "@/app/types/aliasProxy";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { Config } from "@/app/config";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { DescriptorData, DescriptorDataBuilder } from "@signumjs/standards";
import { transactionActions } from "@/app/states/transactionState";
import { useAppDispatch } from "@/states/hooks";
import { AliasLinkCard } from "@/app/components/Modals/SubdomainOperationModal/components/AliasLinkCard";

interface Props {
  subdomainOperation: SubdomainOperation;
  newName: string;
  onComplete: (ok: boolean) => void;
}

export const LinkageForm = ({
  onComplete,
  subdomainOperation: { previousAlias, alias, nextAlias },
  newName,
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
      builder.setAlias(
        alias.aliasName,
        alias.aliasTld === Config.Signum.DefaultTld ? undefined : alias.aliasTld
      );
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

      onComplete(true);
    } catch (e: any) {
      showError(t(e.message || e));
      onComplete(false);
    }
  };

  return (
    <Grid container gap={4} justifyContent="center">
      <Grid item>
        <Stack
          direction={{ sm: "column", md: "row" }}
          gap={1}
          alignContent="center"
          alignItems="center"
        >
          {previousAlias && (
            <>
              <AliasLinkCard alias={previousAlias} title={t("previousAlias")} />
              <AddLinkIcon fontSize="large" />
            </>
          )}
          <AliasLinkCard
            alias={alias}
            title={t("currentAlias")}
            newName={newName}
          />
          {nextAlias && (
            <>
              <AddLinkIcon fontSize="large" />
              <AliasLinkCard alias={nextAlias} title={t("nextAlias")} />
            </>
          )}
        </Stack>
      </Grid>
      <Grid item>
        <Stack direction="column" width="100%" spacing={2}>
          <Alert
            sx={{
              width: "100%",
              whiteSpace: "pre-line",
            }}
            severity="info"
          >
            {t("linkageSummary")}
          </Alert>
          <Button
            variant="contained"
            color="secondary"
            sx={{ color: "white" }}
            onClick={onSubmit}
            fullWidth
          >
            {t("linkAlias")}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

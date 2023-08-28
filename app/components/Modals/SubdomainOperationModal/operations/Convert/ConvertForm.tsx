import { useTranslation } from "next-i18next";
import React, { useMemo, useState } from "react";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useAppDispatch } from "@/states/hooks";
import { transactionActions } from "@/app/states/transactionState";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { WizardSubmitter } from "../../components/WizardSubmitter";
import { asDomainString } from "@/app/asDomainString";
import { Config } from "@/app/config";
import { useAccountDomains } from "@/app/hooks/useAccountDomains";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Alias } from "@signumjs/core";
import { DescriptorData, DescriptorDataBuilder } from "@signumjs/standards";
import { AccountDomain } from "@/app/types/accountData";
import LinkedList from "fast-linked-list";

interface Props {
  onComplete: (ok?: boolean) => void;
  onCancel: () => void;
  subdomainOperation: SubdomainOperation;
}

function findDomainInDomainLists(
  domain: string,
  tld: string,
  domainLists: LinkedList<AccountDomain>[]
) {
  for (let domains of domainLists) {
    const head = domains.first;
    if (head.name === domain && head.tld === tld) {
      return domains;
    }
  }
  return null;
}

export const ConvertForm = ({
  onComplete,
  subdomainOperation,
  onCancel,
}: Props) => {
  const { t } = useTranslation();
  const { domainLists } = useAccountDomains();
  const [selectedDomain, setSelectedDomain] = useState("");

  const { showError } = useSnackbar();
  const dispatch = useAppDispatch();
  const { ledgerService } = useLedgerService();

  const availableDomains = useMemo(() => {
    const availableDomains: { label: string; id: string }[] = [];
    for (let domains of domainLists) {
      const head = domains.first;
      if (
        head.id !== subdomainOperation.alias.aliasId &&
        head.tld === subdomainOperation.alias.aliasTld
      ) {
        availableDomains.push({
          label: head.name,
          id: head.id,
        });
      }
    }
    return availableDomains;
  }, [domainLists, subdomainOperation.alias]);

  const handleChange = (event: any) => {
    console.log(event);
    setSelectedDomain(event.target.value);
  };

  async function updateAlias(alias: Alias, operation: SubdomainOperation) {
    if (!ledgerService) return;

    let builder: DescriptorDataBuilder;
    try {
      const oldData = DescriptorData.parse(alias.aliasURI, false);
      builder = DescriptorDataBuilder.createWith(oldData);
    } catch (e) {
      // previous data is non-SRC44, so we create a complete new one, without name
      builder = DescriptorDataBuilder.create();
    }

    const intendedSubdomain = operation.alias;
    builder.setAlias(
      intendedSubdomain.aliasName,
      intendedSubdomain.aliasTld === Config.Signum.DefaultTld
        ? undefined
        : intendedSubdomain.aliasTld
    );

    const confirmation = await ledgerService.alias
      .with(alias)
      .updateAlias(builder.build().stringify());
    dispatch(
      transactionActions.addMonitor({
        transactionId: confirmation.transactionId,
        referenceId: alias.alias,
        type: "alias-content-update",
      })
    );
    const fullDomainName = asDomainString({
      tld: operation.alias.aliasTld,
      name: operation.domainName,
    });
    dispatch(
      transactionActions.addMonitor({
        transactionId: confirmation.transactionId,
        referenceId: alias.alias,
        type: `alias-new-${fullDomainName}`,
      })
    );
  }

  const convert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ledgerService) return;

    const foundParentDomain = findDomainInDomainLists(
      selectedDomain,
      subdomainOperation.alias.aliasTld || Config.Signum.DefaultTld,
      domainLists
    );
    if (!foundParentDomain) {
      console.warn(
        `Couldn't find ${asDomainString({
          tld: subdomainOperation.alias.aliasTld,
          name: selectedDomain,
        })}`
      );
      return;
    }

    try {
      const aliasToBeAppended = await ledgerService.alias.fetchAliasById(
        foundParentDomain.last.id
      );
      await updateAlias(aliasToBeAppended, subdomainOperation);
      onComplete(true);
    } catch (e: any) {
      showError(e.message);
      onComplete(false);
    }
  };

  const allowSubmit = selectedDomain.length > 0;
  const canConvert = availableDomains.length > 0;

  return (
    <Box>
      <form onSubmit={convert}>
        <Typography gutterBottom>
          {t("convertToSubdomainDescription")}
        </Typography>
        {canConvert && (
          <Box my={2} py={1} sx={{ overflowY: "scroll", width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{}</InputLabel>
              <Autocomplete
                id="combo-box-demo"
                options={availableDomains}
                onSelect={handleChange}
                renderInput={(params) => {
                  return (
                    // @ts-ignore
                    <TextField {...params} label={t("availableDomains")} />
                  );
                }}
              />
            </FormControl>
          </Box>
        )}
        <Collapse in={allowSubmit}>
          <Alert severity="success" sx={{ mb: 2 }}>
            <AlertTitle>{t("summary")}</AlertTitle>

            <Typography variant="body2" whiteSpace="pre-line" gutterBottom>
              {t("convertToSubdomainSummary")}
            </Typography>
          </Alert>
        </Collapse>
        <Collapse in={!canConvert}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <AlertTitle>{t("noDomainAvailable")}</AlertTitle>

            <Typography variant="body2" whiteSpace="pre-line" gutterBottom>
              {t("cannotConvertToSubdomainSummary")}
            </Typography>
          </Alert>
        </Collapse>
        <WizardSubmitter
          allowSubmit={allowSubmit}
          onCancel={onCancel}
          label={t("convertToSubdomain")}
        />
      </form>
    </Box>
  );
};

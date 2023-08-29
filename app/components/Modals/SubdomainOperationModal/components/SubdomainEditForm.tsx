import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { DescriptorData, DescriptorDataBuilder } from "@signumjs/standards";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useAppDispatch } from "@/states/hooks";
import { useAlias } from "@/app/hooks/useAlias";

import Stack from "@mui/material/Stack";
import { TextLabel } from "@/app/components/TextLabel";
import TextField from "@mui/material/TextField";
import { AccountAddressField } from "@/app/components/AccountAddressField";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import { WizardSubmitter } from "./WizardSubmitter";
import { mapValidationError } from "@/app/mapValidationError";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { Address, Alias } from "@signumjs/core";
import { transactionActions } from "@/app/states/transactionState";
import { Config } from "@/app/config";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { asDomainString } from "@/app/asDomainString";

interface Props {
  onComplete: (ok: boolean) => void;
  onCancel: () => void;
  onNameChange: (newName: string) => void;
  subdomainOperation: SubdomainOperation;
}

interface FormData {
  name: string;
  url: string;
  account: string;
}

function isValidUrl(value: string): boolean | string {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch (e: any) {
    return "invalidURL";
  }
}

export const SubdomainEditForm = ({
  onComplete,
  onCancel,
  subdomainOperation,
  onNameChange,
}: Props) => {
  const { t } = useTranslation();
  const { ledgerService } = useLedgerService();
  const { showError } = useSnackbar();
  const dispatch = useAppDispatch();
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isSRC44, setIsSRC44] = useState(true);
  const formInstance = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      account: "",
      url: "",
    },
  });
  const { alias } = useAlias(subdomainOperation.alias.aliasId, false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = formInstance;

  const subdomainName = watch("name");

  useEffect(() => {
    onNameChange(subdomainName);
  }, [onNameChange, subdomainName]);

  useEffect(() => {
    if (!alias) return;
    if (!alias.aliasURI) return;

    try {
      const src44 = DescriptorData.parse(alias.aliasURI, false);
      setValue("url", src44.homePage || "");
      setValue("account", src44.account || "");
      setValue("name", src44.name || "");
      setIsSRC44(true);
    } catch (e: any) {
      setIsSRC44(false);
    }
  }, [alias, setValue]);

  async function updateAlias(alias: Alias, data: FormData) {
    if (!ledgerService) return;

    let builder: DescriptorDataBuilder;
    try {
      const oldData = DescriptorData.parse(alias.aliasURI, false);
      builder = DescriptorDataBuilder.createWith(oldData).setName(data.name);
    } catch (e) {
      // previous data is non-SRC44, so we create a complete new one.
      builder = DescriptorDataBuilder.create(data.name);
    }

    try {
      const accountId = Address.create(data.account).getNumericId();
      builder.setAccount(accountId);
    } catch (e) {
      // invalid account - ignore
    }

    const nextAlias = subdomainOperation.nextAlias;
    if (nextAlias) {
      builder.setAlias(
        nextAlias.aliasName,
        nextAlias.aliasTld === Config.Signum.DefaultTld
          ? undefined
          : nextAlias.aliasTld
      );
    }

    if (data.url) {
      builder.setHomePage(data.url);
    }

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
  }

  async function createNewAlias(
    aliasName: string,
    aliasTld: string,
    data: FormData
  ) {
    if (!ledgerService) return;

    const builder = DescriptorDataBuilder.create(data.name);

    try {
      const accountId = Address.create(data.account).getNumericId();
      builder.setAccount(accountId);
    } catch (e) {
      // invalid account - ignore
    }

    if (data.url) {
      builder.setHomePage(data.url);
    }

    const nextAlias = subdomainOperation.nextAlias;
    if (nextAlias) {
      builder.setAlias(
        nextAlias.aliasName,
        nextAlias.aliasTld === Config.Signum.DefaultTld
          ? undefined
          : nextAlias.aliasTld
      );
    }

    const confirmation = await ledgerService.alias.createAlias({
      name: aliasName,
      tldName: aliasTld,
      content: builder.build().stringify(),
    });
    const fullDomainName = asDomainString({
      tld: subdomainOperation.alias.aliasTld,
      name: subdomainOperation.domainName,
    });
    dispatch(
      transactionActions.addMonitor({
        transactionId: confirmation.transactionId,
        referenceId: confirmation.transactionId,
        type: `alias-new-${fullDomainName}`,
      })
    );
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!ledgerService) return;

    try {
      if (alias) {
        await updateAlias(alias, data);
      } else {
        await createNewAlias(
          subdomainOperation.alias.aliasName,
          subdomainOperation.alias.aliasTld ?? Config.Signum.DefaultTld,
          data
        );
      }
      onComplete(true);
    } catch (e: any) {
      showError(t(e.message || e));
      onComplete(false);
    }
  };

  const handleOnCancel = () => {
    reset();
    onCancel();
  };

  let urlFieldError = "";
  const urlFieldHelperText = t("urlFieldHelper");
  if (errors.url?.message) {
    urlFieldError = t(
      mapValidationError(errors.url.message),
      mapValidationError(errors.url.message, true)
    );
  }

  let nameFieldError = "";
  const nameFieldHelperText = t("subdomainNameFieldHelper");
  if (errors.name?.message) {
    nameFieldError = t(
      mapValidationError(errors.name.message),
      mapValidationError(errors.name.message, true)
    );
  }

  const allowSubmit =
    subdomainName.length > 0 && !errors.name && !errors.url && isAddressValid;

  return (
    <FormProvider {...formInstance}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <Stack gap={0.5}>
            <TextLabel text={t("enterSubdomainName")} required />
            <Controller
              name="name"
              control={control}
              rules={{
                required: {
                  message: "required",
                  value: true,
                },
                maxLength: 24,
                pattern: {
                  message: "invalidName",
                  value: /^\S{1,24}$/g,
                },
                validate: (name) =>
                  subdomainOperation.action === "add" &&
                  subdomainOperation.subdomainNameMap[name]
                    ? "duplicateName"
                    : true,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="name"
                  autoComplete="off"
                  fullWidth
                  label={t("name")}
                  placeholder={t("enterSubdomainName")}
                  helperText={nameFieldError || nameFieldHelperText}
                  error={!!nameFieldError}
                  variant="outlined"
                  color="secondary"
                  inputProps={{ maxLength: 24 }}
                  InputLabelProps={{ shrink: !!field.value }}
                  focused={
                    subdomainOperation.action === "add" && !subdomainName
                  }
                />
              )}
            />
          </Stack>

          <Stack gap={0.5}>
            <TextLabel text={t("enterTheUrlOrLink")} />
            <Controller
              name="url"
              control={control}
              rules={{
                validate: isValidUrl,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(sanitizeUrl(e.target.value))}
                  type="url"
                  autoComplete="off"
                  fullWidth
                  label={t("url")}
                  placeholder={t("enterTheUrlOrLink")}
                  helperText={urlFieldError || urlFieldHelperText}
                  error={!!urlFieldError}
                  variant="outlined"
                  color="secondary"
                  inputProps={{ maxLength: 128 }}
                  InputLabelProps={{ shrink: !!field.value }}
                />
              )}
            />
          </Stack>
          <Stack gap={0.5}>
            <TextLabel text={t("enterTheReceiverAddress")} gutterBottom />
            <AccountAddressField
              name="account"
              isAddressValid={isAddressValid}
              setIsAccountValid={setIsAddressValid}
              allowSelfAddress
            />
          </Stack>

          <Stack gap={0}>
            <Collapse in={!isSRC44}>
              <Alert severity="warning" sx={{ mb: 2 }}>
                <AlertTitle>{t("subdomainNonSrc44WarningTitle")}</AlertTitle>

                <Typography variant="body2" whiteSpace="pre-line" gutterBottom>
                  {t("subdomainNonSrc44Warning")}
                </Typography>
              </Alert>
            </Collapse>

            <Collapse in={!allowSubmit}>
              <Alert severity="error" sx={{ mb: 2 }}>
                <AlertTitle>{t("subdomainInvalidTitle")}</AlertTitle>

                <Typography variant="body2" whiteSpace="pre-line" gutterBottom>
                  {t("subdomainInvalidDescription")}
                </Typography>
              </Alert>
            </Collapse>

            <Collapse in={allowSubmit}>
              <Alert severity="success" sx={{ mb: 2 }}>
                <AlertTitle>{t("summary")}</AlertTitle>

                <Typography variant="body2" whiteSpace="pre-line" gutterBottom>
                  {t("whatYouCanDoWithSubdomainSummary")} 😊
                </Typography>
              </Alert>
            </Collapse>
          </Stack>

          <WizardSubmitter
            allowSubmit={allowSubmit}
            onCancel={handleOnCancel}
          />
        </Stack>
      </form>
    </FormProvider>
  );
};

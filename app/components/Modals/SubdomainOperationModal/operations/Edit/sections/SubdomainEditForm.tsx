import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { TextLabel } from "@/app/components/TextLabel";
import { AccountAddressField } from "@/app/components/AccountAddressField";
import { mapValidationError } from "@/app/mapValidationError";
import { EditAlias } from "../../../validation/types";
import { WizardSubmitter } from "../WizardSubmitter";

import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DescriptorData } from "@signumjs/standards";

interface Props {
  onCancel: () => void;
  aliasPayload: DescriptorData;
}

interface FormData {
  url: string;
  account: string;
}

export const SubdomainEditForm = ({ onCancel, aliasPayload }: Props) => {
  const { t } = useTranslation();

  const [isAddressValid, setIsAddressValid] = useState(false);

  const {
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      url: "",
      account: "",
    },
  });
  const account = watch("account");
  const url = watch("url");

  let urlFieldError = "";
  const urlFieldHelperText = t("urlFieldHelper");
  if (errors.url?.message) {
    urlFieldError = t(
      mapValidationError(errors.url.message),
      mapValidationError(errors.url.message, true)
    );
  }

  // const allowSubmit = !!(url && !urlFieldError);
  // useEffect(() => setValue("canInsertReceiverAddress", true), []);
  //
  let receiverAddressFieldError = "";

  // Normal validation
  if (errors.account?.message) {
    receiverAddressFieldError = t(mapValidationError(errors.account?.message));
  }

  const allowSubmit = !!(
    account &&
    isAddressValid &&
    !receiverAddressFieldError
  );

  return (
    <Stack>
      <TextLabel text={t("enterTheUrlOrLink")} required />

      <Controller
        name="url"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="url"
            autoComplete="off"
            fullWidth
            label={t("enterTheUrlOrLink")}
            helperText={urlFieldError || urlFieldHelperText}
            error={!!urlFieldError}
            variant="outlined"
            color="secondary"
            InputLabelProps={{ shrink: !!field.value }}
          />
        )}
      />
      <TextLabel text={t("enterTheReceiverAddress")} required gutterBottom />
      <AccountAddressField
        isAddressValid={isAddressValid}
        setIsAccountValid={setIsAddressValid}
        allowSelfAddress
      />

      <Collapse in={allowSubmit}>
        <Alert severity="success" sx={{ mb: 2 }}>
          <AlertTitle>{t("summary")}</AlertTitle>

          <Typography variant="body2" whiteSpace="pre-line" gutterBottom>
            {t("accountShortcutSummary")} 😊
          </Typography>
        </Alert>
      </Collapse>

      <WizardSubmitter allowSubmit={allowSubmit} onCancel={onCancel} />
    </Stack>
  );
};

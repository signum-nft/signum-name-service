import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
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

interface Props {
  onCancel: () => void;
}

export const AccountForm = ({ onCancel }: Props) => {
  const { t } = useTranslation();

  const [isAddressValid, setIsAddressValid] = useState(false);

  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<EditAlias>();

  const receiverAddress = watch("receiverAddress");

  useEffect(() => setValue("canInsertReceiverAddress", true), []);

  let receiverAddressFieldError = "";

  // Normal validation
  if (errors.receiverAddress?.message) {
    receiverAddressFieldError = t(
      mapValidationError(errors.receiverAddress?.message)
    );
  }

  const allowSubmit = !!(
    receiverAddress &&
    isAddressValid &&
    !receiverAddressFieldError
  );

  return (
    <Stack>
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

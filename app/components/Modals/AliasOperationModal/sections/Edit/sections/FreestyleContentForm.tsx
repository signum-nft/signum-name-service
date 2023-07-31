import { useTranslation } from "next-i18next";
import { useFormContext, Controller } from "react-hook-form";
import { TextLabel } from "@/app/components/TextLabel";
import { mapValidationError } from "@/app/mapValidationError";
import { formatAmount } from "@/app/formatAmount";
import { EditAlias } from "../../../validation/types";
import { WizardSubmitter } from "../components/WizardSubmitter";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

interface Props {
  onCancel: () => void;
}

export const FreestyleContentForm = ({ onCancel }: Props) => {
  const { t } = useTranslation();

  const maximumCharactersAllowed = 1000;

  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<EditAlias>();

  const customContent = watch("customContent");

  let customContentFieldError = "";

  const customContentFieldHelperText =
    customContent.length + "/" + formatAmount(maximumCharactersAllowed);

  if (errors.customContent?.message) {
    customContentFieldError = t(
      mapValidationError(errors.customContent.message),
      mapValidationError(errors.customContent.message, true)
    );
  }

  const allowSubmit = !!(customContent.trim() && !customContentFieldError);

  return (
    <Stack spacing={2}>
      <TextLabel text={t("enterTheContent")} required />

      <Controller
        name="customContent"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            autoComplete="off"
            fullWidth
            multiline
            minRows={4}
            maxRows={20}
            label={t("enterTheContent")}
            helperText={customContentFieldError || customContentFieldHelperText}
            error={!!customContentFieldError}
            variant="outlined"
            color="secondary"
            inputProps={{
              maxLength: maximumCharactersAllowed,
            }}
          />
        )}
      />

      <WizardSubmitter allowSubmit={allowSubmit} onCancel={onCancel} />
    </Stack>
  );
};

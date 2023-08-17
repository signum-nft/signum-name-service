import { useTranslation } from "next-i18next";
import { useFormContext, Controller } from "react-hook-form";
import { TextLabel } from "@/app/components/TextLabel";
import { mapValidationError } from "@/app/mapValidationError";
import { EditAlias } from "../../../validation/types";
import { WizardSubmitter } from "../WizardSubmitter";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

interface Props {
  onCancel: () => void;
}

export const LinkForm = ({ onCancel }: Props) => {
  const { t } = useTranslation();

  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<EditAlias>();

  const homePage = watch("homePage");

  let urlFieldError = "";
  const urlFieldHelperText = t("urlFieldHelper");
  if (errors.homePage?.message) {
    urlFieldError = t(
      mapValidationError(errors.homePage.message),
      mapValidationError(errors.homePage.message, true)
    );
  }

  const allowSubmit = !!(homePage && !urlFieldError);

  return (
    <Stack spacing={2}>
      <TextLabel text={t("enterTheUrlOrLink")} required />

      <Controller
        name="homePage"
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
          />
        )}
      />

      <WizardSubmitter allowSubmit={allowSubmit} onCancel={onCancel} />
    </Stack>
  );
};

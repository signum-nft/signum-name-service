import { useTranslation } from "next-i18next";
import { useFormContext, Controller } from "react-hook-form";
import { mapValidationError } from "@/app/mapValidationError";
import { EditAlias } from "../../../../../validation/types";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

interface Props {
  fieldIndex: number;
  remove: () => void;
}

export const SocialNetworkField = ({ fieldIndex, remove }: Props) => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
  } = useFormContext<EditAlias>();

  const error = errors?.socialNetworks
    ? errors.socialNetworks[fieldIndex]
    : null;

  let socialNetworkFieldError = "";

  if (error && error?.url?.message) {
    socialNetworkFieldError = t(
      mapValidationError(error.url.message),
      mapValidationError(error.url.message, true)
    );
  }

  return (
    <Grid
      container
      direction="row"
      wrap="nowrap"
      alignItems="flex-start"
      mb={2}
      spacing={2}
    >
      <Grid item flex={1}>
        <Controller
          name={`socialNetworks.${fieldIndex}.url`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder={t("enterTheUrlOrLink")}
              autoComplete="off"
              helperText={socialNetworkFieldError}
              error={!!socialNetworkFieldError}
            />
          )}
        />
      </Grid>

      <Grid item>
        <Tooltip title={`${t("delete")}`} arrow>
          <IconButton
            color="error"
            onClick={remove}
            sx={{ border: 1, borderColor: "error" }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

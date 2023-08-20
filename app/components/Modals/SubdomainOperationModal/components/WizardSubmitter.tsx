import { useTranslation } from "next-i18next";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

interface Props {
  allowSubmit: boolean;
  onCancel: () => void;
}

export const WizardSubmitter = ({ allowSubmit, onCancel }: Props) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Button color="error" onClick={onCancel} fullWidth>
          {t("cancel")}
        </Button>
      </Grid>

      <Grid item xs={12} md={6}>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ color: "white" }}
          startIcon={<SaveIcon />}
          fullWidth
          disabled={!allowSubmit}
        >
          {t("continue")}
        </Button>
      </Grid>
    </Grid>
  );
};

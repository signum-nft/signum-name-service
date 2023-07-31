import { useTranslation } from "next-i18next";
import { openExternalUrl } from "@/app/openExternalUrl";
import { useAppContext } from "@/app/hooks/useAppContext";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const DocumentationSetup = () => {
  const { t } = useTranslation();
  const {
    Platform: { DocumentationUrl },
  } = useAppContext();

  return (
    <Grid
      item
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      xs={12}
      md={4}
      sx={{ mb: 3, px: 2 }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ whiteSpace: "pre-line" }}
        gutterBottom
      >
        {t("linkWalletGuideTitle")}
      </Typography>

      <Button
        fullWidth
        variant="outlined"
        color="secondary"
        sx={{ margin: "auto", textTransform: "none", opacity: 0.8 }}
        onClick={() => {
          openExternalUrl(DocumentationUrl + "/get-started");
        }}
      >
        {t("viewGuide")}
      </Button>
    </Grid>
  );
};

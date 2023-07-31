import { useTranslation } from "next-i18next";
import { useAppContext } from "@/app/hooks/useAppContext";

import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const AdditionalContent = () => {
  const { t } = useTranslation();
  const {
    Platform: { DocumentationUrl },
  } = useAppContext();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            flexDirection="column"
          >
            <Image
              src="/assets/img/signaToken.svg"
              alt="Token creation"
              width={76}
              height={80}
              unoptimized
            />

            <Typography fontWeight={500} gutterBottom align="center">
              {t("aliasSearchResultTip")}
            </Typography>

            <Button
              href={DocumentationUrl + "/create-smart-tokens"}
              target="_blank"
              color="secondary"
              fullWidth
              startIcon={<OpenInNewIcon />}
            >
              {t("learnMore")}
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

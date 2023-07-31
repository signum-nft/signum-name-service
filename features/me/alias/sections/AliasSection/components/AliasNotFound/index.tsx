import { useTranslation } from "next-i18next";

import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const AliasNotFound = () => {
  const { t } = useTranslation();

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Grid item xs={12} justifyContent="flex-start">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexDirection="column"
          p={2}
        >
          <Image
            src="/assets/img/noToken.png"
            alt="Tokens creation"
            width={100}
            height={100}
            unoptimized
          />

          <Typography color="textSecondary" align="center">
            {t("noAliasNotice")}
          </Typography>
        </Box>
      </Grid>
    </Paper>
  );
};

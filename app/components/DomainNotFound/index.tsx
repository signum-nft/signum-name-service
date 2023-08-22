import { useTranslation } from "next-i18next";

import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const DomainNotFound = () => {
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
            src="/assets/img/domain.png"
            alt="No Domain"
            width={100}
            height={100}
            unoptimized
            priority
          />

          <Typography color="textSecondary" align="center">
            {t("noAliasNotice")}
          </Typography>
        </Box>
      </Grid>
    </Paper>
  );
};

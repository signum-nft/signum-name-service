import { useTranslation } from "next-i18next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const MaintenancePage = () => {
  const { t } = useTranslation();

  return (
    <Box
      px={1}
      mb={10}
      mx="auto"
      width="100%"
      maxWidth="900px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
    >
      <Box paddingTop={10} width="100%" textAlign="center">
        {/* // eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/img/rocket.png" alt="Rocket Image" />
      </Box>

      <Typography
        variant="h1"
        align="center"
        sx={{ fontSize: { xs: 32, md: 42 } }}
        gutterBottom
      >
        {t("maintenanceModeTitle")}
      </Typography>

      <Typography
        gutterBottom
        color="textSecondary"
        variant="h4"
        align="center"
        sx={{ marginBottom: 2 }}
      >
        {t("maintenanceModeDescription")}
      </Typography>
    </Box>
  );
};

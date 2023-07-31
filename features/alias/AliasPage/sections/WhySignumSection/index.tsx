import { useTranslation } from "next-i18next";
import { SignumFeatureCard } from "./components/SignumFeatureCard";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AddTaskIcon from "@mui/icons-material/AddTask";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const WhySignumSection = () => {
  const { t } = useTranslation();

  const iconStyling = { fontSize: 50, my: 1 };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
      mb={2}
      px={2}
      py={4}
    >
      <Typography fontWeight={700} align="center" variant="h4" gutterBottom>
        {t("whySignum")}
      </Typography>

      <Grid container direction="row" spacing={2} px={2} maxWidth={900}>
        <Grid item xs={12} md={4}>
          <SignumFeatureCard
            icon={<AddTaskIcon sx={iconStyling} color="success" />}
            label={t("whySignumAliasSectionFirstReason")}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SignumFeatureCard
            icon={<MoveDownIcon sx={iconStyling} color="success" />}
            label={t("whySignumAliasSectionSecondReason")}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SignumFeatureCard
            icon={<AttachMoneyIcon sx={iconStyling} color="success" />}
            label={t("whySignumAliasSectionThirdReason")}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

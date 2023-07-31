import { useTranslation } from "next-i18next";
import { Step } from "./components/Step";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const HowToSection = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
      mb={2}
      px={2}
      py={4}
      sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
    >
      <Box
        width="100%"
        height="100%"
        position="absolute"
        top={0}
        left={0}
        zIndex={-3}
      />

      <Typography fontWeight={700} align="center" variant="h4" gutterBottom>
        {t("howItWorks")}
      </Typography>

      <Stack
        direction="column"
        spacing={2}
        sx={{ width: "100%", maxWidth: 500, px: 2 }}
      >
        <Step counter={1} label={t("aliasFirstStep")} />
        <Step counter={2} label={t("aliasSecondStep")} />
        <Step counter={3} label={t("aliasThirdStep") + " 😊"} />
      </Stack>
    </Box>
  );
};

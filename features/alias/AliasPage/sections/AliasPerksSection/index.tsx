import { useTranslation } from "next-i18next";
import { Perks } from "./components/Perks";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import TokenIcon from "@mui/icons-material/Token";

export const AliasPerksSection = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      mb={2}
      px={2}
      py={4}
      mx="auto"
      width="100%"
      maxWidth={900}
    >
      <Typography
        align="center"
        fontWeight={500}
        variant="h4"
        sx={{ width: "100%", mb: 3 }}
      >
        {t("aliasPerksTitleSection")}
      </Typography>

      <Grid
        container
        direction="row"
        alignItems="justify"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item xs={12} sm={4}>
          <Perks
            icon={<AccountBoxIcon fontSize="large" color="success" />}
            direction="column"
            title={t("aliasFirstPerkTitle")}
            description={t("aliasFirstPerkDescription")}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Perks
            icon={<AccountBalanceWalletIcon fontSize="large" color="success" />}
            direction="column"
            title={t("aliasSecondPerkTitle")}
            description={t("aliasSecondPerkDescription")}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Perks
            icon={<TravelExploreIcon fontSize="large" color="success" />}
            direction="column"
            title={t("aliasThirdPerkTitle")}
            description={t("aliasThirdPerkDescription")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Perks
            icon={<DesignServicesIcon fontSize="large" color="success" />}
            direction="row"
            title={t("aliasFourthPerkTitle")}
            description={t("aliasFourthPerkDescription")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Perks
            icon={<TokenIcon fontSize="large" color="success" />}
            direction="row"
            title={t("aliasFifthPerkTitle")}
            description={t("aliasFifthPerkDescription")}
            showSoonBadge
          />
        </Grid>
      </Grid>
    </Box>
  );
};

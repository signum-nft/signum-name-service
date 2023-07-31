import { useTranslation } from "next-i18next";
import { useAppContext } from "@/app/hooks/useAppContext";
import { FooterNavLinks } from "./components/FooterNavLinks";
import { useAppSelector } from "@/states/hooks";
import { selectIsDarkMode } from "@/app/states/appState";

import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const FooterLinks = () => {
  const { t } = useTranslation();
  const {
    Platform: { DocumentationUrl },
  } = useAppContext();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  const resourceSection = [
    { label: "Signum", url: "https://signum.network/", newTab: true },
    {
      label: t("wallet"),
      url: "https://www.signum.network/wallet.html#XTWallet",
      newTab: true,
    },
  ];

  const documentSection = [
    {
      label: t("documentation"),
      url: DocumentationUrl,
      newTab: true,
    },
    {
      label: t("getStarted"),
      url: DocumentationUrl + "/get-started",
      newTab: true,
    },
  ];

  const legalSection = [
    {
      label: t("privacyPolicy"),
      url: "/privacy",
    },
    {
      label: t("termsOfService"),
      url: "/terms",
    },
  ];

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <FooterNavLinks title={t("resource_other")} links={resourceSection} />

      <FooterNavLinks title={t("document_other")} links={documentSection} />

      <FooterNavLinks title={t("legal")} links={legalSection} />

      <Grid
        item
        xs={6}
        md={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Image
          src={`/assets/img/${
            isDarkMode
              ? "coingecko_logo_with_white_text.webp"
              : "coingecko_logo_with_dark_text.webp"
          }`}
          width={167}
          height={43}
          alt="Coingecko logo"
          unoptimized
        />

        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 1 }}
        >
          {t("ratesPoweredBy")}
        </Typography>
      </Grid>
    </Grid>
  );
};

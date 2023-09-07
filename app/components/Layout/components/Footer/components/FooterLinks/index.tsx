import { useTranslation } from "next-i18next";
import { useAppContext } from "@/app/hooks/useAppContext";
import { FooterNavLinks } from "./components/FooterNavLinks";

import Grid from "@mui/material/Grid";

export const FooterLinks = () => {
  const { t } = useTranslation();
  const {
    Platform: { DocumentationUrl },
  } = useAppContext();

  const resourceSection = [
    { label: "Signum", url: "https://signum.network/", newTab: true },
    {
      label: t("wallet"),
      url: "https://www.signum.network/wallet.html#XTWallet",
      newTab: true,
    },
    {
      label: t("nostrumNetwork"),
      url: "https://www.nostrum.network",
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
    {
      label: t("getNostrAccount"),
      url: "https://www.youtube.com/watch?v=MRlj90ZA2Dc",
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
    </Grid>
  );
};

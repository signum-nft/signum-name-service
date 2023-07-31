import { useTranslation } from "next-i18next";
import { useAppContext } from "@/app/hooks/useAppContext";
import { SubMenuLink } from "../components/SubMenuLink";

import Box from "@mui/material/Box";
import ArticleIcon from "@mui/icons-material/Article";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import GestureIcon from "@mui/icons-material/Gesture";

export const ExtraMenu = () => {
  const { t } = useTranslation();
  const {
    Platform: { DocumentationUrl },
  } = useAppContext();

  return (
    <Box
      component="ul"
      display="flex"
      flexDirection="column"
      p={0}
      m={0}
      role="menu"
    >
      <SubMenuLink
        title={t("documentation")}
        url={DocumentationUrl}
        newTab
        icon={<ArticleIcon />}
      />

      <SubMenuLink
        title={t("FAQ")}
        url={DocumentationUrl + "/faq"}
        newTab
        icon={<HelpOutlineIcon />}
      />

      <SubMenuLink
        title={t("termsOfService")}
        url="/terms"
        icon={<StickyNote2Icon />}
      />

      <SubMenuLink
        title={t("privacyPolicy")}
        url="/privacy"
        icon={<PrivacyTipIcon />}
      />

      <SubMenuLink
        title="SignumArt"
        description={t("signumArtDescription")}
        url="https://signumart.io/"
        newTab
        icon={<GestureIcon />}
      />
    </Box>
  );
};

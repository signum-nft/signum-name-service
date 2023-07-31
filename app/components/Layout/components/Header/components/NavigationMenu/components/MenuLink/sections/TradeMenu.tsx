import { useTranslation } from "next-i18next";
import { SubMenuLink } from "../components/SubMenuLink";

import Box from "@mui/material/Box";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

export const TradeMenu = () => {
  const { t } = useTranslation();

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
        title={t("tokenSpotTrading")}
        description={t("tokenSpotTradingDescription")}
        url="/tokens"
        icon={<AssessmentOutlinedIcon />}
      />

      <SubMenuLink
        title={t("p2pTrading")}
        description={t("p2pTradingDescription")}
        url="/p2p"
        icon={<PeopleAltIcon />}
      />
    </Box>
  );
};

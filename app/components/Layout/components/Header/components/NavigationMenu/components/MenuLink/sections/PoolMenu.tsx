import { useTranslation } from "next-i18next";
import { SubMenuLink } from "../components/SubMenuLink";

import Box from "@mui/material/Box";
import TollIcon from "@mui/icons-material/Toll";
import WorkspacesIcon from "@mui/icons-material/Workspaces";

export const PoolMenu = () => {
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
        title={t("stakingPool_other")}
        description={t("stakingPoolMenuDescription")}
        url="/staking-pools"
        icon={<WorkspacesIcon />}
      />

      <SubMenuLink
        title={t("liquidityPool_other")}
        description={t("liquidityPoolMenuDescription")}
        url="/liquidity-pools"
        icon={<TollIcon />}
      />
    </Box>
  );
};

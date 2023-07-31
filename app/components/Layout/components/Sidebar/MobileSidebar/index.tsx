import { useTranslation } from "next-i18next";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { selectIsOpenMobileSidebar, appActions } from "@/app/states/appState";
import { Divider } from "@/app/components/Divider";
import { SocialLinks } from "@/app/components/Layout/components/SocialLinks";
import { Sidebar, CloseButton } from "../index";
import { SidebarItem } from "../SidebarItem";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactsIcon from "@mui/icons-material/Contacts";
import TollIcon from "@mui/icons-material/Toll";
import WorkspacesIcon from "@mui/icons-material/Workspaces";

export const MobileSidebar = () => {
  const { t } = useTranslation();
  const { setMobileSidebar } = appActions;
  const dispatch = useAppDispatch();
  const isOpenMobileSidebar = useAppSelector(selectIsOpenMobileSidebar);
  const closeSidebar = () => dispatch(setMobileSidebar(false));

  return (
    <Sidebar isOpen={isOpenMobileSidebar} handleClose={closeSidebar}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        height="100%"
        wrap="nowrap"
        sx={{ overflowY: "auto" }}
      >
        <Grid item>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <CloseButton onClick={closeSidebar} />
          </Box>

          <SidebarItem
            icon={<AssessmentOutlinedIcon fontSize="medium" />}
            title={t("tokenSpotTrading")}
            onClick={closeSidebar}
            url="/tokens"
          />

          <SidebarItem
            icon={<PeopleAltIcon fontSize="medium" />}
            title={t("p2pTrading")}
            onClick={closeSidebar}
            url="/p2p"
          />

          <SidebarItem
            icon={<WorkspacesIcon fontSize="medium" />}
            title={t("stakingPool_other")}
            onClick={closeSidebar}
            url="/staking-pools"
          />

          <SidebarItem
            icon={<TollIcon fontSize="medium" />}
            title={t("liquidityPool_other")}
            onClick={closeSidebar}
            url="/liquidity-pools"
          />

          <SidebarItem
            icon={<ContactsIcon fontSize="medium" />}
            title={t("alias")}
            onClick={closeSidebar}
            url="/alias"
          />
        </Grid>

        <Grid item>
          <Divider />
          <SocialLinks />
        </Grid>
      </Grid>
    </Sidebar>
  );
};

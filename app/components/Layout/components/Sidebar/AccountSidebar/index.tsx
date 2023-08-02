import { useTranslation } from "next-i18next";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { selectIsOpenAccountSidebar, appActions } from "@/app/states/appState";
import { Divider } from "@/app/components/Divider";
import { Sidebar, CloseButton } from "../index";
import { AccountSummary } from "./components/AccountSummary";
import { SidebarItem } from "../SidebarItem";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import SpokeIcon from "@mui/icons-material/Spoke";
import HubIcon from "@mui/icons-material/Hub";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useXTWallet } from "@/app/hooks/useXTWallet";

export const AccountSidebar = () => {
  const { t } = useTranslation();
  const { disconnect } = useXTWallet();

  const { setAccountSidebar } = appActions;
  const dispatch = useAppDispatch();
  const isOpenAccountSidebar = useAppSelector(selectIsOpenAccountSidebar);
  const closeSidebar = () => dispatch(setAccountSidebar(false));

  const logOut = () => {
    closeSidebar();
    disconnect();
  };

  return (
    <Sidebar isOpen={isOpenAccountSidebar} handleClose={closeSidebar}>
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

          <Grid item mb={2}>
            <AccountSummary />
          </Grid>

          <SidebarItem
            icon={<ContactsIcon fontSize="medium" />}
            title={t("myAlias_other")}
            onClick={closeSidebar}
            url="/me/alias"
          />

          <Divider />

          <MenuItem
            onClick={logOut}
            sx={{ alignItems: "flex-start", py: 1.7, borderRadius: 2 }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText
              sx={{ textTransform: "capitalize" }}
              primary={t("signOut")}
            />
          </MenuItem>
        </Grid>
      </Grid>
    </Sidebar>
  );
};

import { useTranslation } from "next-i18next";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import {
  selectIsOpenSidebar,
  selectIsDarkMode,
  appActions,
} from "@/app/states/appState";
import { selectTickerSymbol, marketActions } from "@/app/states/marketState";
import { DefaultAllowedTickers } from "@/app/types/supportedTickerSymbol";
import { LanguageMenu } from "@/app/components/LanguageMenu";
import { ClearDataWizard } from "@/app/components/Layout/components/Sidebar/components/ClearDataWizard";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TranslateIcon from "@mui/icons-material/Translate";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import { useXTWallet } from "@/features/xtWallet";
import { AccountSummary } from "./components/AccountSummary";
import { SidebarWrapper } from "@/app/components/Layout/components/Sidebar/components/SidebarWrapper";
import { CloseButton } from "./components/CloseButton";

export const SettingsSidebar = () => {
  const { t } = useTranslation();
  const { disconnect, isWalletConnected } = useXTWallet();
  const { setSidebarOpen, setTheme } = appActions;
  const { setSelectedTickerSymbol } = marketActions;
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const isOpenSettingsSidebar = useAppSelector(selectIsOpenSidebar);

  const closeSidebar = () => dispatch(setSidebarOpen(false));
  const setLightMode = () => dispatch(setTheme("light"));
  const setDarkMode = () => dispatch(setTheme("dark"));

  const logOut = () => {
    closeSidebar();
    disconnect();
  };

  return (
    <SidebarWrapper isOpen={isOpenSettingsSidebar} handleClose={closeSidebar}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        width="100%"
        height="100%"
      >
        <Box width="100%">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="end"
            alignItems="center"
            mb={2}
          >
            <CloseButton onClick={closeSidebar} />
          </Box>
          <Box mb={2}>
            <AccountSummary />
          </Box>
          <Divider />

          <Box mt={2}>
            <Typography fontWeight={500} gutterBottom>
              {t("themeMode")}
            </Typography>

            <ButtonGroup sx={{ width: "100%", mb: 2 }}>
              <Button
                fullWidth
                onClick={setLightMode}
                variant={!isDarkMode ? "contained" : "outlined"}
                startIcon={<Brightness7Icon />}
                sx={{
                  color: !isDarkMode ? "white" : "inherit",
                }}
              >
                {t("light")}
              </Button>

              <Button
                fullWidth
                onClick={setDarkMode}
                variant={isDarkMode ? "contained" : "outlined"}
                startIcon={<Brightness4Icon />}
                sx={{
                  color: isDarkMode ? "white" : "inherit",
                }}
              >
                {t("dark")}
              </Button>
            </ButtonGroup>

            <Typography fontWeight={500} gutterBottom>
              {t("language")}
            </Typography>

            <LanguageMenu>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                startIcon={<TranslateIcon />}
                sx={{ color: "white", mb: 2 }}
              >
                {t("changeLanguage")}
              </Button>
            </LanguageMenu>
          </Box>
        </Box>

        <Box width="100%">
          {isWalletConnected && (
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              startIcon={<LogoutIcon fontSize="medium" />}
              onClick={logOut}
              sx={{ textTransform: "capitalize", mb: 1 }}
            >
              {t("signOut")}
            </Button>
          )}
          <ClearDataWizard handleClose={closeSidebar} />
        </Box>
      </Box>
    </SidebarWrapper>
  );
};

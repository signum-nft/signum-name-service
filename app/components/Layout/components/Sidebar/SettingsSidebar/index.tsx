import { useTranslation } from "next-i18next";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import {
  selectIsOpenSettingsSidebar,
  selectIsDarkMode,
  appActions,
} from "@/app/states/appState";
import { selectTickerSymbol, marketActions } from "@/app/states/marketState";
import { DefaultAllowedTickers } from "@/app/types/supportedTickerSymbol";
import { LanguageMenu } from "@/app/components/LanguageMenu";
import { Sidebar, CloseButton } from "../index";
import { ClearDataWizard } from "./components/ClearDataWizard";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TranslateIcon from "@mui/icons-material/Translate";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export const SettingsSidebar = () => {
  const { t } = useTranslation();
  const { setSettingsSidebar, setTheme } = appActions;
  const { setSelectedTickerSymbol } = marketActions;
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const activeTickerSymbol = useAppSelector(selectTickerSymbol);
  const isOpenSettingsSidebar = useAppSelector(selectIsOpenSettingsSidebar);

  const closeSidebar = () => dispatch(setSettingsSidebar(false));
  const setLightMode = () => dispatch(setTheme("light"));
  const setDarkMode = () => dispatch(setTheme("dark"));

  const setCurrency = (event: SelectChangeEvent) => {
    const { value } = event.target;

    // @ts-ignore
    if (!DefaultAllowedTickers.includes(value)) return;

    // @ts-ignore
    dispatch(setSelectedTickerSymbol(value));
    localStorage.setItem("selectedTickerSymbol", value);

    closeSidebar();
  };

  return (
    <Sidebar isOpen={isOpenSettingsSidebar} handleClose={closeSidebar}>
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
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography fontWeight={500}>{t("globalSettings")}</Typography>
            <CloseButton onClick={closeSidebar} />
          </Box>

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

          <Typography fontWeight={500} gutterBottom>
            {t("currency")}
          </Typography>

          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel id="demo-simple-select-label">
              {t("selectCurrency")}
            </InputLabel>

            <Select
              value={activeTickerSymbol}
              label={t("selectCurrency")}
              onChange={setCurrency}
            >
              {DefaultAllowedTickers.map((ticker) => (
                <MenuItem key={ticker} value={ticker}>
                  {ticker.toUpperCase()}
                </MenuItem>
              ))}

              <MenuItem disabled sx={{ fontSize: 12 }}></MenuItem>
            </Select>
          </FormControl>

          <Typography variant="body2" textAlign="center" color="textSecondary">
            {t("ratesPoweredBy")}
          </Typography>
        </Box>

        <Box width="100%">
          <ClearDataWizard handleClose={closeSidebar} />
        </Box>
      </Box>
    </Sidebar>
  );
};

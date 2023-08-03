import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { selectIsDarkMode, appActions } from "@/app/states/appState";
import { LanguageButton } from "./components/LanguageButton";
import { FooterLinks } from "./components/FooterLinks";
import { SocialLinks } from "../SocialLinks";

import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export const Footer = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(selectIsDarkMode);

  const toggleThemeMode = () =>
    dispatch(appActions.setTheme(isDarkMode ? "light" : "dark"));

  const limitedSection = { maxWidth: 900, margin: "auto" };

  return (
    <Grid
      container
      component="footer"
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      mt={4}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{
          ...limitedSection,
          mt: 3,
          px: 2,
        }}
      >
        <FooterLinks />
      </Grid>

      <Divider flexItem />

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          ...limitedSection,
          px: 2,
          pt: 2,
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="flex-start"
          item
          xs={12}
          md={3}
        >
          <Grid
            container
            item
            sx={{
              mr: 1,
              width: { xs: "100%", md: "auto" },
              justifyContent: { xs: "center", md: "flex-start" },
              mb: { xs: 1, md: 0 },
            }}
          >
            <Link
              href="https://www.signum.network/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={`/assets/img/powered.svg`}
                width={94}
                height={32}
                alt="Signum logo"
                unoptimized
              />
            </Link>

            <Link
              href="https://docs.signum.network/signum/signumjs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={`/assets/img/Signum_Badge_JS.svg`}
                width={35}
                height={35}
                alt="Signum logo"
                unoptimized
              />
            </Link>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          md={9}
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            mb: 2,
            justifyContent: { xs: "center", md: "flex-end" },
          }}
        >
          <Grid item xs={6} md={2}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              sx={{
                textTransform: "capitalize",
                padding: "0.5rem 0.5rem",
                borderColor: "divider",
              }}
              onClick={toggleThemeMode}
              startIcon={isDarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
            >
              {isDarkMode ? t("dark") : t("light")}
            </Button>
          </Grid>

          <Grid item xs={6} md={2.4}>
            <LanguageButton />
          </Grid>

          <Grid item xs={12} md={5}>
            <SocialLinks />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

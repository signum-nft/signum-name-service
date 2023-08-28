import { useRouter } from "next/router";
import { MenuOptions } from "@/app/components/MenuOptions";
import { useAppDispatch } from "@/states/hooks";
import { appActions } from "@/app/states/appState";
import { AvailableLanguages } from "@/app/i18n/availableLanguages";

import Grid from "@mui/material/Grid";

interface LanguageMenuProps {
  children?: any;
}

export const LanguageMenu = ({ children }: LanguageMenuProps) => {
  const { setSidebarOpen } = appActions;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const switchLanguage = (locale: string) => {
    dispatch(setSidebarOpen(false));

    document.cookie = `NEXT_LOCALE=${locale}; expires=${new Date(
      new Date().getTime() + 2000 * 120 * 120 * 48 * 730
    ).toUTCString()}; path=/`;

    router.push({ pathname, query }, asPath, { locale });
  };

  const languages = AvailableLanguages.map((item) => ({
    label: item.label,
    onClick: () => {
      switchLanguage(item.locale);
    },
  }));

  return (
    <Grid item>
      <MenuOptions links={languages}>{children}</MenuOptions>
    </Grid>
  );
};

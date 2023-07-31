import { useRouter } from "next/router";
import { MenuOptions } from "@/app/components/MenuOptions";
import { useAppDispatch } from "@/states/hooks";
import { appActions } from "@/app/states/appState";
import { getAvailableLanguages } from "@/app/i18n/getAvailableLanguages";

import Grid from "@mui/material/Grid";

interface LanguageMenuProps {
  children?: any;
}

const availableLanguages = getAvailableLanguages();

export const LanguageMenu = ({ children }: LanguageMenuProps) => {
  const { setSettingsSidebar } = appActions;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const switchLanguage = (locale: string) => {
    dispatch(setSettingsSidebar(false));

    document.cookie = `NEXT_LOCALE=${locale}; expires=${new Date(
      new Date().getTime() + 2000 * 120 * 120 * 48 * 730
    ).toUTCString()}; path=/`;

    router.push({ pathname, query }, asPath, { locale });
  };

  const languages = availableLanguages.map((item) => ({
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

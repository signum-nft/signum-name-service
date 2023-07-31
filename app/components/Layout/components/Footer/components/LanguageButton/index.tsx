import { useTranslation } from "next-i18next";
import { LanguageMenu } from "@/app/components/LanguageMenu";

import Button from "@mui/material/Button";
import TranslateIcon from "@mui/icons-material/Translate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const LanguageButton = () => {
  const { t } = useTranslation();

  return (
    <div>
      <LanguageMenu>
        <Button
          fullWidth
          color="inherit"
          variant="outlined"
          sx={{
            textTransform: "capitalize",
            padding: "0.5rem",
            borderColor: "divider",
          }}
          startIcon={<TranslateIcon />}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {t("mainLanguage")}
        </Button>
      </LanguageMenu>
    </div>
  );
};

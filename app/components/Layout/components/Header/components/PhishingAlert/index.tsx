import { useTranslation } from "next-i18next";
import { useAppContext } from "@/app/hooks/useAppContext";
import { useFeatureBackgroundImage } from "@/app/hooks/useFeatureBackgroundImage";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import {
  appActions,
  selectIsDarkMode,
  selectIsOpenPhishingAlert,
} from "@/app/states/appState";

import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import Toolbar from "@mui/material/Toolbar";
import Collapse from "@mui/material/Collapse";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";

export const PhishingAlert = () => {
  const { t } = useTranslation();
  const { Platform } = useAppContext();
  const { setPhishingAlert } = appActions;
  const dispatch = useAppDispatch();
  const background = useFeatureBackgroundImage(true);
  const isOpenPhishingAlert = useAppSelector(selectIsOpenPhishingAlert);

  const closeAlert = () => dispatch(setPhishingAlert(false));

  return (
    <Collapse in={isOpenPhishingAlert}>
      <Toolbar
        sx={{
          width: "100%",
          mx: "auto",
          alignItems: "center",
          justifyContent: "space-between",
          p: 0,
          background,
        }}
      >
        <Alert
          // @ts-ignore
          color="primary"
          icon={<PrivacyTipIcon />}
          sx={{
            width: "auto",
            mx: "auto",
            borderRadius: { xs: 0, lg: 2 },
          }}
          onClose={closeAlert}
        >
          <strong>{t("urlPhishingWarning")}</strong>

          {": " + t("urlPhishingWarningDescription") + " "}

          <Chip
            size="small"
            label={Platform.CanonicalUrl}
            color="primary"
            sx={{ color: "white", borderRadius: 1, fontWeight: 700 }}
          />

          {" " + t("urlPhishingWarningSecondDescription")}
        </Alert>
      </Toolbar>
    </Collapse>
  );
};

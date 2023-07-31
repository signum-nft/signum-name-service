import { useTranslation } from "next-i18next";
import { AliasUpdateMode } from "@/app/types/aliasUpdateMode";
import { CardTypeSelector } from "@/app/components/CardTypeSelector";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PublicIcon from "@mui/icons-material/Public";
import SourceIcon from "@mui/icons-material/Source";
import GestureIcon from "@mui/icons-material/Gesture";

interface Props {
  updateMode: AliasUpdateMode;
  onChangeType: (value: AliasUpdateMode) => void;
  onSubmit: () => void;
}

export const TypeSelector = ({ updateMode, onChangeType, onSubmit }: Props) => {
  const { t } = useTranslation();

  const activateAccountMode = () => onChangeType("account");
  const activateLinkMode = () => onChangeType("link");
  const activateStandardMode = () => onChangeType("standard");
  const activateFreestyleMode = () => onChangeType("freestyle");

  let summaryLabel = "";
  switch (updateMode) {
    case "account":
      summaryLabel = "accountShortcutDescription";
      break;

    case "link":
      summaryLabel = "linkRedirectionDescription";
      break;

    case "standard":
      summaryLabel = "standardContentDescription";
      break;

    case "freestyle":
      summaryLabel = "freestyleContentDescription";
      break;

    default:
      break;
  }

  return (
    <Grid container spacing={2}>
      <Grid item container justifyContent="center">
        <Typography align="center" gutterBottom>
          {t("howWouldYouLikeToUseYourAlias")}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <CardTypeSelector
          icon={<AccountBoxIcon />}
          label={t("accountShortcut")}
          type="account"
          active={updateMode}
          onClick={activateAccountMode}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CardTypeSelector
          icon={<PublicIcon />}
          label={t("linkRedirection")}
          type="link"
          active={updateMode}
          onClick={activateLinkMode}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CardTypeSelector
          icon={<SourceIcon />}
          label={t("standardContent")}
          type="standard"
          active={updateMode}
          onClick={activateStandardMode}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CardTypeSelector
          icon={<GestureIcon />}
          label={t("freestyleContent")}
          type="freestyle"
          active={updateMode}
          onClick={activateFreestyleMode}
        />
      </Grid>

      <Grid item container justifyContent="center">
        <Collapse in={!!summaryLabel} sx={{ width: "100%" }}>
          <Stack direction="column" width="100%" spacing={1}>
            <Alert
              sx={{
                width: "100%",
                whiteSpace: "pre-line",
              }}
              severity="info"
            >
              {t(summaryLabel)}
            </Alert>

            <Button
              variant="contained"
              color="secondary"
              sx={{ color: "white" }}
              onClick={onSubmit}
              fullWidth
            >
              {t("continue")}
            </Button>
          </Stack>
        </Collapse>
      </Grid>
    </Grid>
  );
};

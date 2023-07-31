import { useTranslation } from "next-i18next";
import { PaperContainer } from "@/app/components/PaperContainer";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import AddIcon from "@mui/icons-material/Add";

type Action = { label: string; url: string };

interface Props {
  title: string;
  description: string;
  contentNotice: string;
  action: Action;
  secondAction?: Action;
}

export const ContentCreated = ({
  title,
  description,
  contentNotice,
  action,
  secondAction,
}: Props) => {
  const { t } = useTranslation();
  const { label, url } = action;

  return (
    <PaperContainer>
      <Grid
        container
        item
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ my: 4 }}
      >
        <Grid item>
          <Typography variant="h5" align="center" sx={{ width: "100%" }}>
            {title}
          </Typography>
        </Grid>

        <Grid item>
          <Typography
            color="textSecondary"
            align="center"
            sx={{ width: "100%", mb: 2 }}
          >
            {description}
          </Typography>
        </Grid>

        <Grid item>
          <Alert
            severity="info"
            sx={{ width: { xs: "100%", lg: "95%" }, mx: "auto", mb: 4 }}
          >
            <AlertTitle>{t("notice")}</AlertTitle>
            {contentNotice}
          </Alert>
        </Grid>

        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {secondAction && (
            <Grid item flex={1}>
              <Button
                href={secondAction.url}
                color="secondary"
                fullWidth
                sx={{ mx: "auto", maxWidth: 500, textTransform: "none" }}
              >
                {secondAction.label}
              </Button>
            </Grid>
          )}

          <Grid item flex={1} display="flex" justifyContent="center">
            <Button
              href={url}
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                mx: "auto",
                maxWidth: 500,
                textTransform: "none",
                color: "white",
              }}
              startIcon={<AddIcon />}
            >
              {label}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </PaperContainer>
  );
};

import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

interface Props {
  icon: ReactElement;
  title: string;
  description: string;
  direction: "row" | "column";
  showSoonBadge?: boolean;
}

export const Perks = ({
  icon,
  title,
  description,
  direction,
  showSoonBadge,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        borderColor: "divider",
        p: 2,
        overflow: "visible",
        borderRadius: 2,
      }}
    >
      <Grid container flexDirection={direction} spacing={1}>
        <Grid item xs={12} md={direction === "column" ? 3 : 2}>
          {icon}
        </Grid>

        <Grid item xs={12} md={direction === "column" ? 12 : 10}>
          <Typography fontWeight={700}>{title}</Typography>
          <Typography fontSize={16}>{description}</Typography>
        </Grid>
      </Grid>

      {showSoonBadge && (
        <Chip
          label={t("soon")}
          color="error"
          size="small"
          sx={{ position: "absolute", right: -10, top: -10 }}
        />
      )}
    </Card>
  );
};

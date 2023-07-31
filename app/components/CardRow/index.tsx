import { ReactElement, ReactNode } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface Props {
  label: string;
  value?: string;
  children?: ReactElement | ReactNode;
}

export const CardRow = ({ label, value, children }: Props) => (
  <Grid
    container
    direction="row"
    alignItems="flex-start"
    columnSpacing={2}
    mb={2}
  >
    <Grid item xs={12} lg={5}>
      <Typography variant="body2" fontWeight={500} color="textSecondary">
        {label}
      </Typography>
    </Grid>

    <Grid item xs={12} lg={7}>
      {children || <Typography variant="body2">{value}</Typography>}
    </Grid>
  </Grid>
);

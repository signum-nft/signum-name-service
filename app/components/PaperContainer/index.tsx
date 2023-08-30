import { FC } from "react";
import { ChildrenProps } from "@/app/types/ChildrenProps";
import Grid from "@mui/material/Grid";

export const PaperContainer: FC<ChildrenProps> = ({ children }) => (
  <Grid
    container
    direction="column"
    justifyContent="flex-start"
    alignItems="flex-start"
    sx={{
      mb: 4,
      background: "paper",
      borderRadius: 3,
      border: 1,
      borderColor: "divider",
      p: 2,
      pt: 3,
      px: 3,
      backgroundColor: (theme) => theme.palette.background.paper,
    }}
  >
    {children}
  </Grid>
);

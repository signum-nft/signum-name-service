import { ReactNode } from "react";
import Paper from "@mui/material/Paper";

interface Props {
  children: ReactNode;
}

export const PaperCard = ({ children }: Props) => (
  <Paper
    variant="outlined"
    sx={{ p: 2, borderRadius: 2, position: "relative" }}
  >
    {children}
  </Paper>
);

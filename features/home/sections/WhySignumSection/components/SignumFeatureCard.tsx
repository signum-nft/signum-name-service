import { ReactElement } from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

interface Props {
  icon: ReactElement;
  label: string;
}

export const SignumFeatureCard = ({ icon, label }: Props) => (
  <Card
    variant="outlined"
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      borderColor: "divider",
      p: 2,
      overflow: "visible",
      borderRadius: 2,
    }}
  >
    {icon}

    <Typography fontWeight={500} fontSize={18} align="center">
      {label}
    </Typography>
  </Card>
);

import { ReactElement } from "react";

import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";

interface Props {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const TabButton = ({ label, isActive, onClick }: Props) => (
  <Tooltip title="" arrow>
    <Chip
      sx={{
        fontWeight: 500,
        fontSize: 14,
        p: 2,
        border: 1,
        borderColor: "divider",
        color: isActive ? "white" : "inherit",
        background: (theme) =>
          isActive ? undefined : `${theme.palette.background.paper} !important`,
      }}
      label={label}
      color="primary"
      variant={!isActive ? "outlined" : undefined}
      onClick={onClick}
    />
  </Tooltip>
);

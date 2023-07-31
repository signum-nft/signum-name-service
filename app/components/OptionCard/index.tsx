import { ReactElement } from "react";

import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Tooltip from "@mui/material/Tooltip";

interface Props {
  label: string;
  tooltipLabel?: string;
  icon: ReactElement;
  type: string;
  active: string;
  onClick: () => void;
}

export const OptionCard = ({
  label,
  tooltipLabel = "",
  icon,
  type,
  active,
  onClick,
}: Props) => (
  <Tooltip arrow title={tooltipLabel}>
    <ButtonBase
      onClick={onClick}
      sx={{
        width: "100%",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: 3,
        px: 2,
        border: 1,
        borderColor: type === active ? "secondary.main" : "divider",
        color: type === active ? "secondary.main" : "",
      }}
    >
      {icon}

      <Typography align="center" fontWeight={500}>
        {label}
      </Typography>
    </ButtonBase>
  </Tooltip>
);

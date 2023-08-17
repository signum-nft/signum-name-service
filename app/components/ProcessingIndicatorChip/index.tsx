import { useTranslation } from "next-i18next";

import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import LoopIcon from "@mui/icons-material/Loop";

interface Props {
  label?: string;
  color?: "info" | "error";
}

export const ProcessingIndicatorChip = ({ label, color = "info" }: Props) => {
  const { t } = useTranslation();
  return (
    <Tooltip title={label ?? t("processingHint")} arrow placement="top">
      <Chip
        label={t("processing")}
        size="small"
        icon={
          <LoopIcon
            sx={{
              animation: "spin 4s linear infinite",
              "@keyframes spin": {
                "0%": {
                  transform: "rotate(360deg)",
                },
                "100%": {
                  transform: "rotate(0deg)",
                },
              },
            }}
          />
        }
        sx={{ color: "white" }}
        color={color}
      />
    </Tooltip>
  );
};

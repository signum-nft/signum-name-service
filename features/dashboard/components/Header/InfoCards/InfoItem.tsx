import { Stack, Typography } from "@mui/material";
import { ReactElement } from "react";

interface InfoItemProps {
  label: string;
  value?: string | ReactElement;
  children?: ReactElement;
}

export const InfoItem = ({ label, value = "", children }: InfoItemProps) => {
  return (
    <Stack direction="column">
      <Typography variant="subtitle2" color="grey" sx={{ p: 0 }}>
        {label}
      </Typography>
      {children || (
        <Typography variant="h3" sx={{ position: "relative", top: "-8px" }}>
          {value}
        </Typography>
      )}
    </Stack>
  );
};

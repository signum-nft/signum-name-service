import { ReactElement } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { SxProps, Theme } from "@mui/system";

interface Props {
  icon: ReactElement;
  label: string;
  value: string;
  isLoading?: boolean;
  sx?: SxProps<Theme>;
}

export const DataRow = ({ icon, label, value, isLoading, sx }: Props) => {
  if (isLoading)
    return (
      <Box width="100%">
        <Skeleton width="100%" height={24} />
      </Box>
    );

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      alignItems="center"
      sx={sx}
    >
      <Box mr={1} display="flex">
        {icon}
      </Box>

      <Typography color="textSecondary" sx={{ mr: 1 }}>
        {label}
      </Typography>

      <Typography fontWeight={500}>{value}</Typography>
    </Box>
  );
};

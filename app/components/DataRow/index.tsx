import { ReactElement } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

interface Props {
  icon: ReactElement;
  label: string;
  value: string;
  isLoading?: boolean;
}

export const DataRow = ({ icon, label, value, isLoading }: Props) => {
  if (isLoading)
    return (
      <Box width="100%">
        <Skeleton width="100%" height={24} />
      </Box>
    );

  return (
    <Box width="100%" display="flex" flexDirection="row" alignItems="center">
      <Box mr={0.5} display="flex">
        {icon}
      </Box>

      <Typography color="textSecondary" sx={{ mr: 1 }}>
        {label}
      </Typography>

      <Typography fontWeight={500}>{value}</Typography>
    </Box>
  );
};

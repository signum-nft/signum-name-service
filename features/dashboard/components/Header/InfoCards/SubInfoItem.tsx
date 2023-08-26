import { Box, Typography } from "@mui/material";

interface Props {
  text: string;
}

export const SubInfoItem = ({ text }: Props) => {
  return (
    <Box sx={{ mt: -2 }} position="relative">
      <Typography variant="subtitle1" color="grey" sx={{ p: 0 }}>
        {text}
      </Typography>
    </Box>
  );
};

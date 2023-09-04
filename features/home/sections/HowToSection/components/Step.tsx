import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

interface Props {
  counter: string | number;
  label: JSX.Element;
  caption?: string;
}

export const Step = ({ counter, label, caption }: Props) => (
  <Stack direction="row" alignItems="center" spacing={2}>
    <Avatar sx={{ bgcolor: "rgb(243,177,103)" }}>{counter}</Avatar>

    <Box>
      <Typography fontWeight={500} fontSize={18}>
        {label}
      </Typography>
      {caption && (
        <Typography
          fontWeight={500}
          fontSize={13}
          fontFamily="monospace"
          color="text.secondary"
        >
          {caption}
        </Typography>
      )}
    </Box>
  </Stack>
);

import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

interface Props {
  counter: number;
  label: string;
}

export const Step = ({ counter, label }: Props) => (
  <Stack direction="row" alignItems="center" spacing={2}>
    <Avatar sx={{ bgcolor: "#1A6B39", color: "white" }}>{counter}</Avatar>

    <Typography fontWeight={500} fontSize={18}>
      {label}
    </Typography>
  </Stack>
);

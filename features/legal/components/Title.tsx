import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

interface Props {
  content: string;
  date: string;
}

export const Title = ({ content, date }: Props) => (
  <Paper sx={{ p: 2, mb: 4, borderRadius: 2 }} variant="outlined">
    <Typography
      variant="h2"
      fontWeight={400}
      sx={{ mb: 0.5, fontSize: { xs: 28, lg: 36 } }}
    >
      {content}
    </Typography>

    <Typography sx={{ ml: 0.5 }}>{date}</Typography>

    <Typography sx={{ ml: 0.5 }} variant="body2" color="textSecondary">
      The following content will be shown only in english
    </Typography>
  </Paper>
);

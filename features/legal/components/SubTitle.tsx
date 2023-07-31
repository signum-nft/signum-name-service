import Typography from "@mui/material/Typography";

interface Props {
  content: string;
}

export const SubTitle = ({ content }: Props) => (
  <Typography variant="h4" gutterBottom sx={{ mt: 2, mb: 0.5 }}>
    {content}
  </Typography>
);

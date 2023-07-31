import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface SuccessfulModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  handleClose: () => void;
}

export const SuccessfulModal = ({
  title,
  description,
  isOpen,
  handleClose,
}: SuccessfulModalProps) => {
  return (
    <Dialog onClose={handleClose} open={isOpen} fullWidth maxWidth="xs">
      <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>

      <DialogContent dividers>
        <Grid container direction="column" alignItems="center">
          <CheckCircleIcon color="success" sx={{ fontSize: 50, mb: 1 }} />
          <Typography align="center">{description}</Typography>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

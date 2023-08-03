import { SyntheticEvent, forwardRef } from "react";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useAppSelector } from "@/states/hooks";
import { selectSnackbarState } from "@/app/states/appState";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AppSnackBar = () => {
  const snackBarState = useAppSelector(selectSnackbarState);
  const { hideSnackbar } = useSnackbar();

  const canShowSnackBar = snackBarState.show;

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    hideSnackbar();
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={canShowSnackBar}
      autoHideDuration={5000}
      onClose={handleClose}
      action={action}
      TransitionComponent={TransitionLeft}
    >
      <Alert
        onClose={handleClose}
        severity={snackBarState.severity || "success"}
        sx={{ width: "100%", fontSize: 16, color: "white", opacity: 0.9 }}
      >
        {snackBarState.label}
      </Alert>
    </Snackbar>
  );
};

type TransitionProps = Omit<SlideProps, "direction">;
const TransitionLeft = (props: TransitionProps) => {
  return <Slide {...props} direction="up" />;
};

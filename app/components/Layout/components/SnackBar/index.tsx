import { SyntheticEvent, forwardRef } from "react";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useAppSelector } from "@/states/hooks";
import { selectIsDarkMode, selectSnackbarState } from "@/app/states/appState";

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
      TransitionComponent={Transition}
    >
      <Alert
        onClose={handleClose}
        severity={snackBarState.severity || "success"}
        sx={{
          width: "100%",
          fontSize: 16,
          color: "white",
          opacity: 0.75,
          borderRadius: "4px",
        }}
      >
        {snackBarState.label}
      </Alert>
    </Snackbar>
  );
};

type TransitionProps = Omit<SlideProps, "direction">;
const Transition = (props: TransitionProps) => {
  return <Slide {...props} direction="right" />;
};

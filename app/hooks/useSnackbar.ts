import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { appActions, selectSnackbarState } from "@/app/states/appState";

type SnackbarType = "error" | "warning" | "info" | "success";

export const useSnackbar = () => {
  const appSnackbar = useAppSelector(selectSnackbarState);
  const dispatch = useAppDispatch();

  const showSnackbar = (msg: string, type: SnackbarType) => {
    console.log("showSnackbar");
    dispatch(
      appActions.setSnackbar({
        show: true,
        label: msg,
        severity: type,
      })
    );
  };

  const hideSnackbar = () => {
    dispatch(
      appActions.setSnackbar({
        show: false,
        label: appSnackbar.label,
        severity: appSnackbar.severity,
      })
    );
  };

  return {
    showSuccess: (msg: string) => showSnackbar(msg, "success"),
    showInfo: (msg: string) => showSnackbar(msg, "info"),
    showWarning: (msg: string) => showSnackbar(msg, "warning"),
    showError: (msg: string) => showSnackbar(msg, "error"),
    hideSnackbar,
  };
};

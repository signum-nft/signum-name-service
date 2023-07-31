import { useTranslation } from "next-i18next";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface Props {
  backBtnFn?: () => void;
  nextBtnFn?: () => void;
  isBackBtnDisabled?: boolean;
  isNextBtnDisabled?: boolean;
}

export const NavigationButtons = ({
  backBtnFn,
  nextBtnFn,
  isBackBtnDisabled = true,
  isNextBtnDisabled = true,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      {backBtnFn && (
        <Button
          color="inherit"
          disabled={isBackBtnDisabled}
          onClick={backBtnFn}
          fullWidth
        >
          {t("back")}
        </Button>
      )}

      {nextBtnFn && (
        <Button
          variant="contained"
          color="secondary"
          disabled={isNextBtnDisabled}
          onClick={nextBtnFn}
          fullWidth
          sx={{ color: "white" }}
        >
          {t("next")}
        </Button>
      )}
    </Stack>
  );
};

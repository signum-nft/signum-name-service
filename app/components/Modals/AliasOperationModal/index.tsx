import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import {
  selectAliasOperation,
  portfolioActions,
} from "@/app/states/portfolioState";
import { SuccessfulModal } from "@/app/components/Modals/SuccessfulModal";
import { DataRow } from "@/app/components/DataRow";
import { View } from "./sections/View";
import { Sale } from "./sections/Sale";
import { Edit } from "./sections/Edit";
import { Transfer } from "./sections/Transfer";
import { CancelRenewalFees } from "./sections/CancelRenewalFees";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import BlurCircularIcon from "@mui/icons-material/BlurCircular";

export const AliasOperationModal = () => {
  const { t } = useTranslation();
  const { setAliasOperation } = portfolioActions;
  const dispatch = useAppDispatch();

  const [isOperationCompleted, setIsOperationCompleted] = useState(false);
  const setOperationAsCompleted = () => setIsOperationCompleted(true);

  const aliasOperation = useAppSelector(selectAliasOperation);
  const { show, name, action } = aliasOperation;

  const closeModal = () => {
    dispatch(setAliasOperation({ show: false, id: "", name: "", action: "" }));
    setIsOperationCompleted(false);
  };

  let label = "";
  let successOperationTitle = t("aliasUpdateSuccesfull");
  let successOperationDescription = t("aliasUpdateSuccesfullDescription");

  switch (action) {
    case "view":
      label = t("viewContent");
      break;

    case "edit":
      label = t("editAlias");
      break;

    case "sale":
      label = t("sellAlias");
      break;

    case "transfer":
      label = t("transferAlias");
      successOperationTitle = t("transferAliasSuccesfull");
      successOperationDescription = t("transferAliasSuccesfullDescription");
      break;

    case "cancelRenewalFee":
      label = t("cancelRenewalFee");
      successOperationTitle = t("cancelRenewalFeeAliasSuccesfull");
      successOperationDescription = t(
        "cancelRenewalFeeAliasSuccesfullDescription"
      );
      break;

    default:
      break;
  }

  if (isOperationCompleted) {
    return (
      <SuccessfulModal
        isOpen={isOperationCompleted}
        handleClose={closeModal}
        title={successOperationTitle}
        description={successOperationDescription}
      />
    );
  }

  const dialogMaxWidth = action === "edit" ? "sm" : "xs";

  return (
    <Dialog
      onClose={closeModal}
      open={show}
      fullWidth
      maxWidth={dialogMaxWidth}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          {label}

          <IconButton aria-label="close" onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          flexDirection: "column",
          borderRadius: 0,
        }}
      >
        <DataRow
          icon={<BlurCircularIcon fontSize="small" />}
          label={t("alias")}
          value={name}
        />
      </Paper>

      {action === "view" && <View />}

      {action === "sale" && <Sale onComplete={setOperationAsCompleted} />}

      {action === "edit" && <Edit onComplete={setOperationAsCompleted} />}

      {action === "transfer" && (
        <Transfer onComplete={setOperationAsCompleted} />
      )}

      {action === "cancelRenewalFee" && (
        <CancelRenewalFees onComplete={setOperationAsCompleted} />
      )}
    </Dialog>
  );
};

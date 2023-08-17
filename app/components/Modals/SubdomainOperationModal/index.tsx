import { useTranslation } from "next-i18next";
import { useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { SuccessfulModal } from "@/app/components/Modals/SuccessfulModal";
import { DataRow } from "@/app/components/DataRow";
import { Edit } from "./operations/Edit";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";
import BlurCircularIcon from "@mui/icons-material/BlurCircular";
import { asDomainString } from "@/app/asDomainString";
import { asSubdomainString } from "@/app/asSubdomainString";
import {
  selectSubdomainOperation,
  subdomainOperationsActions,
} from "@/app/states/subdomainOperationState";

export const SubdomainOperationModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isOperationCompleted, setIsOperationCompleted] = useState(false);
  const [newSubdomainName, setNewSubdomainName] = useState("");
  const setOperationAsCompleted = (isCompleted = true) =>
    setIsOperationCompleted(isCompleted);

  const subdomainOperation = useAppSelector(selectSubdomainOperation);

  const closeModal = () => {
    dispatch(subdomainOperationsActions.closeModal());
    setIsOperationCompleted(false);
  };

  let label = "";
  let successOperationTitle = t("aliasUpdateSuccesfull");
  let successOperationDescription = t("aliasUpdateSuccesfullDescription");

  switch (subdomainOperation?.action) {
    case "view":
      label = t("viewContent");
      break;

    case "edit":
      label = t("editSubdomain");
      break;

    case "sale":
      label = t("sellAlias");
      break;

    case "transfer":
      label = t("transferAlias");
      successOperationTitle = t("transferAliasSuccesfull");
      successOperationDescription = t("transferAliasSuccesfullDescription");
      break;

    case "delete":
      label = t("releaseSubDomain");
      successOperationTitle = t("releaseSubDomainSuccessful");
      successOperationDescription = t("releaseSubDomainSuccesfullDescription");
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

  if (!subdomainOperation) return null;

  const {
    action,
    alias: { aliasTld, aliasName, aliasId },
    subdomainName: initialSubdomainName,
  } = subdomainOperation;
  const dialogMaxWidth = action === "edit" ? "sm" : "xs";
  const fullAliasName = asDomainString({ name: aliasName, tld: aliasTld });
  const fullSubdomainName = asSubdomainString({
    subdomain: newSubdomainName ?? initialSubdomainName,
    tld: aliasTld,
    domain: aliasName,
  });

  return (
    <Dialog
      onClose={closeModal}
      open={true}
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
        elevation={3}
        sx={{
          p: 3,
          flexDirection: "column",
          borderRadius: 0,
        }}
      >
        <DataRow
          icon={<BlurCircularIcon fontSize="small" />}
          label={t("alias")}
          value={fullAliasName}
          sx={{ mb: 1 }}
        />
        <DataRow
          icon={<LinkIcon fontSize="small" />}
          label={t("url")}
          value={fullSubdomainName}
        />
      </Paper>

      {/*{action === "view" && <View />}*/}

      {/*{action === "sale" && <Sale onComplete={setOperationAsCompleted} />}*/}

      {subdomainOperation.action === "edit" && (
        <Edit
          onNameChange={setNewSubdomainName}
          onComplete={setOperationAsCompleted}
          onCancel={closeModal}
          aliasId={aliasId}
        />
      )}

      {/*{action === "transfer" && (*/}
      {/*  <Transfer onComplete={setOperationAsCompleted} />*/}
      {/*)}*/}

      {/*{action === "delete" && (*/}
      {/*  <CancelRenewalFees onComplete={setOperationAsCompleted} />*/}
      {/*)}*/}
    </Dialog>
  );
};

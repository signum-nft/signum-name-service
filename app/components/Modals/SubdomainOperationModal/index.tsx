import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { SuccessfulModal } from "@/app/components/Modals/SuccessfulModal";
import { DataRow } from "@/app/components/DataRow";

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
import { appActions } from "@/app/states/appState";
import { Add } from "./operations/Add";
import { Delete } from "./operations/Delete";
import { View } from "./operations/View";
import { Unlink } from "./operations/Unlink";
import { Convert } from "./operations/Convert";
import { Edit } from "./operations/Edit";
import { EditDomain } from "./operations/EditDomain";
import { DeleteDomain } from "./operations/DeleteDomain";
import { UnlinkDomain } from "./operations/UnlinkDomain";

export const SubdomainOperationModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isOperationCompleted, setIsOperationCompleted] = useState(false);
  const [newSubdomainName, setNewSubdomainName] = useState("");
  const setOperationAsCompleted = (isCompleted = true) =>
    setIsOperationCompleted(isCompleted);

  const subdomainOperation = useAppSelector(selectSubdomainOperation);

  useEffect(() => {
    if (subdomainOperation) {
      setNewSubdomainName(subdomainOperation.subdomainName);
    }
  }, [subdomainOperation]);
  const closeModal = () => {
    dispatch(subdomainOperationsActions.closeModal());
    setIsOperationCompleted(false);
  };

  let label = "";
  let successOperationTitle = t("aliasUpdateSuccesfull");
  let successOperationDescription = t("aliasUpdateSuccesfullDescription");
  let shouldShowConfettiExplosion = false;
  switch (subdomainOperation?.action) {
    case "add":
      label = t("createSubdomain");
      successOperationTitle = t("addedSubdomainSuccessfully");
      successOperationDescription = t("addedSubdomainSuccessfullyDescription", {
        subdomain: subdomainOperation?.subdomainName,
        domain: subdomainOperation?.domainName,
      });
      shouldShowConfettiExplosion = true;
      break;
    case "view":
      label = t("viewContent");
      break;
    case "edit":
      label = t("editSubdomain");
      break;
    case "edit-domain":
      label = t("editDomain");
      break;
    case "delete-domain":
      label = t("deleteDomain");
      shouldShowConfettiExplosion = true;
      break;
    case "delete":
      label = t("releaseSubdomain");
      successOperationTitle = t("releaseSubdomainSuccessful");
      successOperationDescription = t("releaseSubdomainSuccessfulDescription");
      shouldShowConfettiExplosion = true;
      break;
    case "unlink-domain":
    case "unlink":
      label = t("unlinkTitle", {
        domain: subdomainOperation.domainName,
      });
      break;
    case "convert":
      label = t("convertToSubdomainTitle", {
        domain: subdomainOperation.domainName,
      });
      shouldShowConfettiExplosion = true;
      break;

    default:
      break;
  }

  if (isOperationCompleted) {
    if (shouldShowConfettiExplosion) {
      dispatch(appActions.showConfettiExplosion(true));
    }

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
    alias: { aliasTld, aliasName },
    subdomainName: initialSubdomainName,
    domainName,
  } = subdomainOperation;

  const fullAliasName = asDomainString({ name: aliasName, tld: aliasTld });
  const fullSubdomainName = asSubdomainString({
    subdomain: newSubdomainName ?? initialSubdomainName,
    tld: aliasTld,
    domain: domainName,
  });

  return (
    <Dialog
      onClose={closeModal}
      open={true}
      fullWidth
      maxWidth="sm"
      sx={{ opacity: { sx: 1, md: 0.97 } }}
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
        {action !== "convert" && (
          <DataRow
            icon={<LinkIcon fontSize="small" />}
            label={t("url")}
            value={`https://${fullSubdomainName}`}
          />
        )}
      </Paper>

      {action === "view" && <View subdomainOperation={subdomainOperation} />}

      {action === "unlink" && (
        <Unlink
          subdomainOperation={subdomainOperation}
          onComplete={setOperationAsCompleted}
          onCancel={closeModal}
        />
      )}

      {action === "unlink-domain" && (
        <UnlinkDomain
          subdomainOperation={subdomainOperation}
          onComplete={setOperationAsCompleted}
          onCancel={closeModal}
        />
      )}

      {subdomainOperation.action === "add" && (
        <Add
          onNameChange={setNewSubdomainName}
          onComplete={setOperationAsCompleted}
          onCancel={closeModal}
          subdomainOperation={subdomainOperation}
        />
      )}
      {subdomainOperation.action === "edit" && (
        <Edit
          onNameChange={setNewSubdomainName}
          onComplete={setOperationAsCompleted}
          onCancel={closeModal}
          subdomainOperation={subdomainOperation}
        />
      )}

      {subdomainOperation.action === "edit-domain" && (
        <EditDomain
          onComplete={setOperationAsCompleted}
          onCancel={closeModal}
          subdomainOperation={subdomainOperation}
        />
      )}
      {subdomainOperation.action === "delete" && (
        <Delete
          onComplete={setOperationAsCompleted}
          onCancel={closeModal}
          subdomainOperation={subdomainOperation}
        />
      )}
      {subdomainOperation.action === "delete-domain" && (
        <DeleteDomain
          onComplete={setOperationAsCompleted}
          onCancel={closeModal}
          subdomainOperation={subdomainOperation}
        />
      )}
      {subdomainOperation.action === "convert" && (
        <Convert
          onComplete={setOperationAsCompleted}
          onCancel={closeModal}
          subdomainOperation={subdomainOperation}
        />
      )}
    </Dialog>
  );
};

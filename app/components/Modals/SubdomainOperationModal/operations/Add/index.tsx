import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
  useFormContext,
} from "react-hook-form";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { useAlias } from "@/app/hooks/useAlias";

import DialogContent from "@mui/material/DialogContent";
import { mapValidationError } from "@/app/mapValidationError";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import Button from "@mui/material/Button";
import { SubdomainEditForm } from "../../components/SubdomainEditForm";
import { LinkageForm } from "@/app/components/Modals/SubdomainOperationModal/components/LinkageForm";
import { AliasProxy } from "@/app/types/aliasProxy";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import Box from "@mui/material/Box";

interface Props {
  onComplete: (ok: boolean) => void;
  onCancel: () => void;
  subdomainOperation: SubdomainOperation;
  onNameChange: (newName: string) => void;
}

interface FormData {
  name: string;
  url: string;
  account: string;
}

export const Add = ({
  onComplete,
  onCancel,
  subdomainOperation,
  onNameChange,
}: Props) => {
  useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  useForm<FormData>({ mode: "onChange" });
  const { t } = useTranslation();
  const [newName, setNewName] = useState("");
  const handleNameChange = (newName: string) => {
    setNewName(newName);
    onNameChange(newName);
  };

  return (
    <DialogContent>
      <Box sx={{ position: "absolute", top: "3rem", right: "1.5rem" }}>
        <Typography fontSize={10} color="text.secondary">
          {t("stepOf", { step: currentStep + 1, maxStep: 2 })}
        </Typography>
      </Box>
      {currentStep === 0 && (
        <SubdomainEditForm
          onCancel={onCancel}
          onComplete={() => setCurrentStep(1)}
          onNameChange={handleNameChange}
          subdomainOperation={subdomainOperation}
        />
      )}
      {currentStep === 1 && (
        <LinkageForm
          onComplete={onComplete}
          subdomainOperation={subdomainOperation}
          newName={newName}
        />
      )}
    </DialogContent>
  );
};

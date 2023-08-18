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

interface Props {
  onComplete: () => void;
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

  return (
    <DialogContent>
      {currentStep === 0 && (
        <SubdomainEditForm
          onCancel={onCancel}
          onComplete={() => setCurrentStep(1)}
          onNameChange={onNameChange}
          subdomainOperation={subdomainOperation}
        />
      )}
      {currentStep === 1 && (
        <LinkageForm
          onComplete={onComplete}
          subdomainOperation={subdomainOperation}
        />
      )}
    </DialogContent>
  );
};

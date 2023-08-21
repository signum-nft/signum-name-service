import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/states/hooks";

import DialogContent from "@mui/material/DialogContent";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { SubdomainEditForm } from "../../components/SubdomainEditForm";
import { LinkageForm } from "@/app/components/Modals/SubdomainOperationModal/components/LinkageForm";
import Typography from "@mui/material/Typography";
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
          onComplete={(ok) => (ok ? setCurrentStep(1) : onCancel())}
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

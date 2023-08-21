import { useTranslation } from "next-i18next";
import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { DeleteForm } from "./DeleteForm";
import { DelinkageForm } from "../../components/DelinkageForm";

interface Props {
  onComplete: () => void;
  onCancel: () => void;
  subdomainOperation: SubdomainOperation;
}

export const Delete = ({ onComplete, subdomainOperation, onCancel }: Props) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <DialogContent>
      <Box sx={{ position: "absolute", top: "3rem", right: "1.5rem" }}>
        <Typography fontSize={10} color="text.secondary">
          {t("stepOf", { step: currentStep + 1, maxStep: 2 })}
        </Typography>
      </Box>
      {currentStep === 0 && (
        <DeleteForm
          onCancel={onCancel}
          onComplete={(ok) => (ok ? setCurrentStep(1) : onCancel())}
          subdomainOperation={subdomainOperation}
        />
      )}
      {currentStep === 1 && (
        <DelinkageForm
          onComplete={onComplete}
          subdomainOperation={subdomainOperation}
        />
      )}
    </DialogContent>
  );
};

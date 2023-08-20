import { useTranslation } from "next-i18next";
import { useMemo, useState } from "react";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { selectAliasOperation } from "@/app/states/portfolioState";
import {
  transactionActions,
  selectMonitoredTransactions,
} from "@/app/states/transactionState";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { SubdomainEditForm } from "@/app/components/Modals/SubdomainOperationModal/components/SubdomainEditForm";
import { LinkageForm } from "@/app/components/Modals/SubdomainOperationModal/components/LinkageForm";
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
          onComplete={() => setCurrentStep(1)}
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

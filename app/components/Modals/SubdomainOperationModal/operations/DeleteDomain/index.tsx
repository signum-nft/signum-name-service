import { useTranslation } from "next-i18next";
import DialogContent from "@mui/material/DialogContent";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { DeleteForm } from "./DeleteForm";

interface Props {
  onComplete: (ok?: boolean) => void;
  onCancel: () => void;
  subdomainOperation: SubdomainOperation;
}

export const DeleteDomain = ({
  onComplete,
  subdomainOperation,
  onCancel,
}: Props) => {
  return (
    <DialogContent>
      <DeleteForm
        onCancel={onCancel}
        onComplete={onComplete}
        subdomainOperation={subdomainOperation}
      />
    </DialogContent>
  );
};

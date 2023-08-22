import DialogContent from "@mui/material/DialogContent";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { ConvertForm } from "@/app/components/Modals/SubdomainOperationModal/operations/Convert/ConvertForm";

interface Props {
  onComplete: () => void;
  onCancel: () => void;
  subdomainOperation: SubdomainOperation;
}
export const Convert = ({
  onComplete,
  onCancel,
  subdomainOperation,
}: Props) => {
  return (
    <DialogContent>
      <ConvertForm
        subdomainOperation={subdomainOperation}
        onComplete={onComplete}
        onCancel={onCancel}
      />
    </DialogContent>
  );
};

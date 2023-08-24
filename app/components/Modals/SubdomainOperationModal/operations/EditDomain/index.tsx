import DialogContent from "@mui/material/DialogContent";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { DomainEditForm } from "@/app/components/Modals/SubdomainOperationModal/components/DomainEditForm";

interface Props {
  onComplete: () => void;
  onCancel: () => void;
  subdomainOperation: SubdomainOperation;
}
export const EditDomain = ({
  onComplete,
  onCancel,
  subdomainOperation,
}: Props) => {
  return (
    <DialogContent>
      <DomainEditForm
        onComplete={onComplete}
        onCancel={onCancel}
        subdomainOperation={subdomainOperation}
      />
    </DialogContent>
  );
};

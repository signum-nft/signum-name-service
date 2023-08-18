import DialogContent from "@mui/material/DialogContent";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { SubdomainEditForm } from "../../components/SubdomainEditForm";

interface Props {
  onComplete: () => void;
  onCancel: () => void;
  subdomainOperation: SubdomainOperation;
  onNameChange: (newName: string) => void;
}
export const Edit = ({
  onComplete,
  onCancel,
  subdomainOperation,
  onNameChange,
}: Props) => {
  return (
    <DialogContent>
      <SubdomainEditForm
        onCancel={onCancel}
        onComplete={onComplete}
        onNameChange={onNameChange}
        subdomainOperation={subdomainOperation}
      />
    </DialogContent>
  );
};

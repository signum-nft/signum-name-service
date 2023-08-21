import DialogContent from "@mui/material/DialogContent";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { DelinkageForm } from "../../components/DelinkageForm";

interface Props {
  onComplete: () => void;
  onCancel: () => void;
  subdomainOperation: SubdomainOperation;
}

export const Unlink = ({ onComplete, subdomainOperation, onCancel }: Props) => {
  return (
    <DialogContent>
      <DelinkageForm
        onComplete={onComplete}
        subdomainOperation={subdomainOperation}
        onCancel={onCancel}
      />
    </DialogContent>
  );
};

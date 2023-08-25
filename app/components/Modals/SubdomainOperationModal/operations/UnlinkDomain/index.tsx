import DialogContent from "@mui/material/DialogContent";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";
import { UnlinkDomainForm } from "./UnlinkDomainForm";

interface Props {
  onComplete: () => void;
  onCancel: () => void;
  subdomainOperation: SubdomainOperation;
}

export const UnlinkDomain = ({
  onComplete,
  subdomainOperation,
  onCancel,
}: Props) => {
  return (
    <DialogContent>
      <UnlinkDomainForm
        onComplete={onComplete}
        subdomainOperation={subdomainOperation}
        onCancel={onCancel}
      />
    </DialogContent>
  );
};

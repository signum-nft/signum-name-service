import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { selectAliasOperation } from "@/app/states/portfolioState";
import { transactionActions } from "@/app/states/transactionState";
import { useAlias } from "@/app/hooks/useAlias";
import { asAccountId } from "@/app/asAccountId";
import { TextLabel } from "@/app/components/TextLabel";
import { AccountAddressField } from "@/app/components/AccountAddressField";
import { mapValidationError } from "@/app/mapValidationError";
import { TransferAlias } from "../../validation/types";
import { transferAliasSchema } from "../../validation/schemas";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";

interface Props {
  onComplete: () => void;
}

export const Transfer = ({ onComplete }: Props) => {
  const { t } = useTranslation();
  const { ledgerService } = useLedgerService();
  const { showError } = useSnackbar();
  const dispatch = useAppDispatch();

  const [isAddressValid, setIsAddressValid] = useState(false);

  const aliasOperation = useAppSelector(selectAliasOperation);
  const { id } = aliasOperation;
  const { alias } = useAlias(id);

  const methods = useForm<TransferAlias>({
    mode: "onChange",
    resolver: yupResolver(transferAliasSchema),
    defaultValues: { receiverAddress: "" },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<TransferAlias> = async (data) => {
    if (!ledgerService || !alias) return;

    try {
      const recipient = asAccountId(data.receiverAddress) || "";

      const confirmation = await ledgerService.alias
        .with(alias)
        .transferAlias(recipient);

      // @ts-ignore
      const transactionId = confirmation?.transactionId || undefined;

      if (transactionId) {
        dispatch(
          transactionActions.addMonitor({
            transactionId,
            referenceId: id,
            type: "alias-transfer",
          })
        );

        onComplete();
      }
    } catch (e: any) {
      showError(t(e.message));
    }
  };

  const receiverAddress = watch("receiverAddress");

  let receiverAddressFieldError = "";

  // Normal validation
  if (errors.receiverAddress?.message) {
    receiverAddressFieldError = t(
      mapValidationError(errors.receiverAddress?.message)
    );
  }

  const canSubmitTransferAlias = !!(
    receiverAddress &&
    isAddressValid &&
    !receiverAddressFieldError
  );

  return (
    <Box>
      <DialogContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextLabel text={t("account")} required />
            <Typography variant="body2" gutterBottom>
              {t("transferAliasFieldDescription")}
            </Typography>

            <AccountAddressField
              isAddressValid={isAddressValid}
              setIsAccountValid={setIsAddressValid}
            />

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ color: "white" }}
              fullWidth
              disabled={!canSubmitTransferAlias}
            >
              {t("continue")}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Box>
  );
};

import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { DescriptorDataBuilder } from "@signumjs/standards";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { transactionActions } from "@/app/states/transactionState";
import { asAccountId } from "@/app/asAccountId";
import { selectAliasOperation } from "@/app/states/portfolioState";
import { useAlias } from "@/app/hooks/useAlias";
import { AliasUpdateMode } from "@/app/types/aliasUpdateMode";
import { editAliasSchema } from "../../validation/schemas";
import { EditAlias } from "../../validation/types";
import { TypeSelector } from "./sections/TypeSelector";
import { AccountForm } from "./sections/AccountForm";
import { LinkForm } from "./sections/LinkForm";
import { StandardContentForm } from "./sections/StandardContentForm";
import { FreestyleContentForm } from "./sections/FreestyleContentForm";

import DialogContent from "@mui/material/DialogContent";

interface Props {
  onComplete: () => void;
}

enum Steps {
  TypeSelection,
  Form,
}

export const Edit = ({ onComplete }: Props) => {
  const { t } = useTranslation();
  const { ledgerService } = useLedgerService();
  const { showError } = useSnackbar();
  const dispatch = useAppDispatch();

  const [activeStep, updateActiveStep] = useState(Steps.TypeSelection);
  const openTypeSelectionStep = () => updateActiveStep(Steps.TypeSelection);
  const openFormStep = () => updateActiveStep(Steps.Form);

  const [updateMode, SetUpdateMode] = useState<AliasUpdateMode>("");

  const aliasOperation = useAppSelector(selectAliasOperation);
  const { id } = aliasOperation;
  const { alias } = useAlias(id);

  const defaultFormData = {
    type: "",
    name: "",
    description: "",
    canInsertAvatar: false,
    avatar: "",
    avatarMimeType: "",
    canInsertHomePage: false,
    homePage: "",
    canInsertReceiverAddress: false,
    receiverAddress: "",
    canInsertSocialNetwork: false,
    socialNetworks: [],
    canInsertSendRule: false,
    sendRule: "",
    customContent: "",
  };

  const methods = useForm<EditAlias>({
    mode: "onChange",
    resolver: yupResolver(editAliasSchema),
    // @ts-ignore
    defaultValues: defaultFormData,
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    // @ts-ignore
    reset(defaultFormData);
  }, [activeStep, reset]);

  const onSubmit: SubmitHandler<EditAlias> = async (data) => {
    if (activeStep === Steps.TypeSelection || !ledgerService || !alias) return;

    // Process and format data inputted by user
    const payload = {
      ...data,
      receiverAddress: asAccountId(data.receiverAddress) || "",
      socialNetworks: data.socialNetworks.map((network) => network.url),
    };

    let confirmation: any = null;
    let referenceId = "";

    try {
      switch (updateMode) {
        // Set SRC-44 compliant content
        case "account":
        case "link":
        case "standard":
          const descriptorData = DescriptorDataBuilder.create(
            payload.name || undefined
          );

          if (payload.type) descriptorData.setType(payload.type);

          if (payload.description)
            descriptorData.setDescription(payload.description);

          if (payload.avatar && payload.avatarMimeType)
            descriptorData.setAvatar(payload.avatar, payload.avatarMimeType);

          if (payload.homePage) descriptorData.setHomePage(payload.homePage);

          if (payload.sendRule) descriptorData.setSendRule(payload.sendRule);

          if (payload.socialNetworks.length)
            descriptorData.setSocialMediaLinks(payload.socialNetworks);

          if (payload.receiverAddress)
            descriptorData.setAccount(payload.receiverAddress);

          confirmation = await ledgerService.alias
            .with(alias)
            .updateAliasProfile(descriptorData.build());

          referenceId = alias.alias;
          break;

        // Freestyle content
        case "freestyle":
          confirmation = await ledgerService.alias
            .with(alias)
            .updateAlias(payload.customContent);

          referenceId = alias.alias;
          break;

        default:
          break;
      }

      if (confirmation && confirmation.transactionId) {
        dispatch(
          transactionActions.addMonitor({
            transactionId: confirmation.transactionId,
            referenceId,
            type: "alias-content-update",
          })
        );

        onComplete();
      }
    } catch (e: any) {
      showError(t(e.message || e));
    }
  };

  return (
    <DialogContent>
      {activeStep === Steps.TypeSelection && (
        <TypeSelector
          updateMode={updateMode}
          onChangeType={SetUpdateMode}
          onSubmit={openFormStep}
        />
      )}

      {activeStep === Steps.Form && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {updateMode === "account" && (
              <AccountForm onCancel={openTypeSelectionStep} />
            )}

            {updateMode === "link" && (
              <LinkForm onCancel={openTypeSelectionStep} />
            )}

            {updateMode === "standard" && (
              <StandardContentForm id={id} onCancel={openTypeSelectionStep} />
            )}

            {updateMode === "freestyle" && (
              <FreestyleContentForm onCancel={openTypeSelectionStep} />
            )}
          </form>
        </FormProvider>
      )}
    </DialogContent>
  );
};

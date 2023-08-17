import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { Amount } from "@signumjs/util";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlias } from "@/app/hooks/useAlias";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { selectAliasOperation } from "@/app/states/portfolioState";
import { transactionActions } from "@/app/states/transactionState";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { LoadingIndicator } from "@/app/components/LoadingIndicator";
import { Divider } from "@/app/components/Divider";
import { CardTypeSelector } from "@/app/components/CardTypeSelector";
import { NumericField } from "@/app/components/NumericField";
import { asAccountId } from "@/app/asAccountId";
import { TextLabel } from "@/app/components/TextLabel";
import { AccountAddressField } from "@/app/components/AccountAddressField";
import { mapValidationError } from "@/app/mapValidationError";
import { SellAlias } from "../../validation/types";
import { sellAliasSchema } from "../../validation/schemas";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import DialogContent from "@mui/material/DialogContent";
import PublicIcon from "@mui/icons-material/Public";
import PortraitIcon from "@mui/icons-material/Portrait";
import SellIcon from "@mui/icons-material/Sell";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface Props {
  onComplete: () => void;
}

export const Sale = ({ onComplete }: Props) => {
  const { t } = useTranslation();
  const { ledgerService } = useLedgerService();
  const { showError } = useSnackbar();
  const dispatch = useAppDispatch();

  const [isAddressValid, setIsAddressValid] = useState(false);
  const [listingMode, setListingMode] = useState<"public" | "private">(
    "public"
  );
  const activatePublicMode = () => setListingMode("public");
  const activatePrivateMode = () => setListingMode("private");

  const aliasOperation = useAppSelector(selectAliasOperation);
  const { id } = aliasOperation;
  const { alias, isLoading } = useAlias(id);

  const methods = useForm<SellAlias>({
    mode: "onChange",
    resolver: yupResolver(sellAliasSchema),
    defaultValues: {
      price: "",
      receiverAddress: "",
    },
  });

  const {
    control,
    watch,
    handleSubmit,
    resetField,
    clearErrors,
    setValue,
    formState: { errors },
  } = methods;

  const price = watch("price");
  const receiverAddress = watch("receiverAddress");

  const onSubmit: SubmitHandler<SellAlias> = async (data) => {
    if (!ledgerService || !alias) return;

    const payload = {
      price: Amount.fromSigna(data.price).getPlanck(),
      accountId: asAccountId(data.receiverAddress) || "",
    };

    let confirmation: any = null;
    const referenceId = alias.alias;

    try {
      switch (listingMode) {
        case "public":
          confirmation = await ledgerService.alias
            .with(alias)
            .setAliasOnSale(payload.price);
          break;

        case "private":
          confirmation = await ledgerService.alias
            .with(alias)
            .setAliasOnSaleForSingleAccount(payload.price, payload.accountId);
          break;

        default:
          break;
      }

      if (confirmation && confirmation.transactionId) {
        dispatch(
          transactionActions.addMonitor({
            transactionId: confirmation.transactionId,
            referenceId,
            type: "alias-sale-update",
          })
        );

        onComplete();
      }
    } catch (e: any) {
      showError(t(e.message));
    }
  };

  useEffect(() => {
    if (alias && alias.priceNQT) {
      setValue("price", Amount.fromPlanck(alias.priceNQT).getSigna());

      if (alias.buyer && listingMode === "private") {
        setValue("receiverAddress", alias.buyer);
      }

      return;
    }

    clearErrors("price");
    resetField("receiverAddress");
    clearErrors("receiverAddress");
    setIsAddressValid(false);
  }, [listingMode, clearErrors, resetField]);

  let priceFieldError = "";

  if (errors.price?.message) {
    priceFieldError = t(mapValidationError(errors.price?.message));
  }

  let canBlockSubmit = false;

  if (listingMode === "public" && (!price || priceFieldError)) {
    canBlockSubmit = true;
  }

  if (
    listingMode === "private" &&
    (!price ||
      priceFieldError ||
      !isAddressValid ||
      !receiverAddress ||
      errors.receiverAddress?.message)
  ) {
    canBlockSubmit = true;
  }

  return (
    <DialogContent>
      {isLoading && <LoadingIndicator height={200} />}

      {!isLoading && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography align="center" gutterBottom>
              {t("howWouldYouLikeToSellAlias")}
            </Typography>

            <Grid container justifyContent="center" mb={2} spacing={2}>
              <Grid item xs={12} sm={6}>
                <CardTypeSelector
                  icon={<PublicIcon />}
                  label={t("publicSale")}
                  type="public"
                  active={listingMode}
                  onClick={activatePublicMode}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CardTypeSelector
                  icon={<PortraitIcon />}
                  label={t("privateSale")}
                  type="private"
                  active={listingMode}
                  onClick={activatePrivateMode}
                />
              </Grid>
            </Grid>

            <Typography align="center" variant="body2" color="textSecondary">
              {t(
                listingMode === "public"
                  ? "aliasPublicSaleDescription"
                  : "aliasPrivateSaleDescription"
              )}
            </Typography>

            <Divider />

            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <NumericField
                  field={field}
                  label={t("price")}
                  sx={{ mb: 2 }}
                  helperText={priceFieldError}
                  error={!!priceFieldError}
                />
              )}
            />

            <Collapse in={listingMode === "private"}>
              <Stack direction="column">
                <TextLabel text={t("receiverAddress")} required gutterBottom />
                <AccountAddressField
                  isAddressValid={isAddressValid}
                  setIsAccountValid={setIsAddressValid}
                />
              </Stack>
            </Collapse>

            <Alert severity="warning" sx={{ mb: 2 }}>
              <AlertTitle>{t("notice")}</AlertTitle>
              {t("aliasSaleNotice")}
            </Alert>

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={canBlockSubmit}
              sx={{ color: "white" }}
              fullWidth
              startIcon={<SellIcon />}
            >
              {t("sell")}
            </Button>
          </form>
        </FormProvider>
      )}
    </DialogContent>
  );
};

import { useTranslation } from "next-i18next";
import { useFormContext, Controller } from "react-hook-form";
import debounce from "lodash/debounce";
import { useRef, useEffect, useState } from "react";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { useAccount } from "@/app/hooks/useAccount";
import { asAccountId } from "@/app/asAccountId";
import { asRSAddress } from "@/app/asRSAddress";
import { mapValidationError } from "@/app/mapValidationError";

import TextField from "@mui/material/TextField";

interface Props {
  name?: string;
  isAddressValid: boolean;
  setIsAccountValid: (value: boolean) => void;
  allowSelfAddress?: boolean;
}

export const AccountAddressField = ({
  name = "receiverAddress",
  isAddressValid,
  setIsAccountValid,
  allowSelfAddress,
}: Props) => {
  const { t } = useTranslation();
  const { ledgerService } = useLedgerService();
  const { accountId } = useAccount();

  const [receiverAddressFieldError, setReceiverAddressFieldError] =
    useState("");

  const [receiverAddressHelperText, setReceiverAddressHelperText] =
    useState("");

  const debouncedCheckAccountFn = useRef<any>();

  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<any>();

  const receiverAddress = watch(name);

  useEffect(() => {
    return () => {
      debouncedCheckAccountFn.current?.cancel();
    };
  }, []);

  useEffect(() => {
    if (!receiverAddress || !debouncedCheckAccountFn.current) return;

    const accountAddressId = asAccountId(receiverAddress);

    debouncedCheckAccountFn.current(accountAddressId);
  }, [receiverAddress]);

  useEffect(() => {
    debouncedCheckAccountFn.current = debounce((account: string) => {
      if (!account) {
        setIsAccountValid(false);
        return;
      }

      ledgerService?.account.exists(account).then((exists: boolean) => {
        setIsAccountValid(exists);
      });
    }, 300);
  }, [ledgerService, setIsAccountValid]);

  useEffect(() => {
    if (receiverAddress && errors[name]?.message) {
      setIsAccountValid(false);

      return setReceiverAddressFieldError(
        t(mapValidationError(errors.receiverAddress?.message))
      );
    }
  }, [receiverAddress, errors, name, setIsAccountValid, t]);

  useEffect(() => {
    const invalidAddressFeedback = () => {
      setIsAccountValid(false);
      return setReceiverAddressFieldError(t("invalidAddress"));
    };

    if (receiverAddress) {
      const receiverAccountId = asAccountId(receiverAddress);
      const isOwnAccount = accountId == receiverAccountId;

      if (!receiverAccountId || receiverAccountId == "0") {
        return invalidAddressFeedback();
      }

      if (isOwnAccount && !allowSelfAddress) {
        setIsAccountValid(false);
        return setReceiverAddressFieldError(t("selfAccount"));
      }

      if (isAddressValid) {
        setReceiverAddressFieldError("");

        const successHelperText =
          allowSelfAddress && isOwnAccount
            ? `${t("selfAccount")} ✅`
            : `${asRSAddress(receiverAccountId)} (ID:${receiverAccountId}) ✅`;

        return setReceiverAddressHelperText(successHelperText);
      } else {
        return invalidAddressFeedback();
      }
    } else {
      setReceiverAddressHelperText("");
    }
  }, [isAddressValid, receiverAddress, accountId, allowSelfAddress]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          onChange={(e) => field.onChange(e.target.value.toLocaleUpperCase())}
          fullWidth
          autoComplete="off"
          label={t("addressOrAccountId")}
          variant="outlined"
          color="secondary"
          placeholder={t("example") + " S-6SJC-..., 17332"}
          helperText={receiverAddressFieldError || receiverAddressHelperText}
          error={!!receiverAddressFieldError}
          sx={{ mb: 2 }}
          inputProps={{
            maxLength: 32,
          }}
          InputLabelProps={{ shrink: !!field.value }}
        />
      )}
    />
  );
};

import { useTranslation } from "next-i18next";
import { useFormContext, Controller } from "react-hook-form";
import { debounce } from "lodash";
import { useRef, useEffect } from "react";
import { useLedgerService } from "@/app/hooks/useLedgerService";

import TextField from "@mui/material/TextField";

interface Props {
  name: string;
  fieldError: string;
  setIsTokenValid: (value: boolean) => void;
}

export const TokenIdField = ({ name, fieldError, setIsTokenValid }: Props) => {
  const { t } = useTranslation();
  const { ledgerService } = useLedgerService();

  const debouncedCheckAccountFn = useRef<any>();

  const { control, watch } = useFormContext<any>();

  const tokenId = watch(name);

  useEffect(() => {
    return () => {
      debouncedCheckAccountFn.current &&
        debouncedCheckAccountFn.current.cancel();
    };
  }, []);

  useEffect(() => {
    if (!tokenId) return;
    if (!debouncedCheckAccountFn.current) return;
    debouncedCheckAccountFn?.current(tokenId);
  }, [tokenId]);

  useEffect(() => {
    debouncedCheckAccountFn.current = debounce((token: string) => {
      if (!token) {
        setIsTokenValid(false);
        return;
      }

      ledgerService?.token.exists(token).then((exists: boolean) => {
        setIsTokenValid(exists);
      });
    }, 300);
  }, [ledgerService]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          autoComplete="off"
          placeholder={t("typeTokenOrAssetId")}
          label={t("typeTokenOrAssetId")}
          variant="outlined"
          color="secondary"
          helperText={fieldError}
          error={!!fieldError}
        />
      )}
    />
  );
};

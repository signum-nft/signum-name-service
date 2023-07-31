import { useTranslation } from "next-i18next";
import { NumericFormat } from "react-number-format";
import { languageSeparators } from "../../../next-i18next.config";
import TextField from "@mui/material/TextField";

export const NumericField = ({ field, ...rest }: any) => {
  const {
    i18n: { language },
  } = useTranslation();

  const format = languageSeparators.get(language || "en");

  return (
    <NumericFormat
      {...field}
      customInput={TextField}
      valueIsNumericString
      allowNegative={false}
      // @ts-ignore
      ref={undefined}
      inputRef={field.ref}
      allowLeadingZeros
      onChange={undefined}
      onValueChange={(values) => field.onChange(values.floatValue)}
      thousandSeparator={format?.thousand || ","}
      decimalSeparator={format?.decimal || "."}
      decimalScale={8}
      fullWidth
      autoComplete="off"
      variant="outlined"
      color="secondary"
      {...rest}
    />
  );
};

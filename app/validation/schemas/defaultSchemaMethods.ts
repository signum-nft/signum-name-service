import * as yup from "yup";

export const transformNumber = (_: any, val: any) => (val ? Number(val) : null);

export const booleanField = yup.boolean();

export const requiredNumberFieldDefaultZero = yup
  .number()
  .required("required")
  .min(0)
  .default(0)
  .nullable()
  .transform(transformNumber);

export const requiredNumberField = yup
  .number()
  .required("required")
  .positive("positive")
  .nullable()
  .transform(transformNumber);

export const optionalNumberField = yup
  .number()
  .positive("positive")
  .nullable()
  .transform(transformNumber);

export const requiredStringField = yup.string().required("required").trim();

export const optionalStringField = yup.string().nullable().trim();

export const requiredUrlField = yup.string().url().required("required").trim();

export const optionalUrlField = yup.string().url().nullable().trim();

export const requiredWhenValueIsTrue = (
  name: string,
  method: yup.AnySchema<string | number | null | undefined>
) => {
  return method.when(name, {
    is: true,
    then: (schema) => schema.required("required"),
  });
};

// Patterns for decimal places
export const decimalsAllowed = (
  decimals: number,
  method: yup.AnySchema<number | null | undefined>
) => {
  const decimalsPattern = new RegExp("^\\d+(\\.\\d{0," + decimals + "})?$", "");

  // @ts-ignore
  if (method && decimals === 0) return method.integer();

  // Made this conditional for singular decimal
  if (method && decimals == 1)
    return method.test({
      name: "one-decimal-validation",
      exclusive: true,
      message: "oneDecimalAllowed",
      test: (val: any) => (val != undefined ? decimalsPattern.test(val) : true),
    });

  return method.test({
    name: "decimal-validation",
    exclusive: true,
    message: { key: "maximumDecimalAllowed", value: decimals },
    test: (val: any) => (val != undefined ? decimalsPattern.test(val) : true),
  });
};

import * as yup from "yup";

import { requiredStringField } from "@/app/validation/schemas/defaultSchemaMethods";

import "@/app/validation/schemas/defaultSchema";

export const searchAliasSchema = yup
  .object({
    searchAlias: requiredStringField
      .min(3)
      .max(141)
      .trim()
      .matches(/^\w+(\.\w+)?$/),
  })
  .required();

import * as yup from "yup";

import {
  requiredNumberField,
  optionalStringField,
  optionalUrlField,
  requiredUrlField,
  booleanField,
  requiredWhenValueIsTrue,
} from "@/app/validation/schemas/defaultSchemaMethods";

import "@/app/validation/schemas/defaultSchema";

const socialNetworkSchema = yup
  .object({
    url: requiredUrlField.max(92),
  })
  .required();

export const editAliasSchema = yup
  .object({
    type: optionalStringField,
    name: optionalStringField.max(24),
    description: optionalStringField.max(384),

    canInsertAvatar: booleanField,
    avatar: requiredWhenValueIsTrue("canInsertAvatar", optionalStringField),
    avatarMimeType: requiredWhenValueIsTrue(
      "canInsertAvatar",
      optionalStringField
    ),

    canInsertHomePage: booleanField,
    homePage: requiredWhenValueIsTrue(
      "canInsertHomePage",
      optionalUrlField.max(128)
    ),

    canInsertSocialNetwork: booleanField,
    socialNetworks: yup
      .array()
      .of(socialNetworkSchema)
      .max(3)
      .when("canInsertSocialNetwork", {
        is: true,
        then: (schema) => schema.required("required"),
      }),

    canInsertReceiverAddress: booleanField,
    receiverAddress: requiredWhenValueIsTrue(
      "canInsertReceiverAddress",
      optionalStringField.uppercase()
    ),

    canInsertSendRule: booleanField,
    sendRule: requiredWhenValueIsTrue(
      "canInsertSendRule",
      optionalStringField.max(64)
    ),

    customContent: optionalStringField.max(1000),
  })
  .required();

export const sellAliasSchema = yup
  .object({
    price: requiredNumberField,
    receiverAddress: optionalStringField.uppercase(),
  })
  .required();

export const transferAliasSchema = yup
  .object({
    receiverAddress: optionalStringField.uppercase(),
  })
  .required();

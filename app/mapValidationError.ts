import { formatAmount } from "@/app/formatAmount";

export const mapValidationError = (message: any, getValue?: boolean): any => {
  if (typeof message === "object" && getValue)
    return { value: formatAmount(message?.value) };

  if (typeof message === "object") return message.key;

  switch (message) {
    case "required":
      return "completeThisField";

    case "fieldMustBeAnInteger":
      return "noDecimalsAllowed";

    case "oneDecimalAllowed":
      return "oneDecimalAllowed";

    case "positive":
      return "fieldMustHavePositiveValue";

    case "invalidName":
      return "invalidName";

    case "duplicateName":
      return "duplicateName";

    default:
      return "invalidField";
  }
};

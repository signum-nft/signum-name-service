import { setLocale } from "yup";

setLocale({
  string: {
    min: ({ min }) => ({ key: "moreCharactersFeedback", value: min }),
    max: ({ max }) => ({ key: "lessCharactersFeedback", value: max }),
  },
  number: {
    min: ({ min }) => ({ key: "moreAmountFeedback", value: min }),
    max: ({ max }) => ({ key: "lessAmountFeedback", value: max }),
    integer: () => "fieldMustBeAnInteger",
  },
});

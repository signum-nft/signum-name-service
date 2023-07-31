import { format } from "date-fns";

export const formatDate = (input: Date, fullFormat?: boolean) => {
  if (fullFormat) return format(input, "yyyy/dd/MM, HH:mm");
  return format(input, "yyyy/dd/MM");
};

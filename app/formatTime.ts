import { format } from "date-fns";

export const formatTime = (input: Date) => {
  return format(input, "pp");
};

import { DateFormat } from "@/app/types/DateFormat";
import hoursToMinutes from "date-fns/hoursToMinutes";
import hoursToSeconds from "date-fns/hoursToSeconds";

export const convertPeriod = (
  quantity: number,
  format: DateFormat,
  returnFormat: "minutes" | "seconds"
): number => {
  let dateInHours = 0;

  switch (format) {
    case "day":
      dateInHours = quantity * 24;
      break;

    case "week":
      dateInHours = quantity * 168;
      break;

    case "month":
      dateInHours = quantity * 730;
      break;

    default:
      break;
  }

  switch (returnFormat) {
    case "seconds":
      return hoursToSeconds(dateInHours);

    case "minutes":
      return hoursToMinutes(dateInHours);

    default:
      return 0;
  }
};

import {
  formatRelative,
  formatDistance,
  format,
  differenceInHours,
} from "date-fns";
import { ptBR, enUS } from "date-fns/locale";

export interface FormatNumberArgs {
  date: Date | string;
  locale?: string;
}

const localization = {
  "en-US": enUS,
  "pt-BR": ptBR,
};

const formats = {
  "en-US": "MM/dd/yyyy hh:mm aaa",
  "pt-BR": "dd.MM.yyyy HH:mm",
};

export function formatDate({ date, locale = "pt-BR" }: FormatNumberArgs) {
  const now = new Date();
  const d = typeof date === "string" ? new Date(date) : date;
  const delta = differenceInHours(now, d);
  if (delta < 4) {
    // @ts-ignore
    return formatDistance(d, now, { locale: localization[locale] || enUS });
  } else if (delta < 48) {
    // @ts-ignore
    return formatRelative(d, now, { locale: localization[locale] || enUS });
  } else {
    // @ts-ignore
    return format(d, formats[locale] || formats["en-US"]);
  }
}

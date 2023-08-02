export interface FormatNumberArgs {
  value: number | bigint | string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  language?: string;
}

export function formatNumber({
  suffix,
  language = "en",
  decimals,
  prefix,
  value,
}: FormatNumberArgs) {
  const format = new Intl.NumberFormat(language, {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });

  const n = typeof value === "string" ? parseFloat(value) : value;
  return `${prefix ? prefix + " " : ""}${format.format(n)}${
    suffix ? " " + suffix : ""
  }`;
}

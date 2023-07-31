import { isClientSide } from "@/app/isClientSide";
import { AllowedTickersDecimals } from "@/app/types/supportedTickerSymbol";

const SupportedAmountLocales = new Map([
  ["en", "en"],
  ["de", "de"],
]);

export const formatAmount = (
  input: string | number | undefined,
  shortHand = false,
  suffix = "",
  isFiat = false,
  disableDecimal = false,
  maximumFractionDigits = 8
) => {
  if (input === 0 || input === "0" || input === undefined) return "0";

  if (typeof input === "string") input = parseFloat(input);

  let selectedLocale = "en";
  let selectedTickerSymbol = "usd";

  if (isClientSide()) {
    // @ts-ignore
    selectedLocale = localStorage.getItem("i18nextLng") || "en";
    selectedTickerSymbol =
      localStorage.getItem("selectedTickerSymbol") || "usd";
  }

  const mappedLocale = SupportedAmountLocales.get(selectedLocale);

  if (isFiat) {
    // @ts-ignore
    maximumFractionDigits = AllowedTickersDecimals.get(selectedTickerSymbol);
    if (input > 499999) maximumFractionDigits = 0;
  }

  if (disableDecimal) maximumFractionDigits = 0;

  if (shortHand) {
    let formatInput = Intl.NumberFormat(mappedLocale, {
      style: "decimal",
      notation: "compact",
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(input);

    if (formatInput.endsWith("K"))
      formatInput = formatInput.toLocaleLowerCase();

    return formatInput + suffix;
  }

  return Intl.NumberFormat(mappedLocale, {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(input);
};

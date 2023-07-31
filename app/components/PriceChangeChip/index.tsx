import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

interface Props {
  variant: "simple" | "contained";
  priceChange: number;
}

export const PriceChangeChip = ({ variant, priceChange }: Props) => {
  const isPriceChangePositive = !!(priceChange && priceChange > 0);
  const isPriceChangeNeutral = isNaN(priceChange) || priceChange == 0;

  const priceLabel = !isPriceChangeNeutral
    ? priceChange.toFixed(2).replace("-", "")
    : "0.00";

  let priceChangeLabel = "";
  let simpleTextColor = "default.main";
  let chipColor = "default";

  if (!isPriceChangeNeutral) {
    simpleTextColor = isPriceChangePositive ? "success.main" : "error.main";
    priceChangeLabel = isPriceChangePositive ? "▲" : "▼";
    chipColor = isPriceChangePositive ? "success" : "error";
  }

  if (variant === "simple")
    return (
      <Typography fontWeight={500} variant="body2" color={simpleTextColor}>
        {priceChangeLabel + priceLabel + "%"}
      </Typography>
    );

  return (
    <Chip
      label={priceChangeLabel + priceLabel + "%"}
      // @ts-ignore
      color={chipColor}
      sx={{ fontWeight: 500, color: "white", borderRadius: 1 }}
    />
  );
};

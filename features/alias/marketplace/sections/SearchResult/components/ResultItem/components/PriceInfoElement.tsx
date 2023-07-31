import { useTranslation } from "next-i18next";
import { useAppContext } from "@/app/hooks/useAppContext";
import { formatAmount } from "@/app/formatAmount";
import { useActiveMarketData } from "@/app/hooks/useActiveMarketData";

import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

interface Props {
  aliasSignaPrice: number;
}

export const PriceInfoElement = ({ aliasSignaPrice }: Props) => {
  const { t } = useTranslation();
  const { NativeTicker } = useAppContext();
  const activeMarketData = useActiveMarketData();

  // Alias price converted into fiat
  const aliasMarketPrice =
    aliasSignaPrice && activeMarketData.price
      ? aliasSignaPrice * activeMarketData.price
      : 0;

  return (
    <Tooltip title={t("price")} arrow placement="top">
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body2" fontWeight={500}>
          {formatAmount(aliasSignaPrice) + " " + NativeTicker}
        </Typography>

        {!!aliasMarketPrice && (
          <Typography variant="body2" color="textSecondary">
            (
            {activeMarketData.symbol +
              formatAmount(aliasMarketPrice, false, "", true)}
            )
          </Typography>
        )}
      </Stack>
    </Tooltip>
  );
};

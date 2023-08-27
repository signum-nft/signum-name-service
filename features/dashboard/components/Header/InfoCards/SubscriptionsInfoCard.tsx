import { InfoCard } from "./InfoCard";
import Icon from "@mui/icons-material/CurrencyExchange";
import { Stack, Typography } from "@mui/material";
import { useAppContext } from "@/app/hooks/useAppContext";
import { InfoItem } from "./InfoItem";
import { formatAmount } from "@/app/formatAmount";
import { useAppSelector } from "@/states/hooks";
import { selectAmountSuffix } from "@/app/states/ledgerState";
import { useTranslation } from "next-i18next";
import { SubInfoItem } from "./SubInfoItem";
interface Props {
  totalCount: number;
}
export const SubscriptionsInfoCard = ({ totalCount }: Props) => {
  const { t } = useTranslation();
  const suffix = useAppSelector(selectAmountSuffix);
  const {
    Platform: { MaxAliasLoad },
  } = useAppContext();

  const totalFeesSigna = Math.min(totalCount, MaxAliasLoad) * 50;
  const exceeded = totalCount > MaxAliasLoad;
  const formatted = formatAmount(totalFeesSigna);

  return (
    <InfoCard
      title={t("subscription_other")}
      tooltip={t("subscriptionInfoHint")}
      icon={Icon}
    >
      <InfoItem label={`${t("subscriptionCosts")} (${suffix})`}>
        <>
          <Stack direction="row" alignItems="baseline">
            <Typography
              variant="h5"
              color="grey"
              sx={{ top: "-8px", position: "relative", color: "grey" }}
            ></Typography>
            <Typography variant="h3" sx={{ position: "relative", top: "-8px" }}>
              {formatted}&nbsp;{exceeded ? "+" : ""}
            </Typography>
          </Stack>
        </>
      </InfoItem>
      <SubInfoItem text={exceeded ? t("minPayment") : t("maxPayment")} />
    </InfoCard>
  );
};

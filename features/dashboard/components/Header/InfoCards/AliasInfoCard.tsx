import { InfoCard } from "./InfoCard";
import AliasIcon from "@mui/icons-material/AlternateEmail";
import { formatNumber } from "@/app/formatNumber";
import { useRouter } from "next/router";
import { useAppContext } from "@/app/hooks/useAppContext";
import { InfoItem } from "./InfoItem";
import { useTranslation } from "next-i18next";
import { SubInfoItem } from "./SubInfoItem";

interface Props {
  aliasCount: number;
  tldCount: number;
}

export const AliasInfoCard = ({ aliasCount, tldCount }: Props) => {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const {
    Platform: { MaxAliasLoad },
  } = useAppContext();

  const exceeded = aliasCount > MaxAliasLoad;
  const overall = exceeded
    ? formatNumber({ value: MaxAliasLoad, decimals: 0, language: locale }) + "+"
    : formatNumber({ value: aliasCount, decimals: 0, language: locale });

  return (
    <InfoCard
      title={t("alias_other")}
      tooltip={t("aliasInfoHint")}
      icon={AliasIcon}
    >
      <InfoItem label={t("overall")} value={overall} />
      <SubInfoItem text={t("inTopLevelDomain", { count: tldCount })} />
    </InfoCard>
  );
};

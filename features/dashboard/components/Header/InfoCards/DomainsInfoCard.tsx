import { InfoCard } from "./InfoCard";
import DomainsIcon from "@mui/icons-material/Public";
import { formatNumber } from "@/app/formatNumber";
import { useRouter } from "next/router";
import { useAppContext } from "@/app/hooks/useAppContext";
import { InfoItem } from "./InfoItem";
import { useTranslation } from "next-i18next";
import { SubInfoItem } from "./SubInfoItem";

interface Props {
  subdomainCount: number;
  domainCount: number;
}

export const DomainsInfoCard = ({ subdomainCount, domainCount }: Props) => {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const {
    Platform: { MaxAliasLoad },
  } = useAppContext();

  const exceeded = subdomainCount > MaxAliasLoad;
  const domains = exceeded
    ? formatNumber({ value: MaxAliasLoad, decimals: 0, language: locale }) + "+"
    : formatNumber({ value: domainCount, decimals: 0, language: locale });
  const subdomains = formatNumber({
    value: subdomainCount,
    decimals: 0,
    language: locale,
  });

  return (
    <InfoCard
      title={t("domain_other")}
      tooltip={t("domainInfoHint")}
      icon={DomainsIcon}
    >
      <InfoItem label={t("overall")} value={domains} />
      <SubInfoItem text={t("subdomain", { count: subdomains })} />
    </InfoCard>
  );
};

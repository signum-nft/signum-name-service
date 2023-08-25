import { InfoCard } from "./InfoCard";
import DomainsIcon from "@mui/icons-material/Public";
import { formatNumber } from "@/app/formatNumber";
import { useRouter } from "next/router";
import { useAppContext } from "@/app/hooks/useAppContext";
import { InfoItem } from "./InfoItem";

interface Props {
  totalCount: number;
  domainCount: number;
}

export const DomainsInfoCard = ({ totalCount, domainCount }: Props) => {
  const { locale } = useRouter();
  const {
    Platform: { MaxAliasLoad },
  } = useAppContext();

  const exceeded = totalCount > MaxAliasLoad;
  const overall = exceeded
    ? formatNumber({ value: MaxAliasLoad, decimals: 0, language: locale }) + "+"
    : formatNumber({ value: totalCount, decimals: 0, language: locale });

  return (
    <InfoCard title="Domains" icon={DomainsIcon}>
      <InfoItem label="Overall" value={overall} />
    </InfoCard>
  );
};

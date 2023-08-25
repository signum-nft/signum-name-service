import { InfoCard } from "./InfoCard";
import DomainsIcon from "@mui/icons-material/Public";
import { Stack, Typography, Box } from "@mui/material";
import { auto } from "@popperjs/core";
import { ReactElement } from "react";
import { formatNumber } from "@/app/formatNumber";
import { useRouter } from "next/router";
import { useAppContext } from "@/app/hooks/useAppContext";

interface InfoItemProps {
  label: string;
  value: string | ReactElement;
}
const InfoItem = ({ label, value }: InfoItemProps) => {
  return (
    <Stack direction="column">
      <Typography variant="subtitle2" color="grey" sx={{ p: 0 }}>
        {label}
      </Typography>
      <Typography variant="h3" sx={{ position: "relative", top: "-10px" }}>
        {value}
      </Typography>
    </Stack>
  );
};

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

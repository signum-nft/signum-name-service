import { FC, useMemo } from "react";
import { formatNumber, FormatNumberArgs } from "@/app/formatNumber";
import { useRouter } from "next/router";

export const FormattedNumber: FC<FormatNumberArgs> = (args) => {
  const { locale } = useRouter();
  const formatted = useMemo(() => {
    return formatNumber({ ...args, language: locale });
  }, [args, locale]);
  return <>{formatted}</>;
};

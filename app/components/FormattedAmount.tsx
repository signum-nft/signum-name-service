import { FC } from "react";
import { FormatNumberArgs } from "@/app/formatNumber";
import { useAppSelector } from "@/states/hooks";
import { selectAmountSuffix } from "@/app/states/ledgerState";
import { FormattedNumber } from "./FormattedNumber";

export const FormattedAmount: FC<FormatNumberArgs> = (args) => {
  const suffix = useAppSelector(selectAmountSuffix);
  return <FormattedNumber decimals={4} suffix={suffix} {...args} />;
};

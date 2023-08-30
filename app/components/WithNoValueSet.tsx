import { ChildrenProps } from "@/app/types/ChildrenProps";
import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";

interface Props extends ChildrenProps {
  hasValue: boolean;
}

export const WithNoValueSet = ({ hasValue, children }: Props) => {
  const { t } = useTranslation();
  return !hasValue ? (
    <Typography variant="body2" color="grey">
      {t("valueNotSet")}
    </Typography>
  ) : (
    <>{children}</>
  );
};

import { useTranslation } from "next-i18next";
import { useAppDispatch } from "@/states/hooks";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AliasProxy } from "@/app/types/aliasProxy";

interface Props {
  alias: AliasProxy;
  title: string;
  newName?: string;
}

export const AliasLinkCard = ({ alias, title, newName }: Props) => {
  const { t } = useTranslation();

  const currentName = alias.subdomain || t("rootDomain");
  const domainName = newName || currentName;
  return (
    <Card sx={{ width: 160 }} elevation={2}>
      <CardContent sx={{ paddingBottom: "0.5rem !important" }}>
        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography
          sx={{ fontSize: 12, fontFamily: "monospace" }}
          color="text.secondary"
          gutterBottom
        >
          {alias.aliasName}
        </Typography>
        <Typography
          sx={{ fontSize: 14, fontStyle: "italic" }}
          color="text.secondary"
          gutterBottom
        >
          {domainName}
        </Typography>
      </CardContent>
    </Card>
  );
};

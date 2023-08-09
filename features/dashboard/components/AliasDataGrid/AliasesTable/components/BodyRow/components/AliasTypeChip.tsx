import { useTranslation } from "next-i18next";
import { AliasUpdateMode } from "@/app/types/aliasUpdateMode";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PublicIcon from "@mui/icons-material/Public";
import SourceIcon from "@mui/icons-material/Source";
import GestureIcon from "@mui/icons-material/Gesture";

interface Props {
  type: AliasUpdateMode;
}

export const AliasTypeChip = ({ type }: Props) => {
  const { t } = useTranslation();

  let icon = null;
  let label = "";

  switch (type) {
    case "account":
      icon = <AccountBoxIcon />;
      label = "accountShortcut";
      break;

    case "link":
      icon = <PublicIcon />;
      label = "linkRedirection";
      break;

    case "standard":
      icon = <SourceIcon />;
      label = "standardContent";
      break;

    case "freestyle":
      icon = <GestureIcon />;
      label = "freestyleContent";
      break;

    default:
      break;
  }

  if (!icon) return null;

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {icon}

      <Typography variant="body2">{t(label)}</Typography>
    </Stack>
  );
};

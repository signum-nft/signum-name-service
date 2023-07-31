import { useTranslation } from "next-i18next";
import { openExplorer } from "@/app/explorer";
import { useTokenMetaData } from "@/app/hooks/useTokenMetaData";
import { LoadingIndicator } from "@/app/components/LoadingIndicator";
import { TokenAvatar } from "@/app/components/TokenAvatar";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface Props {
  tokenId: string;
  simpleMode?: boolean;
}

export const FoundTokenCard = ({ tokenId, simpleMode = false }: Props) => {
  const { t } = useTranslation();
  const { ticker } = useTokenMetaData(tokenId);

  const viewTokenInExplorer = () => openExplorer("asset/" + tokenId);

  return (
    <ListItem disablePadding sx={{ borderRadius: 2, overflow: "hidden" }}>
      {!ticker && <LoadingIndicator height={50} />}

      {ticker && (
        <ListItemButton sx={{ cursor: "default" }}>
          <ListItemAvatar>
            <TokenAvatar
              tokenId={tokenId}
              variant="rounded"
              sx={{ border: 1, borderColor: "divider" }}
            />
          </ListItemAvatar>

          <Stack direction="column" sx={{ flexGrow: 1 }}>
            <ListItemText sx={{ mb: 0 }} primary={ticker} />
            {!simpleMode && (
              <Typography fontSize={12} color="textSecondary">
                {t("viaSignumNode")}
              </Typography>
            )}
          </Stack>

          {!simpleMode && (
            <Button
              size="small"
              color="secondary"
              startIcon={<OpenInNewIcon />}
              onClick={viewTokenInExplorer}
            >
              {t("viewTokenInExplorer")}
            </Button>
          )}
        </ListItemButton>
      )}
    </ListItem>
  );
};

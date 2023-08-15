import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useTranslation } from "next-i18next";
import copy from "copy-to-clipboard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Variant } from "@mui/material/styles/createTypography";

interface Props {
  textToCopy: string;
  label?: string;
  variant?: Variant;
}

export const CopyableText = ({
  textToCopy,
  label,
  variant = "caption",
}: Props) => {
  const { showInfo } = useSnackbar();
  const { t } = useTranslation();

  const handleCopy = () => {
    copy(textToCopy);
    showInfo(t("successfullyCopied"));
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      sx={{ color: "grey" }}
    >
      <Typography variant={variant}>{label ?? textToCopy}</Typography>
      <Tooltip title={`${t("clickToCopyToClipboard")}`} arrow placement="top">
        <Box onClick={handleCopy} sx={{ ml: 0.25 }}>
          {/*// @ts-ignore*/}
          <ContentCopyIcon fontSize="16px" />
        </Box>
      </Tooltip>
    </Box>
  );
};

import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useTranslation } from "next-i18next";
import copy from "copy-to-clipboard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Variant } from "@mui/material/styles/createTypography";
import { SxProps, Theme } from "@mui/system";

interface Props {
  textToCopy: string;
  label?: string;
  variant?: Variant;
  sx?: SxProps<Theme>;
}

export const CopyableText = ({
  textToCopy,
  label,
  variant = "caption",
  sx = {},
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
      sx={{ color: "grey", ...sx }}
    >
      <Typography variant={variant}>{label ?? textToCopy}</Typography>
      <Tooltip title={`${t("clickToCopyToClipboard")}`} arrow placement="top">
        <Box onClick={handleCopy} sx={{ ml: 0.25, cursor: "pointer" }}>
          {/*// @ts-ignore*/}
          <ContentCopyIcon fontSize="16px" />
        </Box>
      </Tooltip>
    </Box>
  );
};

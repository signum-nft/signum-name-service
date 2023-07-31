import { useTranslation } from "next-i18next";
import { useAppContext } from "@/app/hooks/useAppContext";
import { useAccount } from "@/app/hooks/useAccount";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { useTokenBalance } from "@/app/hooks/useTokenBalance";
import { asRSAddress } from "@/app/asRSAddress";
import { openExplorer } from "@/app/explorer";
import { asSignaString } from "@/app/asSignaString";
import { formatAmount } from "@/app/formatAmount";
import { TokenAvatar } from "@/app/components/TokenAvatar";

import Link from "next/link";
import copy from "copy-to-clipboard";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export const AccountSummary = () => {
  const { t } = useTranslation();
  const { TokenTrtId } = useAppContext();
  const { accountId, balance } = useAccount();
  const { showInfo } = useSnackbar();

  const tokenBalance = useTokenBalance(TokenTrtId);
  const trtAvailableBalance = Number(
    tokenBalance.availableBalance.getCompound()
  );

  const copyAccountAddress = () => {
    if (!accountId) return;
    copy(`${asRSAddress(accountId)}`);
    showInfo(t("copiedAddress"));
  };

  const viewAccountInExplorer = () => openExplorer("address/" + accountId);

  const avatarStyles = { width: 28, height: 28, mr: 1 };

  if (!accountId) return null;

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, p: 1 }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography color="textSecondary" variant="body2">
          {asRSAddress(accountId)}
        </Typography>

        <Box display="flex" flexDirection="row">
          <Tooltip title={`${t("copyAccountAddress")}`} arrow placement="top">
            <IconButton
              onClick={copyAccountAddress}
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={`${t("viewAccountInExplorer")}`}
            arrow
            placement="top"
          >
            <IconButton
              onClick={viewAccountInExplorer}
              edge="start"
              color="inherit"
            >
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box display="flex" flexDirection="row" alignItems="center" mb={2}>
        <Avatar
          src="/assets/img/signum_logo.png"
          sx={avatarStyles}
          variant="rounded"
        />

        <Typography fontWeight={500}>
          {asSignaString(balance.availableBalance)}
        </Typography>
      </Box>

      <Link href={"/tokens/" + TokenTrtId} passHref>
        <Tooltip title={`${t("tradeTRT")}`} arrow placement="left">
          <Box
            component="a"
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <TokenAvatar
              tokenId={TokenTrtId}
              sx={avatarStyles}
              variant="rounded"
            />

            <Typography fontWeight={500} color="textPrimary">
              {formatAmount(trtAvailableBalance)} TRT
            </Typography>
          </Box>
        </Tooltip>
      </Link>
    </Paper>
  );
};

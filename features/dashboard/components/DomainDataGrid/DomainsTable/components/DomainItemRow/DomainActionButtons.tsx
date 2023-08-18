import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { selectIsDarkMode } from "@/app/states/appState";
import { selectMonitoredTransactions } from "@/app/states/transactionState";
import { useMemo } from "react";
import { ProcessingIndicatorChip } from "@/app/components/ProcessingIndicatorChip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import ControlIcon from "@mui/icons-material/Launch";
import IconButton from "@mui/material/IconButton";
import { MappedDomain } from "@/features/dashboard/types/mappedDomain";
import Link from "next/link";
import { useAppContext } from "@/app/hooks/useAppContext";
import { openExternalUrl } from "@/app/openExternalUrl";

interface Props {
  domain: MappedDomain;
}

export const DomainActionButtons = ({ domain }: Props) => {
  const { t } = useTranslation();
  const { SignumSwap } = useAppContext();
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const monitoredTransactions = useAppSelector(selectMonitoredTransactions);

  const isUpdatingDomainStatus = useMemo(
    () =>
      Boolean(
        monitoredTransactions.find(
          ({ referenceId, type }) =>
            referenceId === domain.id && type === "alias-content-update"
        )
      ),
    [monitoredTransactions, domain.id]
  );
  const iconColor = isDarkMode ? "secondary" : "primary";
  const signumswapUrl = `${SignumSwap}/me/alias?search=${domain.name}`;
  return (
    <Stack direction="row" spacing={0} justifyContent="end" alignItems="center">
      {isUpdatingDomainStatus && <ProcessingIndicatorChip />}

      <Tooltip
        title={`${t("manageAlias", { signumSwapUrl: SignumSwap })}`}
        arrow
        placement="top"
      >
        <Link
          href={signumswapUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => {
            openExternalUrl(signumswapUrl);
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <IconButton
            color={iconColor}
            sx={{ minWidth: { sm: "24px", md: "px" }, px: { sm: 0, md: 1 } }}
          >
            <ControlIcon />
          </IconButton>
        </Link>
      </Tooltip>
    </Stack>
  );
};

import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { selectIsDarkMode } from "@/app/states/appState";
import { ProcessingIndicatorChip } from "@/app/components/ProcessingIndicatorChip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import ControlIcon from "@mui/icons-material/Launch";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { MappedDomain } from "@/features/dashboard/types/mappedDomain";
import { useAppContext } from "@/app/hooks/useAppContext";
import { openExternalUrl } from "@/app/openExternalUrl";
import { selectMonitoredTransactions } from "@/app/states/transactionState";
import { useMemo } from "react";
import { Link, MenuOptions } from "@/app/components/MenuOptions";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ConvertToSubdomain from "@mui/icons-material/MoveDown";
import OpenDomainIcon from "@mui/icons-material/Segment";
import { MoreVert } from "@mui/icons-material";
import { voidFn } from "@/app/voidFn";
import { useRouter } from "next/router";
import { subdomainOperationsActions } from "@/app/states/subdomainOperationState";
import { SubdomainAction } from "@/app/types/subdomainAction";
import { Config } from "@/app/config";
import { AccountDomain } from "@/app/types/accountData";
import { Token } from "fast-linked-list";
import { asDomainString } from "@/app/asDomainString";
interface Props {
  domain: MappedDomain;
}

export const ActionButtons = ({ domain }: Props) => {
  const { t } = useTranslation();
  const { SignumSwap } = useAppContext();
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const monitoredTransactions = useAppSelector(selectMonitoredTransactions);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const openModal = (action: SubdomainAction, domain: MappedDomain) => {
    dispatch(
      subdomainOperationsActions.openModal({
        action,
        subdomain: {
          domainName: domain.name,
          aliasName: domain.name,
          aliasTld: domain.tld ?? Config.Signum.DefaultTld,
          aliasId: domain.id,
          name: "",
          accountId: "",
          url: "",
          accountAddress: "",
          __listElement: new Token<AccountDomain>(domain), // dummy,
        },
      })
    );
  };
  const handleOnOpenDomain = () => {
    const domainStr = asDomainString({ name: domain.name, tld: domain.tld });
    router.push(`/domain/${domainStr}`);
  };

  const isProcessing = useMemo(
    () => monitoredTransactions.some(({ type }) => type.includes(domain.name)),
    [domain.name, monitoredTransactions]
  );

  const dynamicMenuItems = useMemo(() => {
    const items: Link[] = [];

    if (domain.data?.url) {
      const domainStr = asDomainString({ name: domain.name, tld: domain.tld });

      items.push({
        icon: <OpenInBrowserIcon />,
        label: t("openInBrowser"),
        tooltip: t("openInBrowserHint", { domain: domainStr }),
        onClick: (event) => {
          openExternalUrl(`https://${domainStr}`);
        },
      });
    }

    return items;
  }, [domain.data?.account, domain.data?.url, t]);

  const iconColor = isDarkMode ? "secondary" : "primary";
  const signumswapUrl = `${SignumSwap}me/alias?search=${domain.name}`;
  return (
    <Stack direction="row" spacing={0} justifyContent="end" alignItems="center">
      {isProcessing && <ProcessingIndicatorChip />}

      <Tooltip
        title={t("openDomain", { domain: domain.name })}
        arrow
        placement="top"
      >
        <IconButton
          color={iconColor}
          sx={{ minWidth: { sm: "24px", md: "px" }, px: { sm: 0, md: 1 } }}
          onClick={handleOnOpenDomain}
        >
          <OpenDomainIcon />
        </IconButton>
      </Tooltip>

      <Tooltip
        title={t("editDomain", { domain: domain.name })}
        arrow
        placement="top"
      >
        <IconButton
          color={iconColor}
          sx={{ minWidth: { sm: "24px", md: "px" }, px: { sm: 0, md: 1 } }}
          onClick={() => openModal("edit-domain", domain)}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <MenuOptions
        links={[
          {
            icon: <RemoveRedEyeIcon />,
            label: t("view"),
            tooltip: t("viewContent"),
            onClick: () => openModal("view", domain),
          },
          {
            icon: <ConvertToSubdomain />,
            label: t("convertToSubdomain"),
            tooltip: t("convertToSubdomainHint"),
            onClick: () => openModal("convert", domain),
          },
          ...dynamicMenuItems,
          {
            icon: <ControlIcon />,
            label: t("manage"),
            tooltip: t("manageAlias", { signumSwapUrl: SignumSwap }),
            onClick: (event) => {
              openExternalUrl(signumswapUrl);
            },
          },
        ]}
      >
        <Tooltip title={t("moreOptions")} arrow placement="top">
          <IconButton
            color={iconColor}
            sx={{ minWidth: { sm: "24px", md: "px" }, px: { sm: 0, md: 1 } }}
          >
            <MoreVert />
          </IconButton>
        </Tooltip>
      </MenuOptions>
    </Stack>
  );
};

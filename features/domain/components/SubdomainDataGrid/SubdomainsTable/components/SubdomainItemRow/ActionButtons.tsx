import { useTranslation } from "next-i18next";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { Link, MenuOptions } from "@/app/components/MenuOptions";
import { ProcessingIndicatorChip } from "@/app/components/ProcessingIndicatorChip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import UnlinkIcon from "@mui/icons-material/LinkOff";
import AddBelowIcon from "@mui/icons-material/PostAdd";
import { selectIsDarkMode } from "@/app/states/appState";
import IconButton from "@mui/material/IconButton";
import { MoreVert } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { MappedSubdomain } from "@/app/types/mappedSubdomain";
import { voidFn } from "@/app/voidFn";
import { subdomainOperationsActions } from "@/app/states/subdomainOperationState";
import { SubdomainAction } from "@/app/types/subdomainAction";
import { useMonitoredTransaction } from "@/app/hooks/useMonitoredTransaction";
import { createAliasNameForSubdomain } from "@/app/createAliasNameForSubdomain";
import { Config } from "@/app/config";
import { useCallback, useMemo } from "react";
import { asDomainString } from "@/app/asDomainString";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import { openExternalUrl } from "@/app/openExternalUrl";
import { asSubdomainString } from "@/app/asSubdomainString";

interface Props {
  subdomain: MappedSubdomain;
}

export const ActionButtons = ({ subdomain }: Props) => {
  const { t } = useTranslation();
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const dispatch = useAppDispatch();
  const { isPending } = useMonitoredTransaction({
    referenceId: subdomain.aliasId,
  });
  const fullDomainName = asDomainString({
    tld: subdomain.aliasTld,
    name: subdomain.domainName,
  });
  const { isPending: isAddingAliases } = useMonitoredTransaction({
    type: `alias-new-${fullDomainName}`,
  });
  const { isPending: isDeletingAliases } = useMonitoredTransaction({
    type: `alias-delete-${fullDomainName}`,
  });

  const openModal = (action: SubdomainAction, subdomain: MappedSubdomain) => {
    dispatch(
      subdomainOperationsActions.openModal({
        action,
        subdomain,
      })
    );
  };

  const handleAddBefore = () => {
    const newAliasName = createAliasNameForSubdomain(subdomain.domainName);

    openModal("add", {
      aliasId: "",
      // if not prev then it's head!
      __listElement: subdomain.__listElement.prev ?? subdomain.__listElement,
      domainName: subdomain.domainName,
      name: "",
      accountId: "",
      accountAddress: "",
      aliasName: newAliasName,
      aliasTld: subdomain.aliasTld,
      url: "",
    });
  };

  const dynamicMenuItems = useMemo(() => {
    const items: Link[] = [];

    if (subdomain.url) {
      const urlString = asSubdomainString({
        domain: subdomain.domainName,
        tld: subdomain.aliasTld,
        subdomain: subdomain.name,
      });

      items.push({
        icon: <OpenInBrowserIcon />,
        label: t("openInBrowser"),
        tooltip: t("openInBrowserHint", { domain: urlString }),
        onClick: () => {
          openExternalUrl(`https://${urlString}`);
        },
      });
    }

    return items;
  }, [subdomain, t]);

  if (isPending) {
    return <ProcessingIndicatorChip />;
  }

  const disabledListAction = isAddingAliases || isDeletingAliases;
  const iconColor = isDarkMode ? "secondary" : "primary";

  return (
    <Stack direction="row" spacing={0} justifyContent="end" alignItems="center">
      <Tooltip title={`${t("editAlias")}`} arrow placement="top">
        <IconButton
          color={iconColor}
          sx={{ minWidth: { sm: "24px", md: "unset" }, px: { sm: 0, md: 1 } }}
          onClick={() => openModal("edit", subdomain)}
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
            onClick: () => openModal("view", subdomain),
          },
          {
            icon: <AddBelowIcon />,
            label: t("addSubdomainBefore"),
            tooltip: t("addSubdomainBeforeHint"),
            disabled: disabledListAction,
            onClick: handleAddBefore,
          },
          ...dynamicMenuItems,
          {
            icon: <UnlinkIcon />,
            label: t("unlink"),
            tooltip: t("unlinkSubdomainHint"),
            disabled: disabledListAction,
            onClick: () => openModal("unlink", subdomain),
          },
          {
            icon: <DeleteIcon />,
            label: t("deleteSubdomain"),
            tooltip: t("deleteSubdomainHint"),
            disabled: disabledListAction,
            onClick: () => openModal("delete", subdomain),
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

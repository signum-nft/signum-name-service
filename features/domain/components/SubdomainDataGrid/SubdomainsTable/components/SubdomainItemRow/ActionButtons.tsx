import { useTranslation } from "next-i18next";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { MenuOptions } from "@/app/components/MenuOptions";
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

  if (isPending) {
    return <ProcessingIndicatorChip />;
  }

  const iconColor = isDarkMode ? "secondary" : "primary";

  return (
    <Stack direction="row" spacing={0} justifyContent="end" alignItems="center">
      <Tooltip title={`${t("viewContent")}`} arrow placement="top">
        <Button
          startIcon={<RemoveRedEyeIcon />}
          color={iconColor}
          onClick={() => openModal("view", subdomain)}
          sx={{ minWidth: { sm: "24px", md: "unset" }, px: { sm: 0, md: 1 } }}
        >
          <Typography sx={{ display: { sm: "none", md: "inherit" } }}>
            {t("view")}
          </Typography>
        </Button>
      </Tooltip>

      <Tooltip title={`${t("editAlias")}`} arrow placement="top">
        <Button
          startIcon={<EditIcon />}
          color={iconColor}
          onClick={() => openModal("edit", subdomain)}
          sx={{ minWidth: { sm: "24px", md: "unset" }, px: { sm: 0, md: 1 } }}
        >
          <Typography sx={{ display: { sm: "none", md: "inherit" } }}>
            {t("edit")}
          </Typography>
        </Button>
      </Tooltip>

      <MenuOptions
        links={[
          {
            icon: <AddBelowIcon />,
            label: t("addSubdomainBefore"),
            tooltip: t("addSubdomainBeforeHint"),
            onClick: handleAddBefore,
          },
          {
            icon: <UnlinkIcon />,
            label: t(!isPending ? "unlinkSubdomain" : "aliasContentUpdating"),
            tooltip: t("unlinkSubdomainHint"),
            disabled: isPending,
            onClick: () => openModal("unlink", subdomain),
          },
          {
            icon: <DeleteIcon />,
            label: t("deleteSubdomain"),
            tooltip: t("deleteSubdomainHint"),
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

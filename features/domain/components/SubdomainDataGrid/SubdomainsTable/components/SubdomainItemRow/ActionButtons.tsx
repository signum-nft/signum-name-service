import { useTranslation } from "next-i18next";
import { useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { useAccount } from "@/app/hooks/useAccount";
import { useSubscription } from "@/app/hooks/useSubscription";
import { selectMonitoredTransactions } from "@/app/states/transactionState";
import { portfolioActions } from "@/app/states/portfolioState";
import { action as actionTypes } from "@/app/types/aliasOperation";
import { MenuOptions } from "@/app/components/MenuOptions";
import { ProcessingIndicatorChip } from "@/app/components/ProcessingIndicatorChip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DangerousIcon from "@mui/icons-material/Dangerous";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import UnlinkIcon from "@mui/icons-material/LinkOff";
import AddBelowIcon from "@mui/icons-material/PlaylistAdd";
import { selectIsDarkMode } from "@/app/states/appState";
import IconButton from "@mui/material/IconButton";
import { MoreVert } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { MappedSubdomain } from "@/features/domain/types/mappedSubdomain";

interface Props {
  subdomain: MappedSubdomain;
}

export const ActionButtons = ({ subdomain }: Props) => {
  const { t } = useTranslation();
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const { accountId } = useAccount();
  const { setAliasOperation } = portfolioActions;
  // const { subscription } = useSubscription(id);
  const dispatch = useAppDispatch();
  const monitoredTransactions = useAppSelector(selectMonitoredTransactions);

  const id = subdomain.aliasId;
  const name = subdomain.aliasName;

  const [isOpenRenewalFeeDialog, setIsOpenRenewalFeeDialog] = useState(false);
  const openDialog = () => setIsOpenRenewalFeeDialog(true);
  const closeDialog = () => setIsOpenRenewalFeeDialog(false);

  const openModal = (id: string, name: string, action: actionTypes) => {
    dispatch(setAliasOperation({ show: true, id, name, action }));
  };

  const openViewModal = () => openModal(id, name, "view");
  const openEditModal = () => openModal(id, name, "edit");
  const openDeleteModal = () => openModal(id, name, "delete");
  const openUnlinkModal = () => {
    throw new Error("Implement me");
  };
  const openNewSubdomainModal = () => openModal(id, name, "add");

  // const saleLabel = status === "notOnSale" ? "setOnSale" : "updateSaleDetails";

  const isUpdatingContentStatus = useMemo(
    () =>
      Boolean(
        monitoredTransactions.find(
          ({ referenceId, type }) =>
            referenceId === id && type === "alias-content-update"
        )
      ),
    [monitoredTransactions, id]
  );

  const isUpdatingSaleStatus = useMemo(
    () =>
      monitoredTransactions.findIndex(
        ({ referenceId, type }) =>
          referenceId === id && type === "alias-sale-update"
      ) !== -1,
    [monitoredTransactions, id]
  );

  const isTransferingAlias = useMemo(
    () =>
      monitoredTransactions.findIndex(
        ({ referenceId, type }) =>
          referenceId === id && type === "alias-transfer"
      ) !== -1,
    [monitoredTransactions, id]
  );

  const isCancelingSubscription = useMemo(
    () =>
      Boolean(
        monitoredTransactions.find(
          ({ referenceId, type }) =>
            referenceId === id && type === "subscription-cancelation"
        )
      ),
    [monitoredTransactions, id]
  );

  const dynamicMenuOptions = useMemo(() => {
    if (isCancelingSubscription) {
      return [
        {
          icon: <DangerousIcon />,
          label: t("processingCancelRenewal") + "...",
          onClick: null,
          disabled: true,
        },
      ];
    }

    // if (subscription && subscription.sender !== accountId) {
    //   return [
    //     {
    //       icon: <InfoIcon color="warning" />,
    //       label: t("previousOwnerIsPayingFees"),
    //       onClick: openDialog,
    //     },
    //   ];
    // }
    //
    // if (subscription) {
    //   return [
    //     {
    //       icon: <DangerousIcon />,
    //       label: t("cancelRenewal"),
    //       onClick: openDeleteModal,
    //     },
    //   ];
    // }

    return [];
  }, [isCancelingSubscription, accountId]);

  if (isTransferingAlias) {
    return <ProcessingIndicatorChip label={t("aliasTransferingFeedback")} />;
  }

  const iconColor = isDarkMode ? "secondary" : "primary";

  return (
    <Stack
      direction="row"
      spacing={0}
      justifyContent="center"
      alignItems="center"
    >
      {/*<PreviousOwnerRenewalFeeFeedback*/}
      {/*  isOpen={isOpenRenewalFeeDialog}*/}
      {/*  handleClose={closeDialog}*/}
      {/*/>*/}
      <Tooltip title={`${t("viewContent")}`} arrow placement="top">
        <Button
          startIcon={<RemoveRedEyeIcon />}
          color={iconColor}
          onClick={openViewModal}
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
          onClick={openEditModal}
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
            label: t("addSubdomainBelow"),
            tooltip: t("addSubdomainBelowHint"),
            onClick: openNewSubdomainModal,
          },
          {
            icon: <UnlinkIcon />,
            label: t(
              !isUpdatingContentStatus
                ? "unlinkSubdomain"
                : "aliasContentUpdating"
            ),
            tooltip: t("unlinkSubdomainHint"),
            onClick: openUnlinkModal,
            disabled: isUpdatingContentStatus,
          },
          {
            icon: <DeleteIcon />,
            label: t("deleteSubdomain"),
            tooltip: t("deleteSubdomainHint"),
            onClick: openDeleteModal,
          },
          ...dynamicMenuOptions,
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

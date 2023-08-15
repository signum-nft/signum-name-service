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
// import { PreviousOwnerRenewalFeeFeedback } from "../SubdomainActionButtons/PreviousOwnerRenewalFeeFeedback";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import WidgetsIcon from "@mui/icons-material/Widgets";
import DangerousIcon from "@mui/icons-material/Dangerous";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import UnlinkIcon from "@mui/icons-material/LinkOff";
import AddBelowIcon from "@mui/icons-material/PlaylistAdd";
import { selectIsDarkMode } from "@/app/states/appState";

interface Props {
  id: string;
  name: string;
}

export const ActionButtons = ({ id, name }: Props) => {
  const { t } = useTranslation();
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const { accountId } = useAccount();
  const { setAliasOperation } = portfolioActions;
  const { subscription } = useSubscription(id);
  const dispatch = useAppDispatch();
  const monitoredTransactions = useAppSelector(selectMonitoredTransactions);

  const [isOpenRenewalFeeDialog, setIsOpenRenewalFeeDialog] = useState(false);
  const openDialog = () => setIsOpenRenewalFeeDialog(true);
  const closeDialog = () => setIsOpenRenewalFeeDialog(false);

  const openModal = (id: string, name: string, action: actionTypes) => {
    dispatch(setAliasOperation({ show: true, id, name, action }));
  };

  const openViewModal = () => openModal(id, name, "view");
  const openEditModal = () => openModal(id, name, "edit");
  const openCancelRenewalFeeModal = () =>
    openModal(id, name, "cancelRenewalFee");
  const openDeleteModal = openCancelRenewalFeeModal;
  const openUnlinkModal = () => {
    throw new Error("Implement me");
  };

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

    if (subscription && subscription.sender !== accountId) {
      return [
        {
          icon: <InfoIcon color="warning" />,
          label: t("previousOwnerIsPayingFees"),
          onClick: openDialog,
        },
      ];
    }

    if (subscription) {
      return [
        {
          icon: <DangerousIcon />,
          label: t("cancelRenewal"),
          onClick: openCancelRenewalFeeModal,
        },
      ];
    }

    return [];
  }, [
    subscription,
    openCancelRenewalFeeModal,
    isCancelingSubscription,
    accountId,
  ]);

  if (isTransferingAlias) {
    return <ProcessingIndicatorChip label={t("aliasTransferingFeedback")} />;
  }

  const iconColor = isDarkMode ? "secondary" : "primary";

  return (
    <Stack
      direction="row"
      spacing={2}
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
        >
          {t("view")}
        </Button>
      </Tooltip>

      <Tooltip title={`${t("editAlias")}`} arrow placement="top">
        <Button
          startIcon={<EditIcon />}
          color={iconColor}
          onClick={openViewModal}
        >
          {t("edit")}
        </Button>
      </Tooltip>

      <MenuOptions
        links={[
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
          {
            icon: <AddBelowIcon />,
            label: t("addSubdomainBelow"),
            tooltip: t("addSubdomainBelowHint"),
            onClick: openDeleteModal,
          },
          ...dynamicMenuOptions,
        ]}
      >
        <Tooltip title={t("moreOptions")} arrow placement="top">
          <Button startIcon={<WidgetsIcon />} color={iconColor}>
            {t("more")}
          </Button>
        </Tooltip>
      </MenuOptions>
    </Stack>
  );
};

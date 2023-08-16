import { useTranslation } from "next-i18next";
import { useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/states/hooks";
import { useAccount } from "@/app/hooks/useAccount";
import { useSubscription } from "@/app/hooks/useSubscription";
import { selectMonitoredTransactions } from "@/app/states/transactionState";
import { portfolioActions } from "@/app/states/portfolioState";
import { action as actionTypes } from "@/app/types/aliasOperation";
import { AliasStatus } from "@/app/types/aliasStatus";
import { MenuOptions } from "@/app/components/MenuOptions";
import { ProcessingIndicatorChip } from "@/app/components/ProcessingIndicatorChip";
import { PreviousOwnerRenewalFeeFeedback } from "./components/PreviousOwnerRenewalFeeFeedback";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import WidgetsIcon from "@mui/icons-material/Widgets";
import DangerousIcon from "@mui/icons-material/Dangerous";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

interface Props {
  id: string;
  name: string;
  status: AliasStatus;
}

export const AliasActionButtons = ({ id, name, status }: Props) => {
  const { t } = useTranslation();
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
  const openSaleModal = () => openModal(id, name, "sale");
  const openTransferModal = () => openModal(id, name, "transfer");
  const openCancelRenewalFeeModal = () => openModal(id, name, "delete");

  const saleLabel = status === "notOnSale" ? "setOnSale" : "updateSaleDetails";

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

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <PreviousOwnerRenewalFeeFeedback
        isOpen={isOpenRenewalFeeDialog}
        handleClose={closeDialog}
      />

      <Tooltip title={`${t("viewContent")}`} arrow placement="top">
        <Button
          startIcon={<RemoveRedEyeIcon />}
          color="success"
          onClick={openViewModal}
        >
          {t("view")}
        </Button>
      </Tooltip>

      <MenuOptions
        links={[
          {
            icon: <EditIcon />,
            label: t(
              !isUpdatingContentStatus ? "editAlias" : "aliasContentUpdating"
            ),
            onClick: openEditModal,
            disabled: isUpdatingContentStatus,
          },
          {
            icon: <ShoppingCartCheckoutIcon />,
            label: t(!isUpdatingSaleStatus ? saleLabel : "saleDetailsUpdating"),
            onClick: openSaleModal,
            disabled: isUpdatingSaleStatus,
          },
          {
            icon: <SwapHorizIcon />,
            label: t("transfer"),
            onClick: openTransferModal,
          },
          ...dynamicMenuOptions,
        ]}
      >
        <Tooltip title={t("moreOptions")} arrow placement="top">
          <Button startIcon={<WidgetsIcon />} color="success">
            {t("more")}
          </Button>
        </Tooltip>
      </MenuOptions>
    </Stack>
  );
};

import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import { Alias } from "@signumjs/core";
import { Amount } from "@signumjs/util";
import { AliasStatus } from "@/app/types/aliasStatus";
import { getAliasStatus } from "@/app/getAliasStatus";
import { useAccount } from "@/app/hooks/useAccount";
import { useAppSelector } from "@/states/hooks";
import { selectIsWalletConnected } from "@/app/states/walletState";
import { selectMonitoredTransactions } from "@/app/states/transactionState";
import { calculateAliasFee } from "@/app/calculateAliasFee";
import { BuyAliasButton } from "@/app/components/BuyAliasButton";
import { PriceInfoElement } from "./components/PriceInfoElement";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Config } from "@/app/config";

const DefaultTld = Config.Signum.DefaultTld;
export const ResultItem = (alias: Alias) => {
  const { t } = useTranslation();
  const { accountId } = useAccount();
  const { account, aliasName, buyer, tldName, priceNQT } = alias;
  const monitoredTransactions = useAppSelector(selectMonitoredTransactions);
  const isWalletConnected = useAppSelector(selectIsWalletConnected);

  const status: AliasStatus = account
    ? getAliasStatus(priceNQT, buyer, accountId)
    : "available";

  let aliasSignaPrice = 0;
  let canBuyAlias = false;

  switch (status) {
    case "available":
      aliasSignaPrice = Number(calculateAliasFee(aliasName).getSigna());
      canBuyAlias = true;
      break;

    case "onSale":
    case "onPrivateSale":
      aliasSignaPrice = Number(Amount.fromPlanck(priceNQT || "0").getSigna());
      canBuyAlias = true;
      break;

    default:
      break;
  }

  // Check if alias is owned by account
  const isAliasOwner = isWalletConnected && alias && account === accountId;

  const isBuying = useMemo(
    () =>
      monitoredTransactions.findIndex(({ referenceId, type }) => {
        if (type === "alias-buy") {
          return referenceId === aliasName + "." + tldName;
        }
        return false;
      }) !== -1,
    [monitoredTransactions, aliasName, tldName]
  );

  if (isAliasOwner) canBuyAlias = false;

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={1}
      rowGap={2}
      flexWrap="wrap"
      sx={{
        justifyContent: { xs: "center", md: "space-between" },
        borderBottom: 1,
        borderColor: "divider",
        "&:last-child": { border: 0 },
      }}
    >
      <Stack direction="column" alignItems="flex-start" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography>{aliasName}</Typography>

          <Tooltip
            title={t("tldExplanation", { tldName })}
            arrow
            placement="top"
          >
            <Chip
              variant="filled"
              color="secondary"
              label={tldName}
              sx={{ color: "white", fontWeight: 700, borderRadius: 1 }}
            />
          </Tooltip>
        </Stack>

        <Stack direction="row" alignItems="center">
          {tldName === DefaultTld && (
            <Typography fontSize={12} color="textSecondary" mr={0.4}>
              {isAliasOwner && `${aliasName} ${t("and")}`}

              {canBuyAlias && `${t("youCanGet")} ${aliasName} ${t("and")} `}
            </Typography>
          )}

          <Typography fontSize={12} color="textSecondary">
            {aliasName + "." + tldName}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center">
        {/*{isAliasOwner && (*/}
        {/*  <AliasActionButtons*/}
        {/*    id={alias.alias}*/}
        {/*    name={alias.aliasName}*/}
        {/*    status={status}*/}
        {/*  />*/}
        {/*)}*/}

        {status === "notOnSale" && !isAliasOwner && (
          <Tooltip title={t("notOnSaleAliasStatus")} arrow placement="top">
            <Chip label={t("taken")} color="error" />
          </Tooltip>
        )}

        {canBuyAlias && (
          <Stack direction="row" spacing={1} alignItems="center">
            {!isBuying && (
              <PriceInfoElement aliasSignaPrice={aliasSignaPrice} />
            )}

            <BuyAliasButton {...alias} status={status} />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

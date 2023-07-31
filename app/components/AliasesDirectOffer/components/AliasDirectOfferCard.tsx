/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import { Alias } from "@signumjs/core";
import { Amount } from "@signumjs/util";
import { useAppSelector } from "@/states/hooks";
import { selectIsDarkMode } from "@/app/states/appState";
import { selectMonitoredTransactions } from "@/app/states/transactionState";
import { useAccount } from "@/app/hooks/useAccount";
import { useActiveMarketData } from "@/app/hooks/useActiveMarketData";
import { formatAmount } from "@/app/formatAmount";
import { ProcessingIndicatorChip } from "@/app/components/ProcessingIndicatorChip";
import { BuyAliasButton } from "@/app/components/BuyAliasButton";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const AliasDirectOfferCard = (props: Alias) => {
  const { t } = useTranslation();
  const { accountId } = useAccount();
  const { alias, account, aliasName, priceNQT } = props;
  const activeMarketData = useActiveMarketData();
  const monitoredTransactions = useAppSelector(selectMonitoredTransactions);
  const isDarkMode = useAppSelector(selectIsDarkMode);

  const price = Number(Amount.fromPlanck(priceNQT || "").getSigna());

  const aliasPriceToMarketPriceData = price
    ? `≈ ${activeMarketData.symbol}${formatAmount(
        price * activeMarketData.price,
        false,
        "",
        true
      )}`
    : "";

  const isAliasOwner = accountId === account;

  const isBuying = useMemo(
    () =>
      Boolean(
        monitoredTransactions.find(
          ({ referenceId, type }) =>
            referenceId === alias && type === "alias-buy"
        )
      ),
    [monitoredTransactions, alias]
  );

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      py={2}
      px={1}
      sx={{
        transition: "0.3s all ease",
        borderBottom: 1,
        borderColor: "divider",
      }}
      css={css`
        :hover {
          background: ${isDarkMode
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.01)"};
        }

        :last-child {
          border: none !important;
        }
      `}
    >
      <Typography>{aliasName}</Typography>

      {!isBuying && (
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" fontWeight={700}>
              {formatAmount(price)}
            </Typography>

            {!!price && (
              <Typography
                variant="body2"
                component="span"
                color="textSecondary"
              >
                {aliasPriceToMarketPriceData}
              </Typography>
            )}
          </Stack>

          {!isAliasOwner && (
            <BuyAliasButton {...props} status="onPrivateSale" />
          )}

          {isAliasOwner && (
            <Tooltip title={t("aliasOwner")} arrow placement="top">
              <Button color="success" startIcon={<CheckCircleIcon />}>
                {t("owner")}
              </Button>
            </Tooltip>
          )}
        </Stack>
      )}

      {isBuying && <ProcessingIndicatorChip label={t("waitAliasBuying")} />}
    </Box>
  );
};

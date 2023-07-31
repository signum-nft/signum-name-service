import { useTranslation } from "next-i18next";
import { useState, useCallback } from "react";
import { Alias } from "@signumjs/core";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { LoadingIndicator } from "@/app/components/LoadingIndicator";
import { useAccount } from "@/app/hooks/useAccount";
import { AliasDirectOfferCard } from "./components/AliasDirectOfferCard";

import useSWR from "swr";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const PageSize = 25;

export const AliasesDirectOffer = () => {
  const { t } = useTranslation();
  const { ledgerService } = useLedgerService();
  const { accountId } = useAccount();
  const [aliases, setAliases] = useState<Alias[]>([]);
  const [nextIndex, setNextIndex] = useState(0);
  const [isInitialDataLoading, setIsInitialDataLoading] = useState(true);

  const [canFetchMore, setCanFetchMore] = useState(false);
  const [isLoadingMoreData, setIsLoadingMoreData] = useState(false);

  // TODO: Add Pagination from nextIndex value coming from node
  useSWR(ledgerService ? `/aliasesOnPrivateSale` : null, async () => {
    if (!ledgerService) return null;
    const { aliases } =
      await ledgerService.alias.fetchAccountAliasesDirectOffers({
        buyerId: accountId,
        startIndex: 0,
        count: PageSize,
      });
    setIsInitialDataLoading(false);
    setAliases(aliases);
    setCanFetchMore(aliases.length >= PageSize);
  });

  const fetchMore = useCallback(async () => {
    if (!ledgerService) return;
    if (!nextIndex) return;

    setIsLoadingMoreData(true);

    const response = await ledgerService.alias.fetchAccountAliasesDirectOffers({
      buyerId: accountId,
      startIndex: nextIndex,
      count: PageSize,
    });

    setAliases([...aliases, ...response.aliases]);
    setNextIndex(nextIndex + PageSize);
    setCanFetchMore(response.aliases.length >= PageSize);
    setIsLoadingMoreData(false);
  }, [ledgerService, aliases, nextIndex]);

  return (
    <>
      <Typography variant="h5" component="h1" gutterBottom>
        {t("accountDirectOffers")}
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
        {isInitialDataLoading && <LoadingIndicator height={100} />}

        {!isInitialDataLoading && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            flexDirection="column"
          >
            {aliases.map((alias) => (
              <AliasDirectOfferCard key={alias.aliasName} {...alias} />
            ))}

            {!aliases.length && (
              <Alert severity="info" sx={{ width: "100%" }}>
                {t("noAliasesDirectSalesAvailable")}
              </Alert>
            )}

            {!!(aliases.length && canFetchMore) && (
              <Button
                color="primary"
                variant="contained"
                fullWidth
                disabled={isLoadingMoreData}
                onClick={fetchMore}
              >
                {t("loadMore")}
              </Button>
            )}
          </Box>
        )}
      </Paper>
    </>
  );
};

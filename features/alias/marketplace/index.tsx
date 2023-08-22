import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Alias } from "@signumjs/core";
import { useTheme } from "@mui/material/styles";
import { asSingleQueryParam } from "@/app/asSingleQueryParam";
import { mapValidationError } from "@/app/mapValidationError";
import { useAppSelector } from "@/states/hooks";
import { selectIsWalletConnected } from "@/app/states/walletState";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { useTransactionMonitor } from "@/app/hooks/useTransactionMonitor";
import { AliasesDirectOffer } from "@/app/components/AliasesDirectOffer";
import { useTopLevelDomains } from "./hooks/useTopLevelDomains";
import { SearchResult } from "./sections/SearchResult";
import { AdditionalContent } from "./sections/AdditionalContent";
import { SearchAlias } from "../validation/types";
import { searchAliasSchema } from "../validation/schemas";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

export const AliasMarketplace: NextPage = () => {
  const { t } = useTranslation();
  const { ledgerService } = useLedgerService();
  const { isLoading } = useTopLevelDomains();
  const transactionMonitor = useTransactionMonitor();

  const router = useRouter();
  const { query, push } = router;

  const isWalletConnected = useAppSelector(selectIsWalletConnected);
  const theme = useTheme();
  const debouncedAliasSearchFn = useRef<any>();

  const [isSearching, setIsSearching] = useState(false);
  const [aliasList, setAliasList] = useState<Alias[]>([]);

  const methods = useForm<SearchAlias>({
    mode: "onChange",
    resolver: yupResolver(searchAliasSchema),
    defaultValues: { searchAlias: "" },
  });

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const searchTerm = watch("searchAlias");

  const requestSearch = async (term: string) => {
    if (!ledgerService || !term) return;

    const searchTermFormmated = term.trim().split(".");

    ledgerService.alias
      .fetchAliasesByName({
        aliasName: searchTermFormmated[0],
        startIndex: 0,
        count: 500,
      })
      .then((response) => {
        // @ts-ignore
        setAliasList(response?.aliases || []);
      });
  };

  const requestSearchOnOriginFromLandingPage = async () => {
    try {
      requestSearch(searchTerm);
      if (query.search) push("/alias/marketplace", {}, { shallow: true });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  let searchAliasFieldError = "";

  if (errors.searchAlias?.message) {
    searchAliasFieldError = t(
      mapValidationError(errors.searchAlias?.message),
      mapValidationError(errors.searchAlias?.message, true)
    );
  }

  useEffect(() => {
    if (query.search)
      setValue("searchAlias", asSingleQueryParam(query.search).trim());

    return () => {
      debouncedAliasSearchFn.current && debouncedAliasSearchFn.current.cancel();
    };
  }, []);

  useEffect(() => {
    setAliasList([]);

    if (searchAliasFieldError) return setAliasList([]);

    setIsSearching(true);

    if (debouncedAliasSearchFn.current) {
      debouncedAliasSearchFn.current(searchTerm);
    } else {
      setIsSearching(false);
    }
  }, [searchAliasFieldError, searchTerm]);

  useEffect(() => {
    debouncedAliasSearchFn.current = debounce((alias: string) => {
      try {
        if (!ledgerService || !alias) return;
        if (searchAliasFieldError) return setAliasList([]);

        setIsSearching(true);

        requestSearch(alias);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    }, 800);
  }, [ledgerService]);

  useEffect(() => {
    if (!ledgerService) return;
    if (!transactionMonitor) return;
    if (!searchTerm) return;

    if (transactionMonitor.monitor.type === "alias-buy") {
      requestSearchOnOriginFromLandingPage();
    }
  }, [ledgerService, transactionMonitor, searchTerm]);

  const isLoadingData = isSearching || isLoading;

  return (
    <FormProvider {...methods}>
      <Box
        mx="auto"
        width="100%"
        maxWidth={1200}
        mt={4}
        px={2}
        sx={{ minHeight: { xs: "auto", lg: "50vh", xl: "60vh" } }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {t("search")}
        </Typography>

        <Controller
          name="searchAlias"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              placeholder={t("searchAliasPlaceHolder")}
              variant="outlined"
              sx={{ width: { xs: "100%", xl: "66%" }, mb: 2 }}
              helperText={searchAliasFieldError}
              error={!!searchAliasFieldError}
              disabled={isLoading}
              InputProps={{
                style: { background: theme.palette.background.paper },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {isLoadingData && <CircularProgress />}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Grid container spacing={2} direction="row">
          <Grid item xs={12} md={8}>
            {isWalletConnected &&
              (searchTerm.length < 3 || searchAliasFieldError) && (
                <AliasesDirectOffer />
              )}

            {!isWalletConnected &&
              (searchTerm.length < 3 || searchAliasFieldError) && (
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Alert severity="info">
                    <AlertTitle>{t("info")}</AlertTitle>
                    {t("youNeedToLinkAccountNotice")}
                  </Alert>
                </Paper>
              )}

            {searchTerm && !searchAliasFieldError && (
              <SearchResult
                searchTerm={searchTerm}
                aliasList={aliasList}
                isLoading={isLoadingData}
                isValidSearchTerm={!searchAliasFieldError}
              />
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <AdditionalContent />
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};

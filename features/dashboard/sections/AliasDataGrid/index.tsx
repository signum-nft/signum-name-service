import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import { Amount } from "@signumjs/util";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { useAccount } from "@/app/hooks/useAccount";
import { useAccountAliases } from "@/app/hooks/useAccountAliases";
import { getAliasStatus } from "@/app/getAliasStatus";
import { getAliasModeUsage } from "@/app/getAliasModeUsage";
import { Data } from "./components/AliasesTable/types";
import { AliasNotFound } from "./components/AliasNotFound";
import { AliasesTable } from "./components/AliasesTable";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { Alias } from "@signumjs/core";

interface Props {
  searchString?: string;
  isLoading?: boolean;
  aliases: Alias[];
}

export const AliasDataGrid = ({
  searchString = "",
  aliases,
  isLoading = false,
}: Props) => {
  const { t } = useTranslation();
  const { accountId } = useAccount();
  const theme = useTheme();

  const { control, watch } = useForm<{ searchString: string }>({
    mode: "onChange",
    defaultValues: { searchString },
  });

  const searchAlias = watch("searchString");

  const isAliasFound = !!aliases.length;

  const aliasesAllowed: Data[] = useMemo(() => {
    if (!isAliasFound) return [];

    const mappedAliases = aliases.map((alias) => {
      const { aliasName, tldName = "", priceNQT, aliasURI } = alias;

      const status = getAliasStatus(priceNQT, alias?.buyer, accountId, true);

      const usageMode = getAliasModeUsage(aliasURI);

      const price = priceNQT
        ? Number(Amount.fromPlanck(priceNQT).getSigna())
        : 0;

      return {
        id: alias.alias,
        registeredAlias: aliasName,
        resolvableAlias: aliasName + "." + tldName,
        stld: tldName,
        renewalFee: "",
        type: usageMode,
        status,
        price,
      };
    });

    const term = searchString.toUpperCase();
    return mappedAliases.filter((alias) => {
      const { id, resolvableAlias } = alias;
      if (!searchString) return true;
      return (
        id.toUpperCase().includes(term) ||
        resolvableAlias.toUpperCase().includes(term)
      );
    });
  }, [isAliasFound, aliases, searchString, accountId]);

  const filteredAliasesFound = !!aliasesAllowed.length;

  return (
    <Grid container direction="column" spacing={2}>
      {!isAliasFound && (
        <Grid item xs={12}>
          <AliasNotFound />
        </Grid>
      )}

      {/*{isAliasFound && (*/}
      {/*  <Grid item>*/}
      {/*    <Controller*/}
      {/*      name="searchString"*/}
      {/*      control={control}*/}
      {/*      render={({ field }) => (*/}
      {/*        <TextField*/}
      {/*          {...field}*/}
      {/*          color="secondary"*/}
      {/*          placeholder={t("searchString")}*/}
      {/*          variant="outlined"*/}
      {/*          size="small"*/}
      {/*          InputProps={{*/}
      {/*            style: { background: theme.palette.background.paper },*/}
      {/*            startAdornment: (*/}
      {/*              <InputAdornment position="start">*/}
      {/*                <SearchIcon />*/}
      {/*              </InputAdornment>*/}
      {/*            ),*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      )}*/}
      {/*    />*/}
      {/*  </Grid>*/}
      {/*)}*/}

      {isAliasFound && !filteredAliasesFound && (
        <Grid item xs={12}>
          <AliasNotFound />
        </Grid>
      )}

      {filteredAliasesFound && (
        <Grid item xs={12} width="100%">
          <AliasesTable aliases={aliasesAllowed} />
        </Grid>
      )}
    </Grid>
  );
};

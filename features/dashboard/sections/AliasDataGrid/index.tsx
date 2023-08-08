import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import { Amount } from "@signumjs/util";
import { useTheme } from "@mui/material/styles";
import { useAccount } from "@/app/hooks/useAccount";
import { getAliasStatus } from "@/app/getAliasStatus";
import { getAliasModeUsage } from "@/app/getAliasModeUsage";
import { MappedAlias } from "./components/AliasesTable/types";
import { AliasNotFound } from "./components/AliasNotFound";
import { AliasesTable } from "./components/AliasesTable";

import Grid from "@mui/material/Grid";
import { Alias } from "@signumjs/core";
import { voidFn } from "@/app/voidFn";

interface Props {
  searchString?: string;
  isLoading?: boolean;
  aliases: Alias[];
  onFiltered?: (filtered: MappedAlias[]) => void;
}

export const AliasDataGrid = ({
  searchString = "",
  aliases,
  onFiltered = voidFn,
  isLoading = false,
}: Props) => {
  const { accountId } = useAccount();

  const mappedAliases: MappedAlias[] = useMemo(() => {
    return aliases.map((alias) => {
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
  }, [aliases, accountId]);

  const filteredAliases = useMemo(() => {
    const term = searchString.toUpperCase();
    const filtered = mappedAliases.filter((alias) => {
      const { id, resolvableAlias } = alias;
      if (!searchString) return true;
      return (
        id.toUpperCase().includes(term) ||
        resolvableAlias.toUpperCase().includes(term)
      );
    });

    onFiltered(filtered);
    return filtered;
  }, [mappedAliases, onFiltered, searchString]);

  const filteredAliasesFound = !!filteredAliases.length;

  return (
    <Grid container direction="column" spacing={2}>
      {!filteredAliasesFound && (
        <Grid item xs={12}>
          <AliasNotFound />
        </Grid>
      )}

      {filteredAliasesFound && (
        <Grid item xs={12} width="100%">
          <AliasesTable aliases={filteredAliases} />
        </Grid>
      )}
    </Grid>
  );
};

import { AliasNotFound } from "./AliasNotFound";
import { DomainsTable } from "./AliasesTable";

import Grid from "@mui/material/Grid";
import { MappedAlias } from "../../types/mappedAlias";
import { AliasLoading } from "./AliasLoading";
import { AccountDomain } from "@/app/types/accountData";

interface Props {
  isLoading?: boolean;
  domains: AccountDomain[];
}

export const DomainDataGrid = ({ domains, isLoading = false }: Props) => {
  const hasAliases = domains.length > 0;

  if (isLoading) {
    return (
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <AliasLoading />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container direction="column" spacing={2}>
      {!hasAliases ? (
        <Grid item xs={12}>
          <AliasNotFound />
        </Grid>
      ) : (
        <Grid item xs={12} width="100%">
          <DomainsTable domains={domains} />
        </Grid>
      )}
    </Grid>
  );
};

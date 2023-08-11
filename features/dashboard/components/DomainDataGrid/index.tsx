import { AliasNotFound } from "./AliasNotFound";
import { DomainsTable } from "./DomainsTable";

import Grid from "@mui/material/Grid";
import { AliasLoading } from "./AliasLoading";
import { MappedDomain } from "@/features/dashboard/types/mappedDomain";

interface Props {
  isLoading?: boolean;
  domains: MappedDomain[];
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

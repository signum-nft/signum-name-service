import { AliasNotFound } from "./AliasNotFound";
import { SubdomainsTable } from "./SubdomainsTable";

import Grid from "@mui/material/Grid";
import { AliasLoading } from "./AliasLoading";
import { MappedSubdomain } from "@/features/domain/types/mappedSubdomain";

interface Props {
  isLoading?: boolean;
  subdomains: MappedSubdomain[];
}

export const SubdomainDataGrid = ({ subdomains, isLoading = false }: Props) => {
  const hasAliases = subdomains.length > 0;

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
          <SubdomainsTable domains={subdomains} />
        </Grid>
      )}
    </Grid>
  );
};

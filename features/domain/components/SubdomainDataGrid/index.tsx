import { SubdomainsTable } from "./SubdomainsTable";

import Grid from "@mui/material/Grid";
import { MappedSubdomain } from "@/app/types/mappedSubdomain";
import { DomainsLoading } from "@/app/components/DomainsLoading";
import { DomainNotFound } from "@/app/components/DomainNotFound";

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
          <DomainsLoading />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container direction="column" spacing={2}>
      {!hasAliases ? (
        <Grid item xs={12}>
          <DomainNotFound />
        </Grid>
      ) : (
        <Grid item xs={12} width="100%">
          <SubdomainsTable domains={subdomains} />
        </Grid>
      )}
    </Grid>
  );
};

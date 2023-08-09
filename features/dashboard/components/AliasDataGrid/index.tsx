import { AliasNotFound } from "./AliasNotFound";
import { AliasesTable } from "./AliasesTable";

import Grid from "@mui/material/Grid";
import { MappedAlias } from "../../types/mappedAlias";

interface Props {
  isLoading?: boolean;
  aliases: MappedAlias[];
}

export const AliasDataGrid = ({ aliases, isLoading = false }: Props) => {
  const hasAliases = aliases.length > 0;

  // TODO: Loading indicator

  return (
    <Grid container direction="column" spacing={2}>
      {!hasAliases ? (
        <Grid item xs={12}>
          <AliasNotFound />
        </Grid>
      ) : (
        <Grid item xs={12} width="100%">
          <AliasesTable aliases={aliases} />
        </Grid>
      )}
    </Grid>
  );
};

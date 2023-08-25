import { MappedDomain } from "@/features/dashboard/types/mappedDomain";
import LinkedList from "fast-linked-list";
import { AccountDomain } from "@/app/types/accountData";
import { Grid } from "@mui/material";
import { DomainFilterSection } from "./DomainFilterSection";
import { DomainsInfoCard } from "./InfoCards/DomainsInfoCard";

interface Props {
  domainLists: LinkedList<AccountDomain>[];
  onFiltered: (domains: MappedDomain[]) => void;
}
export const Header = ({ domainLists, onFiltered }: Props) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <DomainFilterSection
          domainLists={domainLists}
          onFiltered={onFiltered}
        />
      </Grid>
      <Grid container direction="row" justifyContent="space-between" mt={4}>
        <Grid item xs={6} sm={4} md={3}>
          <DomainsInfoCard domainCount={7500} totalCount={14538} />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <DomainsInfoCard domainCount={7500} totalCount={14538} />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <DomainsInfoCard domainCount={7500} totalCount={14538} />
        </Grid>
      </Grid>
    </Grid>
  );
};

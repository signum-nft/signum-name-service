import { MappedDomain } from "@/features/dashboard/types/mappedDomain";
import LinkedList from "fast-linked-list";
import { AccountDomain } from "@/app/types/accountData";
import { Grid } from "@mui/material";
import { DomainFilterSection } from "./DomainFilterSection";
import { DomainsInfoCard } from "./InfoCards/DomainsInfoCard";
import { SubscriptionsInfoCard } from "./InfoCards/SubscriptionsInfoCard";
import { AliasInfoCard } from "./InfoCards/AliasInfoCard";
import { useAppSelector } from "@/states/hooks";
import { selectCurrentAccountsDomainStats } from "@/app/states/accountState";

interface Props {
  domainLists: LinkedList<AccountDomain>[];
  onFiltered: (domains: MappedDomain[]) => void;
}
export const Header = ({ domainLists, onFiltered }: Props) => {
  const stats = useAppSelector(selectCurrentAccountsDomainStats);

  const domainCount = stats?.domainCount ?? 0;
  const subdomainCount = stats?.subdomainCount ?? 0;
  const aliasCount = stats?.aliasCount ?? 0;
  const tldCount = stats?.tldCount ?? 0;

  return (
    <Grid container>
      <Grid item xs={12}>
        <DomainFilterSection
          domainLists={domainLists}
          onFiltered={onFiltered}
        />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        mt={4}
        gap={2}
      >
        <Grid item xs={12} sm={5} md={3}>
          <AliasInfoCard aliasCount={aliasCount} tldCount={tldCount} />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <DomainsInfoCard
            domainCount={domainCount}
            subdomainCount={subdomainCount}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3}>
          <SubscriptionsInfoCard totalCount={aliasCount} />
        </Grid>
      </Grid>
    </Grid>
  );
};

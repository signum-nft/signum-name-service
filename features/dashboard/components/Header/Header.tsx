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
import Stack from "@mui/material/Stack";
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
    <Grid container gap={2}>
      <Grid item xs={12}>
        <DomainFilterSection
          domainLists={domainLists}
          onFiltered={onFiltered}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={{ xs: 2, md: 4, lg: 8 }}
        >
          <AliasInfoCard aliasCount={aliasCount} tldCount={tldCount} />
          <DomainsInfoCard
            domainCount={domainCount}
            subdomainCount={subdomainCount}
          />
          <SubscriptionsInfoCard totalCount={aliasCount} />
        </Stack>
      </Grid>
    </Grid>
  );
};

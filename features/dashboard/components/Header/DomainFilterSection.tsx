import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SearchField } from "@/app/components/SearchField";
import Link from "next/link";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";
import { useAppContext } from "@/app/hooks/useAppContext";
import { useEffect, useMemo, useState } from "react";
import { asSingleQueryParam } from "@/app/asSingleQueryParam";
import { MappedDomain } from "@/features/dashboard/types/mappedDomain";
import { countSubDomains } from "@/app/countSubDomains";
import { Config } from "@/app/config";
import LinkedList from "fast-linked-list";
import { AccountDomain } from "@/app/types/accountData";
import Badge from "@mui/material/Badge";
import { TabButton } from "@/app/components/TabButton";
import { useTranslation } from "next-i18next";

interface Props {
  domainLists: LinkedList<AccountDomain>[];
  onFiltered: (domains: MappedDomain[]) => void;
}

export const DomainFilterSection = ({ domainLists, onFiltered }: Props) => {
  const { query } = useRouter();
  const { t } = useTranslation();
  const { SignumSwap } = useAppContext();
  const [activeTab, setActiveTab] = useState("");
  const [searchTerm, setSearchTerm] = useState(
    asSingleQueryParam(query.search)
  );

  const { tlds, filteredDomains } = useMemo(() => {
    const term = searchTerm.toUpperCase();
    const tlds: Record<string, number> = {};
    const filteredDomains: MappedDomain[] = [];

    for (let list of domainLists) {
      const subdomainCount = countSubDomains(list);
      const head = list.first;
      const mappedDomain: MappedDomain = {
        ...head,
        accountId: head.data?.account ?? "",
        url: head.data?.url ?? "",
        subdomainCount,
      };
      const tld = mappedDomain.tld || Config.Signum.DefaultTld;
      const aliasName = `${mappedDomain.name}:${tld}`;
      if (
        mappedDomain.id.toUpperCase().includes(term) ||
        aliasName.toUpperCase().includes(term)
      ) {
        tlds[tld] = !tlds[tld] ? 1 : tlds[tld] + 1;
        filteredDomains.push(mappedDomain);
      }
    }

    return { tlds, filteredDomains };
  }, [domainLists, searchTerm]);

  useEffect(() => {
    if (activeTab) {
      return;
    }

    if (!searchTerm) {
      const keys = Object.keys(tlds);
      if (keys.length) {
        setActiveTab(keys[0]);
      }
    } else {
      setActiveTab("");
    }
  }, [tlds, searchTerm, activeTab]);

  const filterDomainsByTld = useMemo(() => {
    if (!activeTab) return filteredDomains;
    return filteredDomains.filter(
      (domain) => domain.tld?.toLowerCase() === activeTab
    );
  }, [activeTab, filteredDomains]);

  useEffect(() => {
    onFiltered(filterDomainsByTld);
  }, [onFiltered, filterDomainsByTld]);

  return (
    <Box display="flex" flexDirection="column">
      <Stack
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Typography fontWeight={500} sx={{ fontSize: { xs: 32, lg: 42 } }}>
          {t("domain_other")}
        </Typography>

        <Stack
          flexDirection={"row"}
          alignItems="center"
          width="100%"
          justifyContent="flex-end"
          py={0}
        >
          <Box sx={{ width: { xs: "80%", md: "50%" } }}>
            <SearchField
              onChange={setSearchTerm}
              placeholder={t("searchAliasPlaceHolder")}
              value={searchTerm}
            />
          </Box>
          <Box height="100%">
            <Link
              href={`${SignumSwap}alias/marketplace?search=${searchTerm}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                sx={{
                  color: "white",
                  height: "55px",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
                disabled={filteredDomains.length > 0}
              >
                {t("getIt")}
              </Button>
            </Link>
          </Box>
        </Stack>
      </Stack>

      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" gap={2} mt={2} flexWrap="wrap">
          {Object.entries(tlds).map(([tldName, aliasCount]) => (
            <Badge key={tldName} badgeContent={aliasCount} color="secondary">
              <TabButton
                label={tldName}
                isActive={activeTab === tldName}
                onClick={() => setActiveTab(tldName)}
              />
            </Badge>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

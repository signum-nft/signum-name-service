import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo, useState } from "react";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { useAccount } from "@/app/hooks/useAccount";
import { Divider } from "@/app/components/Divider";
import { TabButton } from "@/app/components/TabButton";
import { AliasDataGrid } from "./sections/AliasDataGrid";
import { DirectOffersSection } from "./sections/DirectOffersSection";

import useSWR from "swr";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import ContactsIcon from "@mui/icons-material/Contacts";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useXTWallet } from "@/features/xtWallet/useXTWallet";
import { useRouter } from "next/router";
import { useAccountAliases } from "@/app/hooks/useAccountAliases";
import { groupBy } from "lodash";
import { record } from "zod";
import { AliasSearchField } from "@/features/dashboard/components/AliasSearchField";
import { useAppContext } from "@/app/hooks/useAppContext";
import { MappedAlias } from "@/features/dashboard/sections/AliasDataGrid/components/AliasesTable/types";

enum Tabs {
  Aliases,
  DirectOffers,
}

const DefaultTld = "signum";
export const Dashboard: NextPage = () => {
  const { t } = useTranslation();
  const { isLoading, aliases } = useAccountAliases();
  const { SignumSwap } = useAppContext();
  const [activeTab, setActiveTab] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAliases, setFilteredAliases] = useState<MappedAlias[]>([]);

  const tlds = useMemo(() => {
    return aliases.reduce((record, a) => {
      const tld = a.tldName || DefaultTld;
      record[tld] = !record[tld] ? 1 : record[tld] + 1;
      return record;
    }, {} as Record<string, number>);
  }, [aliases]);

  useEffect(() => {
    if (!searchTerm) {
      const keys = Object.keys(tlds);
      if (keys.length) {
        setActiveTab(keys[0]);
      }
    } else {
      setActiveTab("");
    }
  }, [tlds, searchTerm]);

  const containerMaxWidth = 1500;

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        mx="auto"
        maxWidth={containerMaxWidth}
        px={2}
        mt={4}
      >
        <Typography
          component="h1"
          fontWeight={500}
          sx={{ fontSize: { xs: 32, lg: 42 } }}
        >
          {t("domain_other")}
        </Typography>

        <Stack direction="row" gap={2} my={1} justifyItems="flex-end">
          <Box sx={{ flexGrow: 3, maxWidth: "600px" }}>
            <AliasSearchField onChange={setSearchTerm} />
          </Box>
          <Box>
            <Link
              href={`${SignumSwap}alias/marketplace?search=${searchTerm}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                sx={{ color: "white", height: "100%" }}
                disabled={filteredAliases.length > 0}
              >
                {t("buyAlias")}
              </Button>
            </Link>
          </Box>
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

      <Divider />

      <Box
        display="flex"
        flexDirection="column"
        mx="auto"
        maxWidth={containerMaxWidth}
        px={2}
        mb={20}
      >
        <AliasDataGrid
          aliases={aliases}
          searchString={searchTerm}
          isLoading={isLoading}
          onFiltered={setFilteredAliases}
        />
      </Box>
    </>
  );
};

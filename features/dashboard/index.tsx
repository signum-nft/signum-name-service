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
import { useXTWallet } from "@/app/hooks/useXTWallet";
import { useRouter } from "next/router";
import { useAccountAliases } from "@/app/hooks/useAccountAliases";
import { groupBy } from "lodash";
import { record } from "zod";

enum Tabs {
  Aliases,
  DirectOffers,
}

const DefaultTld = "signum";
export const Dashboard: NextPage = () => {
  const { t } = useTranslation();
  const { isLoading, aliases } = useAccountAliases();
  const [activeTab, setActiveTab] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

          {/*<Link href="/alias/marketplace" passHref>*/}
          {/*  <Button*/}
          {/*    variant="contained"*/}
          {/*    startIcon={<ShoppingCartIcon />}*/}
          {/*    sx={{ display: { xs: "none", md: "flex" }, color: "white" }}*/}
          {/*  >*/}
          {/*    {t("buyAlias")}*/}
          {/*  </Button>*/}
          {/*</Link>*/}
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
          searchString={""}
          isLoading={isLoading}
        />
      </Box>
    </>
  );
};

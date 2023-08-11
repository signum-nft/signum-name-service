import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo, useState } from "react";
import { Divider } from "@/app/components/Divider";
import { TabButton } from "@/app/components/TabButton";
import { DomainDataGrid } from "./components/DomainDataGrid";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAccountAliases } from "@/app/hooks/useAccountAliases";
import { AliasSearchField } from "@/features/dashboard/components/AliasSearchField";
import { useAppContext } from "@/app/hooks/useAppContext";
import { getAliasStatus } from "@/app/getAliasStatus";
import { getAliasModeUsage } from "@/app/getAliasModeUsage";
import { Amount } from "@signumjs/util";
import { MappedAlias } from "./types/mappedAlias";
import { useAccountDomains } from "@/app/hooks/useAccountDomains";
import { AccountDomain } from "@/app/types/accountData";

const DefaultTld = "signum";

export const Dashboard: NextPage = () => {
  const { t } = useTranslation();
  const { isLoading, aliases, accountId } = useAccountAliases();
  const { domainLists } = useAccountDomains();
  const { SignumSwap } = useAppContext();
  const [activeTab, setActiveTab] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  console.log("domain lists", domainLists);

  const { tlds, filteredAliases } = useMemo(() => {
    const term = searchTerm.toUpperCase();
    const tlds: Record<string, number> = {};
    const filteredAliases: AccountDomain[] = [];

    for (let ac of domainLists) {
      const ma = ac.first;
      const tld = ma.tld || DefaultTld;
      tlds[tld] = !tlds[tld] ? 1 : tlds[tld] + 1;
      if (
        ma.id.toUpperCase().includes(term) ||
        ma.name.toUpperCase().includes(term)
      ) {
        filteredAliases.push(ma);
      }
    }

    return { tlds, filteredAliases };
  }, [domainLists, searchTerm]);

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
              <AliasSearchField onChange={setSearchTerm} />
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
                  disabled={filteredAliases.length > 0}
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

      <Divider />

      <Box
        display="flex"
        flexDirection="column"
        mx="auto"
        maxWidth={containerMaxWidth}
        px={2}
        mb={20}
      >
        <DomainDataGrid domains={filteredAliases} isLoading={isLoading} />
      </Box>
    </>
  );
};

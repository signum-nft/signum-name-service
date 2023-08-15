import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo, useState } from "react";
import { Divider } from "@/app/components/Divider";
import { TabButton } from "@/app/components/TabButton";
import { SubdomainDataGrid } from "./components/SubdomainDataGrid";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AliasSearchField } from "@/features/dashboard/components/AliasSearchField";
import { useAppContext } from "@/app/hooks/useAppContext";
import { useAccountDomains } from "@/app/hooks/useAccountDomains";
import { MappedDomain } from "@/features/dashboard/types/mappedDomain";
import { Config } from "@/app/config";
import { countSubDomains } from "@/app/countSubDomains";
import { useAccountDomain } from "@/app/hooks/useAccountDomain";
import { router } from "next/client";
import { voidFn } from "@/app/voidFn";
import Chip from "@mui/material/Chip";
import { isClientSide } from "@/app/isClientSide";
import { useRouter } from "next/router";
import { MappedSubdomain } from "@/features/domain/types/mappedSubdomain";
import { Address } from "@signumjs/core";

const ContainerMaxWidth = 1500;

interface Props {
  domainName: string;
}

export const Domain: NextPage<Props> = ({ domainName }) => {
  const { t } = useTranslation();
  const { domain, domainList, tld, isReady } = useAccountDomain(domainName);
  const {
    Platform: { MaxSubdomains },
  } = useAppContext();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   console.log('domain page', domainList, isReady)
  //   if (isReady && !domainList) {
  //     router.replace('/404')
  //   }
  //   }, [domainList, isReady, router]);

  // countSubDomains(domainList)

  const { filteredSubdomains } = useMemo(() => {
    if (!domainList) {
      return {
        filteredSubdomains: [],
      };
    }

    const term = searchTerm.toUpperCase();
    const filteredSubdomains: MappedSubdomain[] = [];
    for (let d of domainList) {
      if (d === domainList.first) {
        continue;
      }

      let accountId = d.data?.account ?? "";
      let accountAddress = "";
      try {
        const address = Address.fromNumericId(accountId);
        accountId = address.getNumericId();
        accountAddress = address.getReedSolomonAddress(false);
      } catch (e) {
        // ignore
      }

      const mappedSubdomain: MappedSubdomain = {
        aliasId: d.id,
        aliasName: d.name.toLowerCase(),
        aliasTld: d.tld ?? Config.Signum.DefaultTld,
        url: d.data?.url ?? "",
        accountId,
        accountAddress,
        name: (d.data?.name ?? "").toLowerCase(),
        domainName: domain,
      };
      if (
        mappedSubdomain.aliasId.includes(term) ||
        mappedSubdomain.aliasName.includes(term) ||
        mappedSubdomain.name.includes(term) ||
        mappedSubdomain.accountId.includes(term) ||
        mappedSubdomain.accountAddress.toLowerCase().includes(term)
      ) {
        filteredSubdomains.push(mappedSubdomain);
      }
    }

    return { filteredSubdomains };
  }, [domainList, searchTerm]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={ContainerMaxWidth}
        mx="auto"
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
          <Box>
            <Stack flexDirection="row" gap={1} alignItems="center">
              <Typography
                fontWeight={500}
                sx={{ fontSize: { xs: 32, lg: 42 } }}
              >
                {domain}
              </Typography>
              <Chip
                sx={{
                  fontWeight: 500,
                  fontSize: 14,
                  p: 2,
                  border: 1,
                  borderColor: "divider",
                  color: "white",
                }}
                label={tld}
                color="primary"
              />
            </Stack>
            <Typography fontWeight={400} variant="body1">
              {t("subdomainCountOf", {
                subdomainCount: filteredSubdomains.length,
                maxSubdomains: MaxSubdomains,
              })}
            </Typography>
          </Box>

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
          </Stack>
        </Stack>
      </Box>

      <Divider />

      <Box
        display="flex"
        flexDirection="column"
        mx="auto"
        maxWidth={ContainerMaxWidth}
        px={2}
        mb={20}
      >
        <SubdomainDataGrid subdomains={filteredSubdomains} isLoading={false} />
      </Box>
    </>
  );
};

import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useAppSelector } from "@/states/hooks";
import { useLedgerService } from "@/app/hooks/useLedgerService";
import { useAccount } from "@/app/hooks/useAccount";
import { selectIsWalletConnected } from "@/app/states/walletState";
import { Divider } from "@/app/components/Divider";
import { Setup } from "@/app/components/Setup";
import { TabButton } from "@/app/components/TabButton";
import { AliasSection } from "./sections/AliasSection";
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

enum Tabs {
  Aliases,
  DirectOffers,
}

export const MyAliases: NextPage = () => {
  const { t } = useTranslation();
  const { ledgerService } = useLedgerService();
  const { accountId } = useAccount();
  const isWalletConnected = useAppSelector(selectIsWalletConnected);

  const [directOffersCount, SetDirectOffersCount] = useState(0);
  const [activeTab, updateActiveTab] = useState(Tabs.Aliases);
  const openAliasesTab = () => updateActiveTab(Tabs.Aliases);
  const openDirectOffersTab = () => updateActiveTab(Tabs.DirectOffers);

  useSWR(
    ledgerService ? `/aliasesOnPrivateSale` : null,
    async () => {
      if (!ledgerService) return;

      const { aliases } =
        await ledgerService.alias.fetchAccountAliasesDirectOffers({
          buyerId: accountId,
          startIndex: 0,
          count: 11,
        });

      SetDirectOffersCount(aliases.length);
    },
    {
      dedupingInterval: 0,
    }
  );

  if (!isWalletConnected) return <Setup />;

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
          {t("alias_other")}
        </Typography>

        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" gap={2} mt={2} flexWrap="wrap">
            <TabButton
              icon={<ContactsIcon />}
              label={t("myAlias_other")}
              description={t("myAliasesTabDescription")}
              isActive={activeTab === Tabs.Aliases}
              onClick={openAliasesTab}
            />

            <Badge badgeContent={directOffersCount} max={10} color="primary">
              <TabButton
                icon={<MonetizationOnIcon />}
                label={t("accountDirectOffers")}
                description={t("accountDirectOffersTabDescription")}
                isActive={activeTab === Tabs.DirectOffers}
                onClick={openDirectOffersTab}
              />
            </Badge>
          </Stack>

          <Link href="/alias/marketplace" passHref>
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{ display: { xs: "none", md: "flex" }, color: "white" }}
            >
              {t("buyAlias")}
            </Button>
          </Link>
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
        {activeTab === Tabs.Aliases && <AliasSection />}
        {activeTab === Tabs.DirectOffers && <DirectOffersSection />}
      </Box>
    </>
  );
};

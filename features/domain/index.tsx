import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { useMemo, useState } from "react";
import { Divider } from "@/app/components/Divider";
import { SubdomainDataGrid } from "./components/SubdomainDataGrid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useAppContext } from "@/app/hooks/useAppContext";
import { Config } from "@/app/config";
import { useAccountDomain } from "@/app/hooks/useAccountDomain";
import Chip from "@mui/material/Chip";
import { MappedSubdomain } from "@/app/types/mappedSubdomain";
import { Address } from "@signumjs/core";
import { SearchField } from "@/app/components/SearchField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/PlaylistAdd";
import { useAppDispatch } from "@/states/hooks";
import { subdomainOperationsActions } from "@/app/states/subdomainOperationState";
import { createAliasNameForSubdomain } from "@/app/createAliasNameForSubdomain";
import Tooltip from "@mui/material/Tooltip";
import { useMonitoredTransaction } from "@/app/hooks/useMonitoredTransaction";
import { voidFn } from "@/app/voidFn";
import LoopIcon from "@mui/icons-material/Loop";

const ContainerMaxWidth = 1500;

interface Props {
  domainName: string;
}

export const Domain: NextPage<Props> = ({ domainName }) => {
  const { t } = useTranslation();
  const { domain, domainList, tld } = useAccountDomain(domainName);
  const {
    Platform: { MaxSubdomains },
  } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();

  const { isPending: isAddingPending } = useMonitoredTransaction({
    type: `alias-new-${domainName}`,
  });
  const { isPending: isDeletingPending } = useMonitoredTransaction({
    type: `alias-delete-${domainName}`,
  });

  const { filteredSubdomains } = useMemo(() => {
    if (!domainList) {
      console.log("No domain list");
      return {
        filteredSubdomains: [],
      };
    }

    const term = searchTerm.toLowerCase();
    const filteredSubdomains: MappedSubdomain[] = [];
    domainList.forEach((d, token) => {
      if (d === domainList.first) {
        return;
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
        __listElement: token,
      };

      if (
        mappedSubdomain.aliasId.includes(term) ||
        mappedSubdomain.aliasName.includes(term) ||
        mappedSubdomain.name.includes(term) ||
        mappedSubdomain.accountId.includes(term) ||
        mappedSubdomain.accountAddress.toLowerCase().includes(term) ||
        mappedSubdomain.url.toLowerCase().includes(term)
      ) {
        filteredSubdomains.push(mappedSubdomain);
      }
    });

    return { filteredSubdomains };
  }, [domain, domainList, searchTerm]);

  const handleAddNewSubdomain = () => {
    if (!domainList) return;
    const newAliasName = createAliasNameForSubdomain(domain);
    const head = domainList.first;
    dispatch(
      subdomainOperationsActions.openModal({
        action: "add",
        subdomain: {
          __listElement: domainList.lastToken,
          accountAddress: "",
          accountId: "",
          aliasId: "",
          aliasName: newAliasName,
          aliasTld: head.tld ?? Config.Signum.DefaultTld,
          domainName: head.name,
          name: "",
          url: "",
        },
      })
    );
  };

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
            gap={2}
          >
            <Box sx={{ width: { xs: "80%", md: "50%" } }}>
              <SearchField
                onChange={setSearchTerm}
                placeholder={t("searchSubdomainsPlaceholder")}
              />
            </Box>
            <Box height="100%">
              {isAddingPending || isDeletingPending ? (
                <Tooltip title={t("processingHint")} arrow placement="top">
                  <Button
                    variant="contained"
                    startIcon={
                      <LoopIcon
                        sx={{
                          animation: "spin 4s linear infinite",
                          "@keyframes spin": {
                            "0%": {
                              transform: "rotate(360deg)",
                            },
                            "100%": {
                              transform: "rotate(0deg)",
                            },
                          },
                        }}
                      />
                    }
                    color="secondary"
                    sx={{
                      color: "#222",
                      height: "55px",
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    disabled={true}
                    onClick={voidFn}
                  >
                    {isDeletingPending &&
                      !isAddingPending &&
                      t("deletingSubdomain")}
                    {isAddingPending &&
                      !isDeletingPending &&
                      t("addingNewSubdomain")}
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title={t("addNewSubdomainHint")} arrow placement="top">
                  <Button
                    className="glance-effect"
                    variant="contained"
                    startIcon={<AddIcon />}
                    color="secondary"
                    sx={{
                      color: "#222",
                      height: "55px",
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    disabled={filteredSubdomains.length >= MaxSubdomains}
                    onClick={handleAddNewSubdomain}
                  >
                    {t("addNewSubdomain")}
                  </Button>
                </Tooltip>
              )}
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

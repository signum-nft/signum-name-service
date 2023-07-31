import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import { Alias } from "@signumjs/core";
import { PaperCard } from "@/app/components/PaperCard";
import { LoadingIndicator } from "@/app/components/LoadingIndicator";
import { useTopLevelDomains } from "../../hooks/useTopLevelDomains";
import { ResultItem } from "./components/ResultItem";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  searchTerm: string;
  aliasList: Alias[];
  isLoading: boolean;
  isValidSearchTerm: boolean;
}

export const SearchResult = ({
  searchTerm,
  isLoading,
  aliasList,
  isValidSearchTerm,
}: Props) => {
  const { t } = useTranslation();
  const { tlds } = useTopLevelDomains();

  const isValidTld = useMemo(() => {
    if (!searchTerm || !tlds) return true;

    const tldNames = tlds.map((tld) => tld.aliasName);

    // Search for specific TLD
    // Detect if user searched with an specific tld
    const searchTermFormmated = searchTerm.trim().split(".");
    const searchTermTLD = searchTermFormmated[1] || "";

    if (!searchTermTLD) return true;

    return tldNames.includes(searchTermTLD);
  }, [searchTerm, tlds]);

  // Format results, show alias suggestions based on different TLDS
  const processedResults = useMemo(() => {
    if (!searchTerm || !tlds || isLoading) return [];

    // Search for specific TLD
    // Detect if user searched with an specific tld
    const searchTermFormmated = searchTerm.trim().split(".");
    const searchTermName = searchTermFormmated[0] || "";
    const searchTermTLD = searchTermFormmated[1] || "";

    // Filter result tlds - collect the found tlds
    const foundTlds = aliasList.map((alias) => alias.tldName);

    // Filter tlds - just find the unused ones
    const availableTlds = tlds.filter((tld) => {
      return !foundTlds.includes(tld.aliasName);
    });

    // Create unsused aliases
    const unUsedAliases: Alias[] = availableTlds.map((tld) => ({
      account: "",
      accountRS: "",
      alias: tld.alias,
      aliasName: searchTermName,
      aliasURI: "",
      buyer: "",
      priceNQT: "",
      timestamp: 0,
      tld: tld.alias,
      tldName: tld.aliasName,
    }));

    // Merge list of unused aliases with found aliases
    const mergedTlds = [...aliasList, ...unUsedAliases];

    // Sort results, always make .signum stld go first
    const signaTld = mergedTlds.find((tld) => tld.tld === "0");

    // If user is searching with an specific TLD the specific TLD must go first
    const specificTld = mergedTlds.find((tld) => tld.tldName === searchTermTLD);

    // Delete signum tld and specific tld from current merged list
    const filteredMergedTlds = mergedTlds
      .filter((tld) => tld.tld !== "0")
      .filter((tld) => tld.tldName !== searchTermTLD);

    // Show updated results with priority list
    let updatedMergedTlds = [];

    if (specificTld && searchTermTLD !== "signum")
      updatedMergedTlds.push(specificTld);

    if (signaTld) updatedMergedTlds.push(signaTld);

    updatedMergedTlds.push(...filteredMergedTlds);

    return updatedMergedTlds;
  }, [searchTerm, tlds, aliasList, isLoading]);

  return (
    <Stack direction="column" spacing={2}>
      {!isValidTld && !isLoading && (
        <PaperCard>
          <Alert severity="error">
            {t("invalidStld")}

            <Typography></Typography>
          </Alert>
        </PaperCard>
      )}

      <PaperCard>
        {isLoading && isValidSearchTerm && <LoadingIndicator height={200} />}

        {!isLoading && isValidSearchTerm && (
          <Stack direction="column" spacing={1}>
            <Box p={1} sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Typography variant="h6">
                {t("result", { count: processedResults.length })}
              </Typography>
            </Box>

            {processedResults.map((alias) => (
              <ResultItem key={alias.alias} {...alias} />
            ))}
          </Stack>
        )}

        {!isLoading && !processedResults.length && (
          <h1>{t("noResultsFound")}</h1>
        )}
      </PaperCard>
    </Stack>
  );
};

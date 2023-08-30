import type { NextPage } from "next";
import { useState } from "react";
import { Divider } from "@/app/components/Divider";
import { DomainDataGrid } from "./components/DomainDataGrid";
import Box from "@mui/material/Box";
import { useAccountDomains } from "@/app/hooks/useAccountDomains";
import { MappedDomain } from "@/features/dashboard/types/mappedDomain";
import { Header } from "./components/Header";

const ContainerMaxWidth = 1500;
export const Dashboard: NextPage = () => {
  const { domainLists, isLoading } = useAccountDomains();

  const [filteredDomains, setFilteredDomains] = useState<MappedDomain[]>([]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={ContainerMaxWidth}
      mx="auto"
      px={2}
      mt={4}
    >
      <Header onFiltered={setFilteredDomains} domainLists={domainLists} />
      <Divider />
      <DomainDataGrid domains={filteredDomains} isLoading={isLoading} />
    </Box>
  );
};

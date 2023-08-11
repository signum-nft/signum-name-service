import { useMemo, useState, MouseEvent } from "react";
import { Order } from "@/app/types/order";
import { stableSort, getComparator } from "@/app/tableMethods";
import { PaperCard } from "@/app/components/PaperCard";
import { Header as TableHeader } from "./components/Header";
import { BodyRow } from "./components/BodyRow";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { MappedAlias } from "@/features/dashboard/types/mappedAlias";
import { AccountDomain } from "@/app/types/accountData";

interface Props {
  domains: AccountDomain[];
}

export const DomainsTable = ({ domains }: Props) => {
  const [orderBy, setOrderBy] = useState<keyof AccountDomain>("name");
  const [order, setOrder] = useState<Order>("asc");

  const handleRequestSort = (
    _event: MouseEvent<unknown>,
    property: keyof AccountDomain
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const rows = useMemo(() => {
    return stableSort(domains, getComparator(order, orderBy)).map((row) => (
      <BodyRow key={row.id} {...row} />
    ));
  }, [order, orderBy, domains]);

  return (
    <PaperCard>
      <TableContainer>
        <Table sx={{ minWidth: 550 }}>
          <TableHeader
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderBy}
          />

          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </PaperCard>
  );
};

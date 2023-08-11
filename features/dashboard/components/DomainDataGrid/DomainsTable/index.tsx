import { useMemo, useState, MouseEvent } from "react";
import { Order } from "@/app/types/order";
import { stableSort, getComparator } from "@/app/tableMethods";
import { PaperCard } from "@/app/components/PaperCard";
import { Header as TableHeader } from "./components/Header";
import { BodyRow } from "./components/BodyRow";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { MappedDomain } from "@/features/dashboard/types/mappedDomain";
import { TablePagination } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

interface Props {
  domains: MappedDomain[];
}

export const DomainsTable = ({ domains }: Props) => {
  const { t } = useTranslation();
  const [orderBy, setOrderBy] = useState<keyof MappedDomain>("name");
  const [order, setOrder] = useState<Order>("asc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleRequestSort = (
    _event: MouseEvent<unknown>,
    property: keyof MappedDomain
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (e: any) => {
    setPage(e.target.value);
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(e.target.value);
  };

  const rows = useMemo(() => {
    // @ts-ignore
    return stableSort<MappedDomain>(domains, getComparator(order, orderBy)).map(
      (row) => <BodyRow key={row.id} {...row} />
    );
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={(args) => (
          <Typography variant="body2">
            {t("paginationDisplayedRows", args)}
          </Typography>
        )}
        labelRowsPerPage={
          <Typography variant="body2">{t("paginationRowsPerPage")}</Typography>
        }
      />
    </PaperCard>
  );
};

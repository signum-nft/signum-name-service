import { useMemo, useState, MouseEvent, useRef } from "react";
import { Order } from "@/app/types/order";
import { stableSort, getComparator } from "@/app/tableMethods";
import { PaperCard } from "@/app/components/PaperCard";
import { Header as TableHeader } from "./components/Header";
import { DomainItemRow } from "./components/DomainItemRow";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { MappedDomain } from "@/features/dashboard/types/mappedDomain";
import { TablePagination } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import chunk from "lodash/chunk";

interface Props {
  domains: MappedDomain[];
}

const DefaultRowsPerPage = 10;

export const DomainsTable = ({ domains }: Props) => {
  const rowsPerPage = useRef(DefaultRowsPerPage);
  const page = useRef(0);
  const { t } = useTranslation();
  const [orderBy, setOrderBy] = useState<keyof MappedDomain>("name");
  const [order, setOrder] = useState<Order>("asc");
  const [paginationChanged, setPaginationChanged] = useState(0);

  const handleRequestSort = (
    _event: MouseEvent<unknown>,
    property: keyof MappedDomain
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: any, p: any) => {
    page.current = p;
    setPaginationChanged(paginationChanged + 1); // forcing re-render
  };

  const handleChangeRowsPerPage = (e: any) => {
    rowsPerPage.current = e.target.value;
    page.current = 0;
    setPaginationChanged(paginationChanged + 1); // forcing re-render
  };

  const sortedRows = useMemo(() => {
    // @ts-ignore
    return stableSort<MappedDomain>(domains, getComparator(order, orderBy)).map(
      (domain) => <DomainItemRow key={domain.id} domain={domain} />
    );
  }, [order, orderBy, domains]);

  const pagedRows = useMemo(() => {
    return chunk(sortedRows, rowsPerPage.current);
  }, [paginationChanged, sortedRows]); // keep paginationChanged as trigger!

  return (
    <PaperCard>
      <TableContainer>
        <Table sx={{ minWidth: 550 }}>
          <TableHeader
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderBy}
          />

          <TableBody>{pagedRows[page.current]}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={sortedRows.length}
        rowsPerPage={rowsPerPage.current}
        page={page.current}
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

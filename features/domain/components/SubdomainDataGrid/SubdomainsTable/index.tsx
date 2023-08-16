import { useMemo, useState, MouseEvent, useRef } from "react";
import { Order } from "@/app/types/order";
import { stableSort, getComparator } from "@/app/tableMethods";
import { PaperCard } from "@/app/components/PaperCard";
import { Header as TableHeader } from "./components/Header";
import { SubdomainItemRow } from "./components/SubdomainItemRow/SubdomainItemRow";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { TablePagination } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import chunk from "lodash/chunk";
import { MappedSubdomain } from "@/features/domain/types/mappedSubdomain";

interface Props {
  domains: MappedSubdomain[];
}

const DefaultRowsPerPage = 10;

export const SubdomainsTable = ({ domains }: Props) => {
  const rowsPerPage = useRef(DefaultRowsPerPage);
  const page = useRef(0);
  const { t } = useTranslation();
  const [orderBy, setOrderBy] = useState<keyof MappedSubdomain | "">("");
  const [order, setOrder] = useState<Order>("asc");
  const [paginationChanged, setPaginationChanged] = useState(0);

  const handleRequestSort = (
    _event: MouseEvent<unknown>,
    property: keyof MappedSubdomain
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: any, p: any) => {
    page.current = p;
    setPaginationChanged(paginationChanged + 1);
  };

  const handleChangeRowsPerPage = (e: any) => {
    rowsPerPage.current = e.target.value;
    page.current = 0;
    setPaginationChanged(paginationChanged + 1);
  };

  const sortedRows = useMemo(() => {
    let subdomains = domains;
    if (orderBy) {
      subdomains = stableSort<MappedSubdomain>(
        domains,
        // @ts-ignore
        getComparator(order, orderBy)
      );
    }
    return subdomains.map((subdomain) => (
      <SubdomainItemRow key={subdomain.aliasId} subdomain={subdomain} />
    ));
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
        rowsPerPageOptions={[5, 10, 25]}
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

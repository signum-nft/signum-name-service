import { useMemo, useState, MouseEvent, useRef } from "react";
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
import { MappedSubdomain } from "@/app/types/mappedSubdomain";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { TableSettings, appActions } from "@/app/states/appState";

interface Props {
  domains: MappedSubdomain[];
}

const DefaultRowsPerPage = 10;

export const SubdomainsTable = ({ domains }: Props) => {
  const page = useRef(0);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const tableSettings = useAppSelector<TableSettings>(
    (state) => state.appState.subdomainTableSettings
  );
  const [pageChange, setPageChange] = useState(0);

  function forceUpdate() {
    setPageChange(pageChange + 1);
  }

  const handleRequestSort = (
    _event: MouseEvent<unknown>,
    property: keyof MappedSubdomain
  ) => {
    const { sortBy, sortDirection } = tableSettings;
    dispatch(
      appActions.setTableSettings({
        table: "subdomains",
        sortBy: property,
        sortDirection:
          sortBy === property && sortDirection === "asc" ? "desc" : "asc",
      })
    );
  };

  const handleChangePage = (_: any, p: any) => {
    page.current = p;
    forceUpdate();
  };

  const handleChangeRowsPerPage = (e: any) => {
    dispatch(
      appActions.setTableSettings({
        table: "subdomains",
        itemsPerPage: e.target.value,
      })
    );
    page.current = 0;
  };

  const sortedRows = useMemo(() => {
    const { sortBy, sortDirection } = tableSettings;
    return stableSort<MappedSubdomain>(
      domains,
      // @ts-ignore
      getComparator(sortDirection, sortBy)
    ).map((subdomain) => (
      <SubdomainItemRow key={subdomain.aliasId} subdomain={subdomain} />
    ));
  }, [tableSettings, domains]);

  const pagedRows = useMemo(() => {
    return chunk(sortedRows, tableSettings.itemsPerPage);
  }, [pageChange, sortedRows, tableSettings.itemsPerPage]); // keep pageChange as trigger!

  return (
    <PaperCard>
      <TableContainer>
        <Table sx={{ minWidth: 550 }}>
          <TableHeader
            onRequestSort={handleRequestSort}
            order={tableSettings.sortDirection}
            orderBy={tableSettings.sortBy}
          />

          <TableBody>{pagedRows[page.current]}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedRows.length}
        rowsPerPage={tableSettings.itemsPerPage}
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

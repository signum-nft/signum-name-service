import { useMemo, useState, MouseEvent, useRef } from "react";
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
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { appActions, TableSettings } from "@/app/states/appState";
interface Props {
  domains: MappedDomain[];
}

export const DomainsTable = ({ domains }: Props) => {
  const dispatch = useAppDispatch();
  const tableSettings = useAppSelector<TableSettings>(
    (state) => state.appState.domainTableSettings
  );
  const page = useRef(0);
  const { t } = useTranslation();
  const [pageChange, setPageChange] = useState(0);

  function forceUpdate() {
    setPageChange(pageChange + 1);
  }
  const handleRequestSort = (
    _event: MouseEvent<unknown>,
    property: keyof MappedDomain
  ) => {
    const { sortBy, sortDirection } = tableSettings;
    dispatch(
      appActions.setTableSettings({
        table: "domains",
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
        table: "domains",
        itemsPerPage: e.target.value,
      })
    );
    page.current = 0;
  };

  const sortedRows = useMemo(() => {
    const { sortBy, sortDirection } = tableSettings;
    return stableSort<MappedDomain>(
      domains,
      // @ts-ignore
      getComparator(sortDirection, sortBy)
    ).map((domain) => <DomainItemRow key={domain.id} domain={domain} />);
  }, [tableSettings, domains]);

  const pagedRows = useMemo(() => {
    return chunk(sortedRows, tableSettings.itemsPerPage);
  }, [pageChange, sortedRows, tableSettings]); // keep pageChange as trigger!

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
        rowsPerPageOptions={[5, 10, 25, 50]}
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

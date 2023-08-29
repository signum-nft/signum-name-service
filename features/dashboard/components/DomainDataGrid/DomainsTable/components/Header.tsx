import { useTranslation } from "next-i18next";
import { MouseEvent } from "react";
import { useTheme } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import { Order } from "@/app/types/order";

import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import TableSortLabel from "@mui/material/TableSortLabel";
import { MappedDomain } from "@/features/dashboard/types/mappedDomain";

interface HeadCell {
  id: keyof MappedDomain;
  label: string;
  secondLabel?: string;
}

const getHeadCells = (): HeadCell[] => [
  {
    id: "name",
    label: "aliasName",
  },
  {
    id: "tld",
    label: "STLD",
  },
  {
    id: "accountId",
    label: "account",
  },
  {
    id: "url",
    label: "linkedUrl",
  },
  {
    id: "subdomainCount",
    label: "subdomainCount",
  },
];

interface Props {
  orderBy: keyof MappedDomain;
  order: Order;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof MappedDomain
  ) => void;
}

export const Header = ({ orderBy, order, onRequestSort }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const createSortHandler =
    (property: keyof MappedDomain) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const stylingColumnInMobile = {
    display: { xs: "none", lg: "table-cell" },
  };

  return (
    <TableHead>
      <TableRow
        sx={{
          background: theme.palette.action.hover,
        }}
      >
        {getHeadCells().map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              display: stylingColumnInMobile.display,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="body2">
                {t(headCell.label) + "  "}

                {headCell.secondLabel && (
                  <Typography
                    component="span"
                    fontSize={12}
                    color="textSecondary"
                  >
                    {headCell.secondLabel}
                  </Typography>
                )}
              </Typography>

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" && "sorted descending"}
                  {order === "asc" && "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}

        <TableCell sx={{ display: stylingColumnInMobile.display }}>
          <Typography variant="body2">{t("action_other")}</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

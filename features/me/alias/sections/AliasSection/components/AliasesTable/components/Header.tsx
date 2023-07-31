import { useTranslation } from "next-i18next";
import { MouseEvent } from "react";
import { useTheme } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import { getNativeTicker } from "@/app/getNativeTicker";
import { Order } from "@/app/types/order";
import { HeadCell, Data } from "../types";

import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import TableSortLabel from "@mui/material/TableSortLabel";

const ticker = getNativeTicker();

const headCells: readonly HeadCell[] = [
  {
    id: "registeredAlias",
    label: "registeredAlias",
  },
  {
    id: "stld",
    label: "STLD",
  },
  {
    id: "resolvableAlias",
    label: "resolvableAlias",
  },
  {
    id: "renewalFee",
    label: "renewalFee",
  },
  {
    id: "type",
    label: "type",
  },
  {
    id: "status",
    label: "status",
  },
  {
    id: "price",
    label: "price",
    secondLabel: `(${ticker})`,
  },
];

interface Props {
  orderBy: keyof Data;
  order: Order;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Data) => void;
}

export const Header = ({ orderBy, order, onRequestSort }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const createSortHandler =
    (property: keyof Data) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const stylingColumnInMobile = {
    display: { xs: "none", lg: "table-cell" },
  };

  const allowedColumnsInMobile: (keyof Data)[] = [
    "registeredAlias",
    "resolvableAlias",
    "stld",
    "renewalFee",
    "type",
    "status",
    "price",
  ];

  return (
    <TableHead>
      <TableRow
        sx={{
          background: theme.palette.action.hover,
        }}
      >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              display: !allowedColumnsInMobile.includes(headCell.id)
                ? stylingColumnInMobile.display
                : null,
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

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
import { MappedSubdomain } from "@/app/types/mappedSubdomain";

interface HeadCell {
  id: keyof MappedSubdomain;
  label: string;
  secondLabel?: string;
}

const getHeadCells = (): HeadCell[] => [
  {
    id: "aliasName",
    label: "aliasName",
  },
  {
    id: "name",
    label: "subdomainName",
  },
  {
    id: "accountId",
    label: "account",
  },
  {
    id: "url",
    label: "linkedUrl",
  },
];

interface Props {
  orderBy: string;
  order: Order;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof MappedSubdomain
  ) => void;
}

export const Header = ({ orderBy, order, onRequestSort }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const createSortHandler =
    (property: keyof MappedSubdomain) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
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

        <TableCell sx={{ display: "table-cell" }}>
          <Typography variant="body2">{t("action_other")}</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

import { useTranslation } from "next-i18next";
import { formatAmount } from "@/app/formatAmount";
import { StyledTableRow } from "@/app/components/Table/StyledTableRow";
import { useActiveMarketData } from "@/app/hooks/useActiveMarketData";
import { AliasActionButtons } from "@/app/components/AliasActionButtons";
import { AliasTypeChip } from "./components/AliasTypeChip";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { MappedAlias } from "@/features/dashboard/types/mappedAlias";
import { AccountDomain } from "@/app/types/accountData";

export const BodyRow = ({ id, name, tld, price, status }: AccountDomain) => {
  const { t } = useTranslation();
  const activeMarketData = useActiveMarketData();

  return (
    <StyledTableRow key={id}>
      <TableCell>
        <Typography variant="body2">{name}</Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{tld || t("noStld")}</Typography>
      </TableCell>

      <TableCell>
        <Stack direction="column" spacing={1}>
          <Tooltip title={`${t("thisWayInteractAlias")}`} arrow placement="top">
            <Chip variant="outlined" label={`${name}:${tld}`} />
          </Tooltip>

          {tld === "signum" && (
            <Tooltip
              title={`${t("thisWayInteractAlias")}`}
              arrow
              placement="top"
            >
              <Chip variant="outlined" label={name} />
            </Tooltip>
          )}
        </Stack>
      </TableCell>

      {/*<TableCell>*/}
      {/*  <RenewalFeeIndicator id={id} />*/}
      {/*</TableCell>*/}

      {/*<TableCell>*/}
      {/*  <AliasTypeChip type={type} />*/}
      {/*</TableCell>*/}

      <TableCell>
        <Typography variant="body2">{t(status)}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{price ? formatAmount(price) : "-"}</Typography>

        {!!price && (
          <Typography fontSize={12} color="textSecondary">
            {`≈ ${activeMarketData.ticker} ${formatAmount(
              price * activeMarketData.price,
              false,
              "",
              true
            )}`}
          </Typography>
        )}
      </TableCell>

      <TableCell
        sx={{
          display: { xs: "none", lg: "table-cell" },
        }}
      >
        <AliasActionButtons id={id} name={name} status={status} />
      </TableCell>
    </StyledTableRow>
  );
};

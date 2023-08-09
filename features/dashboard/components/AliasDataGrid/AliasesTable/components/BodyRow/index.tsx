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

export const BodyRow = ({
  id,
  registeredAlias,
  resolvableAlias,
  stld,
  type,
  price,
  status,
}: MappedAlias) => {
  const { t } = useTranslation();
  const activeMarketData = useActiveMarketData();

  return (
    <StyledTableRow key={id}>
      <TableCell>
        <Typography variant="body2">{registeredAlias}</Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{stld || t("noStld")}</Typography>
      </TableCell>

      <TableCell>
        <Stack direction="column" spacing={1}>
          <Tooltip title={`${t("thisWayInteractAlias")}`} arrow placement="top">
            <Chip variant="outlined" label={resolvableAlias} />
          </Tooltip>

          {stld === "signum" && (
            <Tooltip
              title={`${t("thisWayInteractAlias")}`}
              arrow
              placement="top"
            >
              <Chip variant="outlined" label={registeredAlias} />
            </Tooltip>
          )}
        </Stack>
      </TableCell>

      {/*<TableCell>*/}
      {/*  <RenewalFeeIndicator id={id} />*/}
      {/*</TableCell>*/}

      <TableCell>
        <AliasTypeChip type={type} />
      </TableCell>

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
        <AliasActionButtons id={id} name={resolvableAlias} status={status} />
      </TableCell>
    </StyledTableRow>
  );
};

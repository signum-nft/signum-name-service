import { useTranslation } from "next-i18next";
import { formatAmount } from "@/app/formatAmount";
import { StyledTableRow } from "@/app/components/Table/StyledTableRow";
import { AliasActionButtons } from "@/app/components/AliasActionButtons";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { MappedDomain } from "@/features/dashboard/types/mappedDomain";
import { CopyableText } from "@/app/components/CopyableText";
import { asDomainString } from "@/app/asDomainString";
import { useRouter } from "next/router";

interface Props {
  name: string;
  tld?: string;
}

export const DomainItemRow = ({
  id,
  name,
  tld,
  price,
  status,
  subdomainCount,
}: MappedDomain) => {
  const { t } = useTranslation();
  const router = useRouter();
  const handleOnRowClick = () => {
    router.push(`/domains/${name.toLowerCase()}:${tld?.toLowerCase()}`);
  };

  return (
    <StyledTableRow key={id} onClick={handleOnRowClick}>
      <TableCell>
        <Typography variant="body2">{name}</Typography>
        <CopyableText textToCopy={asDomainString({ name, tld })} />
      </TableCell>

      <TableCell>
        <Typography variant="body2">{tld || t("noStld")}</Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{subdomainCount}</Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{t(status)}</Typography>
      </TableCell>

      <TableCell>
        <Typography>{price ? formatAmount(price) : "-"}</Typography>

        {/*{!!price && (*/}
        {/*  <Typography fontSize={12} color="textSecondary">*/}
        {/*    {`≈ ${activeMarketData.ticker} ${formatAmount(*/}
        {/*      price * activeMarketData.price,*/}
        {/*      false,*/}
        {/*      "",*/}
        {/*      true*/}
        {/*    )}`}*/}
        {/*  </Typography>*/}
        {/*)}*/}
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

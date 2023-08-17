import { useTranslation } from "next-i18next";
import { formatAmount } from "@/app/formatAmount";
import { StyledTableRow } from "@/app/components/Table/StyledTableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { MappedDomain } from "@/features/dashboard/types/mappedDomain";
import { CopyableText } from "@/app/components/CopyableText";
import { asDomainString } from "@/app/asDomainString";
import { useRouter } from "next/router";
import { DomainActionButtons } from "./DomainActionButtons";

interface Props {
  domain: MappedDomain;
}

export const DomainItemRow = ({ domain }: Props) => {
  const { id, name, tld, price, status, subdomainCount } = domain;

  const { t } = useTranslation();
  const router = useRouter();
  const handleOnRowClick = () => {
    router.push(`/domain/${name.toLowerCase()}:${tld?.toLowerCase()}`);
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
          display: "table-cell",
          width: { sm: "50px", md: "90px" },
        }}
      >
        <DomainActionButtons domain={domain} />
      </TableCell>
    </StyledTableRow>
  );
};

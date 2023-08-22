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

  return (
    <StyledTableRow key={id} clickable={false}>
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

import { useTranslation } from "next-i18next";
import { StyledTableRow } from "@/app/components/Table/StyledTableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { MappedDomain } from "@/features/dashboard/types/mappedDomain";
import { CopyableText } from "@/app/components/CopyableText";
import { asDomainString } from "@/app/asDomainString";
import { ActionButtons } from "./ActionButtons";
import { WithNoValueSet } from "@/app/components/WithNoValueSet";
import Link from "next/link";
import { asAccountAddress } from "@/app/asAccountAddress";

interface Props {
  domain: MappedDomain;
}

function safeAsAccountAddress(accountId: string): string {
  try {
    return asAccountAddress(accountId).getReedSolomonAddress();
  } catch (e: any) {
    // ignore
  }
  return "";
}

export const DomainItemRow = ({ domain }: Props) => {
  const { id, name, tld, price, status, subdomainCount, data } = domain;

  const { t } = useTranslation();

  const accountId = data?.account ?? "";
  const accountRS = safeAsAccountAddress(data?.account ?? "");
  const url = data?.url ?? "";

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

      <TableCell>
        <WithNoValueSet hasValue={Boolean(accountId)}>
          <CopyableText
            variant="body2"
            textToCopy={accountRS}
            sx={{ color: undefined }}
          />
          <CopyableText textToCopy={accountId} />
        </WithNoValueSet>
      </TableCell>

      <TableCell>
        <WithNoValueSet hasValue={Boolean(url)}>
          <Link href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </Link>
        </WithNoValueSet>
      </TableCell>

      <TableCell
        sx={{
          display: "table-cell",
          width: { sm: "50px", md: "90px" },
        }}
      >
        <ActionButtons domain={domain} />
      </TableCell>
    </StyledTableRow>
  );
};

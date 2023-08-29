import { StyledTableRow } from "@/app/components/Table/StyledTableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { CopyableText } from "@/app/components/CopyableText";
import { MappedSubdomain } from "@/app/types/mappedSubdomain";
import { asSubdomainString } from "@/app/asSubdomainString";
import Link from "next/link";
import { ActionButtons } from "./ActionButtons";
import { WithNoValueSet } from "@/app/components/WithNoValueSet";

interface Props {
  subdomain: MappedSubdomain;
}

export const SubdomainItemRow = ({ subdomain }: Props) => {
  const {
    aliasId,
    name,
    aliasName,
    url,
    aliasTld,
    domainName,
    accountAddress,
    accountId,
  } = subdomain;

  return (
    <StyledTableRow key={aliasId} clickable={false}>
      <TableCell>
        <Typography variant="body2">{aliasName}</Typography>
      </TableCell>

      <TableCell>
        <WithNoValueSet hasValue={Boolean(name)}>
          <Typography variant="body2">{name}</Typography>
          <CopyableText
            textToCopy={asSubdomainString({
              subdomain: name,
              tld: aliasTld,
              domain: domainName,
            })}
          />
        </WithNoValueSet>
      </TableCell>

      <TableCell>
        <WithNoValueSet hasValue={Boolean(accountId)}>
          <CopyableText variant="body2" textToCopy={accountAddress} />
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
        <ActionButtons subdomain={subdomain} />
      </TableCell>
    </StyledTableRow>
  );
};

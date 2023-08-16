import { useTranslation } from "next-i18next";
import { StyledTableRow } from "@/app/components/Table/StyledTableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { CopyableText } from "@/app/components/CopyableText";
import { MappedSubdomain } from "@/features/domain/types/mappedSubdomain";
import { asSubdomainString } from "@/app/asSubdomainString";
import Link from "next/link";
import { ActionButtons } from "./ActionButtons";

export const SubdomainItemRow = ({
  aliasId,
  name,
  aliasName,
  url,
  aliasTld,
  domainName,
  accountAddress,
  accountId,
}: MappedSubdomain) => {
  const { t } = useTranslation();

  return (
    <StyledTableRow key={aliasId} clickable={false}>
      <TableCell>
        <Typography variant="body2">{aliasName}</Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2">{name}</Typography>
        <CopyableText
          textToCopy={asSubdomainString({
            subdomain: name,
            tld: aliasTld,
            domain: domainName,
          })}
        />
      </TableCell>

      <TableCell>
        {accountId ? (
          <>
            <CopyableText variant="body2" textToCopy={accountAddress} />
            <CopyableText textToCopy={accountId} />
          </>
        ) : (
          <Typography variant="body2" color="grey">
            {t("valueNotSet")}
          </Typography>
        )}
      </TableCell>

      <TableCell>
        {url ? (
          <Link href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </Link>
        ) : (
          <Typography variant="body2" color="#222">
            {t("valueNotSet")}
          </Typography>
        )}
      </TableCell>

      <TableCell
        sx={{
          display: { xs: "none", lg: "table-cell" },
          width: "90px",
        }}
      >
        <ActionButtons id={aliasId} name={aliasName} />
      </TableCell>
    </StyledTableRow>
  );
};

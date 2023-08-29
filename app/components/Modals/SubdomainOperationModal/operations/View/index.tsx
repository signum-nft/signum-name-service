import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import { DescriptorData } from "@signumjs/standards";
import { useAlias } from "@/app/hooks/useAlias";
import { LoadingIndicator } from "@/app/components/LoadingIndicator";

import Link from "next/link";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DialogContent from "@mui/material/DialogContent";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";

interface Props {
  subdomainOperation: SubdomainOperation;
}
export const View = ({ subdomainOperation }: Props) => {
  const { t } = useTranslation();
  const { alias, isLoading } = useAlias(
    subdomainOperation.alias.aliasId,
    false
  );

  const aliasHasContent = !!alias?.aliasURI;

  const isAliasContentStandardCompliant = useMemo(() => {
    if (!aliasHasContent) return false;

    try {
      return !!DescriptorData.parse(alias.aliasURI);
    } catch (error) {
      return false;
    }
  }, [alias, aliasHasContent]);

  return (
    <DialogContent>
      {isLoading && <LoadingIndicator height={100} />}

      {!isLoading && aliasHasContent && !isAliasContentStandardCompliant && (
        <Typography sx={{ mb: 2 }}>{alias?.aliasURI}</Typography>
      )}

      {!isLoading && aliasHasContent && isAliasContentStandardCompliant && (
        <Typography sx={{ mb: 2 }} component="pre">
          {JSON.stringify(JSON.parse(alias?.aliasURI), null, 2)}
        </Typography>
      )}

      {!isLoading && !aliasHasContent && (
        <Alert severity="info">{t("aliasHasNoContent")}</Alert>
      )}

      {isAliasContentStandardCompliant && (
        <Alert severity="success">
          <Typography gutterBottom variant="body2">
            {t("aliasCompliesStandard")}
          </Typography>

          <Link
            href="https://github.com/signum-network/SIPs/blob/master/SIP/sip-44.md"
            passHref
          >
            <Typography component="a" target="_blank">
              <Button size="small" color="success" variant="outlined">
                {t("readMoreAboutSrc44")}
              </Button>
            </Typography>
          </Link>
        </Alert>
      )}
    </DialogContent>
  );
};

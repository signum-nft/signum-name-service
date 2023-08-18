import { useTranslation } from "next-i18next";
import { AliasUpdateMode } from "@/app/types/aliasUpdateMode";
import { CardTypeSelector } from "@/app/components/CardTypeSelector";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PublicIcon from "@mui/icons-material/Public";
import SourceIcon from "@mui/icons-material/Source";
import GestureIcon from "@mui/icons-material/Gesture";
import { AliasProxy } from "@/app/types/aliasProxy";
import { Alias } from "@signumjs/core";
import Card from "@mui/material/Card";
import { CardActions, CardContent } from "@mui/material";
import { CopyableText } from "@/app/components/CopyableText";
import { asSubdomainString } from "@/app/asSubdomainString";
import { asDomainString } from "@/app/asDomainString";
import { Config } from "@/app/config";
import { SubdomainOperation } from "@/app/states/subdomainOperationState";

interface AliasCardProps {
  aliasId: string;
  name: string;
  tld?: string;
  subdomain?: string;
}

const AliasCard = ({
  aliasId,
  tld = Config.Signum.DefaultTld,
  name,
  subdomain,
}: AliasCardProps) => {
  const subdomainFullName = subdomain
    ? asSubdomainString({ subdomain, tld, domain: name })
    : asDomainString({
        name,
        tld,
      });
  return (
    <Card sx={{ width: 120 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name}
        </Typography>
        <CopyableText textToCopy={subdomainFullName} variant="caption" />
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

interface Props {
  subdomainOperation: SubdomainOperation;
  onComplete: () => void;
}

export const LinkageForm = ({
  onComplete,
  subdomainOperation: { nextAlias, previousAlias, alias },
}: Props) => {
  const { t } = useTranslation();

  return (
    <Grid container gap={4} justifyContent="center">
      <Grid item>
        <Stack
          direction={{ sm: "column", md: "row" }}
          gap={2}
          alignContent="center"
        >
          {previousAlias && (
            <AliasCard
              aliasId={previousAlias.aliasId}
              name={previousAlias.aliasName}
              tld={previousAlias.aliasTld}
            />
          )}
          <AliasCard
            aliasId={alias.aliasId}
            name={alias.aliasName}
            tld={alias.aliasTld}
          />
          {nextAlias && (
            <AliasCard
              aliasId={nextAlias.aliasId}
              name={nextAlias.aliasName}
              tld={nextAlias.aliasTld}
            />
          )}
        </Stack>
      </Grid>
      <Grid item>
        <Stack direction="column" width="100%" spacing={1}>
          <Alert
            sx={{
              width: "100%",
              whiteSpace: "pre-line",
            }}
            severity="info"
          >
            {t("linkageSummary")}
          </Alert>
          <Button
            variant="contained"
            color="secondary"
            sx={{ color: "white" }}
            onClick={onComplete}
            fullWidth
          >
            {t("save")}
          </Button>
        </Stack>
      </Grid>
    </Grid>

    // <Grid item container justifyContent="center">
    //   <Collapse in={!!summaryLabel} sx={{ width: "100%" }}>
    //     <Stack direction="column" width="100%" spacing={1}>
    //       <Alert
    //         sx={{
    //           width: "100%",
    //           whiteSpace: "pre-line"
    //         }}
    //         severity="info"
    //       >
    //         {t(summaryLabel)}
    //       </Alert>
    //
    //       <Button
    //         variant="contained"
    //         color="secondary"
    //         sx={{ color: "white" }}
    //         onClick={onSubmit}
    //         fullWidth
    //       >
    //         {t("continue")}
    //       </Button>
    //     </Stack>
    //   </Collapse>
  );
};

import { useTranslation } from "next-i18next";
import { PaperContainer } from "@/app/components/PaperContainer";
import { SubmitButton } from "@/app/components/SubmitButton";
import { DocumentationSetup } from "./DocumentationSetup";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useXTWallet } from "@/features/xtWallet";

export const WalletSetup = () => {
  const { t } = useTranslation();
  const { connect } = useXTWallet();

  return (
    <PaperContainer>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid
          item
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          xs={12}
          md={8}
          sx={{ pr: { xs: 0, md: 2 }, mb: { xs: 3, md: 0 } }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <AccountBalanceWalletIcon sx={{ mr: 1 }} />
            {t("youNeedAccountNotice")}
          </Typography>

          <Typography sx={{ mb: 2 }}>
            {t("youNeedToLinkAccountNotice")}
          </Typography>

          <SubmitButton label={t("connectWallet")} onClick={connect} />
        </Grid>
        <DocumentationSetup />
      </Grid>
    </PaperContainer>
  );
};

export const WalletSetupWithContainer = () => (
  <Grid
    container
    direction="column"
    sx={{ my: 5, mx: "auto", px: 2, maxWidth: 850 }}
  >
    <WalletSetup />
  </Grid>
);

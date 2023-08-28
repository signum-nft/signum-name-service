import { useTranslation } from "next-i18next";

import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppContext } from "@/app/hooks/useAppContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { openExternalUrl } from "@/app/openExternalUrl";

interface Props {
  showBuyButton?: boolean;
}
export const DomainNotFound = ({ showBuyButton = false }: Props) => {
  const { t } = useTranslation();
  const { SignumSwap } = useAppContext();
  const signumswapUrl = `${SignumSwap}/alias`;
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Grid item xs={12} justifyContent="flex-start">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexDirection="column"
          p={2}
        >
          <Image
            src="/assets/img/domain.png"
            alt="No Domain"
            width={100}
            height={100}
            unoptimized
            priority
          />

          <Typography color="textSecondary" align="center">
            {t("noAliasNotice")}
          </Typography>

          {showBuyButton && (
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              startIcon={<ShoppingCartIcon />}
              onClick={() => {
                openExternalUrl(signumswapUrl);
              }}
            >
              {t("buyAlias")}
            </Button>
          )}
        </Box>
      </Grid>
    </Paper>
  );
};

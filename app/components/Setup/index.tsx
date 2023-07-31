import { useAppSelector } from "@/states/hooks";
import { selectIsWalletConnected } from "@/app/states/walletState";
import { WalletSetup } from "./WalletSetup";

import Grid from "@mui/material/Grid";

export const Setup = () => {
  const isWalletConnected = useAppSelector(selectIsWalletConnected);

  return (
    <Grid
      container
      direction="column"
      sx={{ my: 10, mx: "auto", maxWidth: 850 }}
    >
      {!isWalletConnected && <WalletSetup />}
    </Grid>
  );
};

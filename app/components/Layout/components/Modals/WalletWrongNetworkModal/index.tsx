import { useTranslation } from "next-i18next";
import { isMobile } from "react-device-detect";
import { useAppContext } from "@/app/hooks/useAppContext";
import { requestWalletConnection } from "@/app/requestWalletConnection";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import {
  appActions,
  selectIsOpenWalletWrongNetworkModal,
} from "@/app/states/appState";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NetworkIcon from "@mui/icons-material/Podcasts";
import { useXTWallet } from "@/app/hooks/useXTWallet";

export const WalletWrongNetworkModal = () => {
  const { t } = useTranslation();
  const { Ledger, Platform } = useAppContext();
  const { setWalletWrongNetworkModal } = appActions;
  const { connect } = useXTWallet();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpenWalletWrongNetworkModal);

  const handleClose = () => dispatch(setWalletWrongNetworkModal(false));
  const handleConnection = () => {
    handleClose();
    connect(Platform.Name, Ledger.Network);
  };

  let signumNode = "Signum (Mainnet Node)";
  if (Ledger.Network === "Signum-TESTNET") signumNode = "Signum (Testnet Node)";

  if (isMobile) return <></>;

  return (
    <Dialog onClose={handleClose} open={isOpen} maxWidth="xs">
      <DialogTitle sx={{ textAlign: "center" }}>
        {t("xtWalletInvalidNetworkDialogTitle")}
      </DialogTitle>

      <DialogContent>
        <Alert
          severity="info"
          icon={<NetworkIcon fontSize="inherit" />}
          sx={{
            mb: 1,
            "& .MuiAlert-message": {
              width: "100%",
            },
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption">
              {t("xtWalletRequiredNetwork")}
            </Typography>
            <Box
              sx={{
                mt: 1,
                border: 1,
                borderRadius: 1,
                borderColor: "divider",
                textAlign: "center",
              }}
            >
              <Typography variant="body1">{signumNode}</Typography>
            </Box>
          </Box>
        </Alert>
      </DialogContent>

      <DialogContent dividers>
        <DialogContentText sx={{ textAlign: "justify" }}>
          {t("xtWalletInvalidNetworkDialogHint")}
        </DialogContentText>

        <DialogContentText
          fontSize={"small"}
          sx={{ textAlign: "justify", mt: 1 }}
        >
          {t("xtWalletChooseAnotherNetwork")}
        </DialogContentText>

        <Box
          sx={{
            mx: "auto",
            width: { xs: "100%", md: "50%" },
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ my: 1, py: 1, color: "#ffffff" }}
            startIcon={<AccountBalanceWalletIcon />}
            onClick={handleConnection}
          >
            {t("connectWallet")}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

import { Fragment, FC, useEffect } from "react";
import { useRouter } from "next/router";
import { ChildrenProps } from "@/types/ChildrenProps";
import { useSnackbar } from "@/app/hooks/useSnackbar";
import { SubdomainOperationModal } from "@/app/components/Modals/SubdomainOperationModal";
import { AppSnackBar } from "./components/SnackBar";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ShareModal } from "./components/Modals/ShareModal";
import { SetupWalletModal } from "./components/Modals/SetupWalletModal";
import { SignTransactionModal } from "./components/Modals/SignTransactionModal";
import { WalletWrongNetworkModal } from "./components/Modals/WalletWrongNetworkModal";
import { SettingsSidebar } from "./components/Sidebar";
import { BackgroundGradient } from "./components/BackgroundGradient";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import ConfettiExplosion from "react-confetti-explosion";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { appActions, selectShowConfettiExplosion } from "@/app/states/appState";
import Box from "@mui/material/Box";

export const Layout: FC<ChildrenProps> = ({ children }) => {
  const router = useRouter();
  const { hideSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const showConfettiExplosion = useAppSelector(selectShowConfettiExplosion);
  useEffect(() => {
    NProgress.configure({ showSpinner: false, easing: "ease", speed: 400 });

    router.events.on("routeChangeStart", () => {
      NProgress.start();
    });

    router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });

    router.events.on("routeChangeError", () => {
      NProgress.done();
    });

    hideSnackbar();
  }, [router.events]);

  return (
    <>
      <Fragment>
        {showConfettiExplosion && (
          <Box position="relative" left={"50%"}>
            <ConfettiExplosion
              colors={[
                "rgb(243,177,103)",
                "rgb(236,56,188)",
                "rgb(115,3,192)",
                "rgb(0,255,136)",
                "rgb(0,153,255)",
              ]}
              onComplete={() => {
                dispatch(appActions.showConfettiExplosion(false));
              }}
            />
          </Box>
        )}
        <ShareModal />
        <SetupWalletModal />
        <SignTransactionModal />
        <WalletWrongNetworkModal />
        <AppSnackBar />
        <SubdomainOperationModal />
        <SettingsSidebar />
        <Header />
        {children}
        <Footer />
      </Fragment>

      <BackgroundGradient />
    </>
  );
};

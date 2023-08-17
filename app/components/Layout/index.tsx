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
import { SettingsSidebar } from "./components/Sidebar/SettingsSidebar";
import { AccountSidebar } from "./components/Sidebar/AccountSidebar";
import { MobileSidebar } from "./components/Sidebar/MobileSidebar";
import { BackgroundGradient } from "./components/BackgroundGradient";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

export const Layout: FC<ChildrenProps> = ({ children }) => {
  const router = useRouter();
  const { hideSnackbar } = useSnackbar();

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
        <ShareModal />
        <SetupWalletModal />
        <SignTransactionModal />
        <WalletWrongNetworkModal />
        <AppSnackBar />
        <SubdomainOperationModal />
        <SettingsSidebar />
        <AccountSidebar />
        <MobileSidebar />
        <Header />
        {children}
        <Footer />
      </Fragment>

      <BackgroundGradient />
    </>
  );
};

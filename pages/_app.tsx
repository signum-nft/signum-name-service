import type { AppProps } from "next/app";
import * as React from "react";
import { appWithTranslation, useTranslation } from "next-i18next";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppContextProvider } from "@/app/contexts/AppContext";
import { ThemeContextProvider } from "@/app/contexts/ThemeContext";
import { store, storePersistor } from "@/states/store";
import { Layout } from "@/app/components/Layout";
import { AppInitializer } from "@/app/components/AppInitializer";
import { SEOMetaTags } from "@/app/components/SEOMetaTags";
import { Config } from "@/app/config";
import { MaintenancePage } from "@/features/exceptions/maintenance";

import nextI18nConfig from "../next-i18next.config";
import "../styles/globals.css";
import { SignumXTWalletProvider } from "@/features/xtWallet/SignumXTWalletProvider";

const DefaultTitle = "Signum Name System";

const App = (props: AppProps) => {
  const { Component, pageProps, router } = props;
  const { t, ready } = useTranslation();

  const content = (
    <Layout>
      {Config.Platform.IsMaintenance ? (
        <MaintenancePage />
      ) : (
        <Component {...pageProps} />
      )}
    </Layout>
  );

  return (
    <AppContextProvider>
      <SEOMetaTags
        clientSideTitle={t("seoTitle")}
        serverSideTitle={DefaultTitle}
        canonical={Config.Platform.CanonicalUrl + router.asPath}
        imgUrl={Config.Platform.CanonicalUrl + "/assets/img/SEO.jpg"}
        keywords="signum, blockchain, web3, decentralization, dns, ens, sns"
        description={t("seoDescription")}
        viewport="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />

      <ReduxProvider store={store}>
        {ready && (
          <SignumXTWalletProvider
            appName={Config.Platform.Name}
            networkName={Config.Signum.Network}
            autoConnect={true}
          >
            <PersistGate loading={null} persistor={storePersistor}>
              <AppInitializer />
              <ThemeContextProvider>{content}</ThemeContextProvider>
            </PersistGate>
          </SignumXTWalletProvider>
        )}
      </ReduxProvider>
    </AppContextProvider>
  );
};

export default appWithTranslation(App, nextI18nConfig);

import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { createEmotionCache } from "@/app/createEmotionCache";

import createEmotionServer from "@emotion/server/create-instance";
import i18nextConfig from "../next-i18next.config";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale || i18nextConfig.i18n.defaultLocale;

    return (
      <Html lang={currentLocale}>
        <Head>
          {/* Language locales */}
          <link
            rel="preload"
            href={`/locales/${currentLocale}/common.json`}
            type="application/json"
            as="fetch"
            crossOrigin="anonymous"
          />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />

          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            src="./vendors/nostri.chat/bundle.js"
            data-chat-type="GROUP"
            data-chat-id="dd7d4b77a402d05995e0f73e41b7876839ed1ae26cf16c931f022216bb59f730"
            data-relays="wss://relay.f7z.io,wss://relay.damus.io,wss://relay.nostr.band,wss://nostr-pub.wellorder.net,wss://relay.plebstr.com,wss://relay.nostr.bg"
            strategy="lazyOnload"
          />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);

  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};

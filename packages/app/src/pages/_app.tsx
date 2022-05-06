import 'antd/dist/antd.min.css';

import BaseApp from 'next/app';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import {
  GlobalStyle,
  theme,
} from '@exhibition/design-system/theme/styledTheme';

type AppProps = {
  Component: any;
  pageProps: any;
  store: any;
  router: any;
};

class App extends BaseApp<AppProps> {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <NextSeo title="Exhibition" />
        <Head>
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
        </Head>

        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </>
    );
  }
}

export default App;

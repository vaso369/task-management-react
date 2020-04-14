import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { GlobalProvider } from "../src/GlobalState";
import Favicon from "../assets/favicon.ico";

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="description" content="Task management" />
          <meta name="keywords" content="taks"></meta>
          <meta name="author" content="John Doe"></meta>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link rel="shortcut icon" type="image/x-icon" href={Favicon}></link>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <GlobalProvider>
            <Component {...pageProps} />
          </GlobalProvider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

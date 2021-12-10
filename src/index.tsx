<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RecoilRoot } from 'recoil';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from './services/redux/store';
import { Provider } from 'react-redux';
import { StylesProvider } from '@material-ui/core';
import { I18nextProvider } from 'react-i18next';
import i18n from './services/localization/i18n';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import 'emoji-mart/css/emoji-mart.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'pages/Fallbacks/ErrorFallback';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'react-lazy-load-image-component/src/effects/blur.css';
=======
import React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import { RecoilRoot } from "recoil";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "./services/redux/store";
import { Provider } from "react-redux";
import { StylesProvider } from "@material-ui/core";
import { I18nextProvider } from "react-i18next";
import i18n from "./services/localization/i18n";
import { BrowserRouter } from "react-router-dom";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "emoji-mart/css/emoji-mart.css";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "pages/Fallbacks/ErrorFallback";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
>>>>>>> 8b2dce7ce1c633bcaca361a33a434b323b4c010c

const queryClient = new QueryClient();

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1500,
      xl: 1920,
    },
  },
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./firebase-messaging-sw.js')
    .then(function (registration) {})
    .catch(function (err) {});
}
const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <I18nextProvider i18n={i18n}>
        <MuiThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <Provider store={store}>
              <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <App />
                    <ToastContainer />
                  </ErrorBoundary>
                </BrowserRouter>
              </QueryClientProvider>
            </Provider>
          </StylesProvider>
        </MuiThemeProvider>
      </I18nextProvider>
    </RecoilRoot>
  </React.StrictMode>,
  rootElement
);

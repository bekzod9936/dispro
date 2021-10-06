import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "./services/redux/store";
import { Provider } from "react-redux";
//import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { StylesProvider } from "@material-ui/core";
//import { getToken } from "firebase"
//import { URL } from 'url';
import { I18nextProvider } from "react-i18next";
import i18n from "./services/localization/i18n";
import { BrowserRouter } from "react-router-dom";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import { enUS, ru, uz } from "date-fns/locale";
import { LocalizationProvider } from "@material-ui/pickers";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";

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

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <LocalizationProvider
        locale={
          localStorage.getItem("language") === "en"
            ? enUS
            : localStorage.getItem("language") === "uz"
            ? uz
            : ru
        }
        dateAdapter={DateFnsUtils}
      >
        <StylesProvider injectFirst>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <I18nextProvider i18n={i18n}>
                  <App />
                </I18nextProvider>
              </BrowserRouter>
            </QueryClientProvider>
          </Provider>
        </StylesProvider>
      </LocalizationProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// serviceWorkerRegistration.register({
//   onSuccess: (resgistration: ServiceWorkerRegistration) => {
//   },
//   serviceWorkerUrl: "/firebase-messaging-sw.js"
// })
// serviceWorkerRegistration.unregister(
// );

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", (e: Event) => {
//     navigator.serviceWorker.register("/firebase-messaging-sw.js").then((value: ServiceWorkerRegistration) => {
//     })
//   })

// }

//reportWebVitals();

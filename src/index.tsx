import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from './services/redux/store';
import { Provider } from 'react-redux';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { StylesProvider } from '@material-ui/core';
//import { getToken } from "firebase"
import { URL } from 'url';
import { I18nextProvider } from 'react-i18next';
import i18n from "./services/localization/i18n"
import { BrowserRouter } from 'react-router-dom';
const queryClient = new QueryClient();


//getToken()


ReactDOM.render(

  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <StylesProvider injectFirst>
        <Provider store={store}>
          <QueryClientProvider client={queryClient} >
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </Provider>
      </StylesProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// serviceWorkerRegistration.register({
//   onSuccess: (resgistration: ServiceWorkerRegistration) => {
//     console.log('Registered!!');
//   },
//   serviceWorkerUrl: "/firebase-messaging-sw.js"
// })
// serviceWorkerRegistration.unregister(
// );


// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", (e: Event) => {
//     navigator.serviceWorker.register("/firebase-messaging-sw.js").then((value: ServiceWorkerRegistration) => {
//       console.log("registered");
//     })
//   })

// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

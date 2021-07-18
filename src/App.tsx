import React, { Suspense, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LoginPageModerator from './pages/LoginPages/LoginPageModerator/LoginPageModerator';
import { RenderAllRoutes } from './routes/Protection';
import FallbackOnLazyLoad from './pages/Fallbacks/FallbackOnLazyLoad';
import { ReactQueryDevtools } from "react-query/devtools"
import { useAppDispatch } from './services/redux/hooks';
import { setSocket } from './services/redux/Slices/FeedbackSlice';

import { async } from 'q';
import { StepConnector } from '@material-ui/core';

const io = require("socket.io-client");

function App() {
  let token = localStorage.getItem("companyToken");
  const dispatch = useAppDispatch();
  const [connect, setConnect] = useState(false);
  useEffect(() => {
    console.log(process.env.REACT_APP_WEBSOCKET_URL);
    if (connect) {
      const socket = io(
        `${process.env.REACT_APP_WEBSOCKET_URL}/nsp_staff_svdfv8732f5rycf76f8732rvuy23cfi77c3u6fr2387frv8237vfidu23vf2vdd7324df4`,
        {
          path: "/",

          auth: {
            token: `Bearer ${token}`,
          },
        }
      );
      socket.on("connect", (res: any) => {
        console.log(res);
      })
      socket.on("disconnect", (res: any) => {
        console.log(res);

      })

      dispatch(setSocket(socket));

    }


  }, [connect])
  return (

    <Router>
      <div style={{ zIndex: 10000, position: "absolute" }} onClick={() => { setConnect(true) }}>
        +
      </div>
      <Switch>
        {/* <Route path="/" exact component={LoginPageModerator} /> */}

        <RenderAllRoutes />


      </Switch>

      <ReactQueryDevtools initialIsOpen={false} />
    </Router>

  );
}

export default App;

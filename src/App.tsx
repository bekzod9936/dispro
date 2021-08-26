import React, { Suspense, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from "react-router-dom"
import LoginPageModerator from './pages/LoginPages/LoginPageModerator/LoginPageModerator';
import { RenderAllRoutes } from './routes/Protection';
import FallbackOnLazyLoad from './pages/Fallbacks/FallbackOnLazyLoad';
import { ReactQueryDevtools } from "react-query/devtools"
import { useAppDispatch, useAppSelector } from './services/redux/hooks';
import { setSocket } from './services/redux/Slices/FeedbackSlice';

import { async } from 'q';
import { StepConnector } from '@material-ui/core';
import TestLoginPage from './pages/LoginPages/LoginPageModerator/TestLoginPage';
import { setCurrentPage } from './services/redux/Slices/partnerSlice';

const io = require("socket.io-client");

function App() {
  //const match = useRouteMatch();
  const dispatch = useAppDispatch();
  useEffect(() => {
    let path = window.location.pathname.split("").filter((item: any) => item !== "/").join("")
    console.log(path);
    dispatch(setCurrentPage(path))
  }, [])

  return (

    <>

      <Switch>
        {/* <Route path="/" exact component={LoginPageModerator} /> */}

        <RenderAllRoutes />


      </Switch>

      <ReactQueryDevtools initialIsOpen={false} />
    </>

  );
}

export default App;

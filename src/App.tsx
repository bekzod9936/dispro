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
import TestLoginPage from './pages/LoginPages/LoginPageModerator/TestLoginPage';

const io = require("socket.io-client");

function App() {

  return (

    <Router>

      <Switch>
        {/* <Route path="/" exact component={LoginPageModerator} /> */}

        <RenderAllRoutes />


      </Switch>

      <ReactQueryDevtools initialIsOpen={false} />
    </Router>

  );
}

export default App;

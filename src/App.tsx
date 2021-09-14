import React, { useEffect } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import LoginPageModerator from './pages/LoginPages/LoginPageModerator/LoginPageModerator';
import { RenderAllRoutes } from './routes/Protection';
import FallbackOnLazyLoad from './pages/Fallbacks/FallbackOnLazyLoad';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useAppDispatch } from './services/redux/hooks';
import { setSocket } from './services/redux/Slices/FeedbackSlice';
import { StepConnector } from '@material-ui/core';
import TestLoginPage from './pages/LoginPages/LoginPageModerator/TestLoginPage';
import { setCurrentPage } from './services/redux/Slices/partnerSlice';

const io = require('socket.io-client');

function App() {
  //const match = useRouteMatch();
  const dispatch = useAppDispatch();
  useEffect(() => {
    let path = window.location.pathname
      .split('')
      .filter((item: any) => item !== '/')
      .join('');
    dispatch(setCurrentPage(path));
  }, []);

  return (
    <>
      <Switch>
        {/* <Route path="/" exact component={LoginPageModerator} /> */}
        <RenderAllRoutes />
      </Switch>
    </>
  );
}

export default App;

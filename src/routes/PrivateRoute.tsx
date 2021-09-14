import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { pathToFileURL } from 'url';
import { IDefaultLayout } from '../components/Layout/DefaultLayoutAdmin';

interface IProps {
  Layout: React.FC<IDefaultLayout>;
  Component: React.LazyExoticComponent<React.ComponentType<any>>;
  // rest?: Object,
  path: string;
}

const PrivateRoute: React.FC<IProps> = ({ Layout, Component, ...rest }) => {
  return (
    <Route
      {...rest}
      exact
      render={(props) => {
        let companyToken = localStorage.getItem('companyToken');
        let moderator = localStorage.getItem('partner_access_token');
        return (moderator && props.match.path.includes('partner')) ||
          (companyToken && !props.match.path.includes('partner')) ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : !companyToken && !props.match.path.includes('company') ? (
          <Redirect to='/partner/company' />
        ) : (
          <Redirect to='/' />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;

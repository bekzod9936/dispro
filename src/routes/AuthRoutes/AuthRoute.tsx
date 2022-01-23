import React from "react";
import { Route } from "react-router-dom";

interface IProps {
  Layout?: React.LazyExoticComponent<React.ComponentType<any>>;
  Component: React.LazyExoticComponent<React.ComponentType<any>>;
  // rest?: Object,
  path: string;
}

const AuthRoute: React.FC<IProps> = ({ Layout, Component, ...rest }) => {
  return (
    <Route
      {...rest}
      exact
      render={(props) => {
        if (Layout) {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default AuthRoute;

import { Redirect, Route } from "react-router-dom";
import { IDefaultLayout } from "components/Layout/DefaultLayoutAdmin";
import { PARTNER } from "services/interceptors/partner_interceptor/types";

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
        let companyToken = localStorage.getItem(PARTNER.COMPANY_TOKEN);
        let accessToken = localStorage.getItem(PARTNER.ACCESS_TOKEN);
        const path = props.match.path;

        return (accessToken && path.includes("partner")) ||
          (companyToken && !path.includes("partner")) ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : !companyToken && !path.includes("company") ? (
          <Redirect from="*" to="/partner/company" />
        ) : (
          <Redirect from="*" to="/" />
        );
      }}
    />
  );
};

export default PrivateRoute;

import { Redirect, Route } from "react-router-dom";
import { PARTNER } from "services/interceptors/partner_interceptor/types";

interface IProps {
  Component: React.LazyExoticComponent<React.ComponentType<any>>;
  // rest?: Object,
  path: string;
}

const PrivateRoute: React.FC<IProps> = ({ Component, ...rest }) => {
  return (
    <Route
      {...rest}
      exact
      render={(props) => {
        let companyToken = localStorage.getItem(PARTNER.COMPANY_TOKEN);
        let accessToken = localStorage.getItem(PARTNER.ACCESS_TOKEN);
        const path = props.match.path;

        if (path.includes("admin")) {
          return <Component {...props} />;
        }

        if (
          (accessToken && path.includes("partner")) ||
          (companyToken && !path.includes("partner"))
        ) {
          return <Component {...props} />;
        } else if (!companyToken && !path.includes("company")) {
          return <Redirect from="*" to="/partner/company" />;
        } else {
          return <Redirect from="*" to="/" />;
        }
      }}
    />
  );
};

export default PrivateRoute;

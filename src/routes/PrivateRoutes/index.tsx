import { Suspense } from "react";
import { Redirect } from "react-router-dom";
import FallbackOnLazyLoad from "pages/Fallbacks/FallbackOnLazyLoad";
import PrivateRoute from "./PrivateRoute";
//types
import { IPrivateRoute } from "routes/types";
//routes
import { privateCompanyRoutes, privateRoutes } from "routes";

const PrivateRoutes = () => {
  const moderatorAutehntificationToken = localStorage.getItem(
    "partner_access_token"
  );
  const moderatorRefreshToken = localStorage.getItem("partner_refresh_token");

  const checkToken = moderatorAutehntificationToken && moderatorRefreshToken;

  return privateRoutes
    .map((item: IPrivateRoute) => {
      if (checkToken) {
        return (
          <Suspense fallback={<FallbackOnLazyLoad />}>
            <PrivateRoute
              path={item.path}
              Layout={item.layout}
              Component={item.component}
            />
          </Suspense>
        );
      } else if (window.location.pathname !== "/partner") {
        return <Redirect from="*" to="/" />;
      }
      return <Redirect from="*" to="/" />;
    })
    .concat(
      privateCompanyRoutes.map((item: IPrivateRoute) => {
        return (
          <>
            <PrivateRoute
              path={item.path}
              Layout={item.layout}
              Component={item.component}
            />
          </>
        );
      })
    );
};

export default PrivateRoutes;

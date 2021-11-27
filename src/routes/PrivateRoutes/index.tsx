import { Suspense } from "react";
import { Redirect } from "react-router-dom";
import FallbackOnLazyLoad from "pages/Fallbacks/FallbackOnLazyLoad";
import PrivateRoute from "./PrivateRoute";
//types
import { IPrivateRoute } from "routes/types";
//routes
import { privateCompanyRoutes, privateRoutes } from "routes";
import AuthRoutes from "routes/AuthRoutes";
import { PARTNER } from "services/interceptors/partner_interceptor/types";
import { MODERATOR } from "services/interceptors/moderator_interceptor/types";

const PrivateRoutes = () => {
  const accessToken = localStorage.getItem(PARTNER.ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(PARTNER.REFRESH_TOKEN);
  //moderator auth
  const mAccessToken = localStorage.getItem(MODERATOR.ACCESS_TOKEN);
  const mRefreshToken = localStorage.getItem(MODERATOR.REFRESH_TOKEN);
  const checkToken =
    (accessToken && refreshToken) || mAccessToken || mRefreshToken;
  const pathName = window.location.pathname;
  const pathArray = pathName.split("/");

  if (pathName === "/admin" && pathArray.length < 3) {
    return AuthRoutes();
  }
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
      }
      //  else if (pathName !== "/partner") {
      //   return <Redirect from="*" to="/" />;
      // }
      return <Redirect from="*" to="/" />;
    })
    .concat(
      privateCompanyRoutes.map((item: IPrivateRoute) => {
        return (
          <PrivateRoute
            path={item.path}
            Layout={item.layout}
            Component={item.component}
          />
        );
      })
    );
};

export default PrivateRoutes;

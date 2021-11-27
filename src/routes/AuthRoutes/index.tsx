import { Suspense } from "react";
import { Redirect } from "react-router-dom";

import FallbackOnLazyLoad from "pages/Fallbacks/FallbackOnLazyLoad";
import { authRoutes } from "routes";
import { IPublicRoute } from "routes/types";
import AuthRoute from "./AuthRoute";
import { PARTNER } from "services/interceptors/partner_interceptor/types";

const AuthRoutes = () => {
  const accessToken = localStorage.getItem(PARTNER.ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(PARTNER.REFRESH_TOKEN);
  const checkToken =
    accessToken && refreshToken && window.location.pathname === "/";
  return authRoutes.map((item: IPublicRoute) => {
    if (checkToken) {
      return <Redirect to="/partner/company" />;
    }
    return (
      <Suspense fallback={<FallbackOnLazyLoad />}>
        <AuthRoute Component={item.component} path={item.path} />
      </Suspense>
    );
  });
};

export default AuthRoutes;

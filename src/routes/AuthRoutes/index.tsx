import { Suspense } from "react";
import { Redirect } from "react-router-dom";

import FallbackOnLazyLoad from "pages/Fallbacks/FallbackOnLazyLoad";
import { authRoutes } from "routes";
import { IPublicRoute } from "routes/types";
import AuthRoute from "./AuthRoute";

const AuthRoutes = () => {
  const moderatorAutehntificationToken = localStorage.getItem(
    "partner_access_token"
  );
  const moderatorRefreshToken = localStorage.getItem("partner_refresh_token");
  const checkToken =
    moderatorAutehntificationToken &&
    moderatorRefreshToken &&
    window.location.pathname === "/";
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

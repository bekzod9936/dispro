import { Suspense } from "react";
import { Redirect } from "react-router-dom";

import { authRoutes } from "routes";
import { IPublicRoute } from "routes/types";
import AuthRoute from "./AuthRoute";
import { PARTNER } from "services/interceptors/partner_interceptor/types";
import { useRecoilValue } from "recoil";
import { successLoginModerator } from "services/atoms/admin_companies";

const AuthRoutes = () => {
  const accessToken = localStorage.getItem(PARTNER.ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(PARTNER.REFRESH_TOKEN);
  const successLogin = useRecoilValue(successLoginModerator);

  const checkToken =
    accessToken &&
    refreshToken &&
    window.location.pathname === "/" &&
    !successLogin;

  return authRoutes.map((item: IPublicRoute) => {
    if (checkToken) {
      return <Redirect to="/partner/company" />;
    }
    return (
      <Suspense fallback={<div></div>}>
        <AuthRoute Component={item.component} path={item.path} />
      </Suspense>
    );
  });
};

export default AuthRoutes;

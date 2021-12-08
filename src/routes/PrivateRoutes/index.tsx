// import { useRecoilValue } from "recoil";
// import { Redirect } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
//types
import { IPrivateRoute } from "routes/types";
//routes
import { privateCompanyRoutes, privateRoutes } from "routes";
import AuthRoutes from "routes/AuthRoutes";
// import { PARTNER } from "services/interceptors/partner_interceptor/types";
// import { MODERATOR } from "services/interceptors/moderator_interceptor/types";
// import { successLoginModerator } from "services/atoms/admin_companies";

const PrivateRoutes = () => {
  // const accessToken = localStorage.getItem(PARTNER.ACCESS_TOKEN);
  // const refreshToken = localStorage.getItem(PARTNER.REFRESH_TOKEN);
  // //moderator auth
  // const mAccessToken = localStorage.getItem(MODERATOR.ACCESS_TOKEN);
  // const mRefreshToken = localStorage.getItem(MODERATOR.REFRESH_TOKEN);
  // const successLogin = useRecoilValue(successLoginModerator);

  // const checkToken =
  //   (accessToken && refreshToken) ||
  //   mAccessToken ||
  //   mRefreshToken ||
  //   successLogin;
  const pathName = window.location.pathname;
  const pathArray = pathName.split("/");

  if (pathName === "/admin" && pathArray.length < 3) {
    return AuthRoutes();
  }
  return privateRoutes
    .map((item: IPrivateRoute) => {
      return (
        <PrivateRoute
          key={item.path}
          path={item.path}
          Layout={item.layout}
          Component={item.component}
        />
      );
    })
    .concat(
      privateCompanyRoutes.map((item: IPrivateRoute) => {
        return (
          <PrivateRoute
            key={item.path}
            path={item.path}
            Layout={item.layout}
            Component={item.component}
          />
        );
      })
    );
};

export default PrivateRoutes;

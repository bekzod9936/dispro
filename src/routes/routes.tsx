import DefaultLayoutAdmin from "components/Layout/DefaultLayoutAdmin";
import FallbackOnLazyLoad from "pages/Fallbacks/FallbackOnLazyLoad";
import TestLoginpage from "pages/LoginPages/LoginPage/TestLoginpage";
import React, { Fragment, Suspense } from "react";
//app_routes
import AuthRoutes from "./AuthRoutes/index";
import PrivateRoutes from "./PrivateRoutes/index";

export const RenderAllRoutes: React.FC = () => {
  const companyId = localStorage.getItem("companyId");

  return (
    <Fragment>
      {AuthRoutes()}
      <Suspense fallback={<FallbackOnLazyLoad />}>
        {Boolean(companyId) ? (
          <DefaultLayoutAdmin>{PrivateRoutes()}</DefaultLayoutAdmin>
        ) : (
          <TestLoginpage>{PrivateRoutes()}</TestLoginpage>
        )}
      </Suspense>
    </Fragment>
  );
};

import FallbackOnLazyLoad from "pages/Fallbacks/FallbackOnLazyLoad";
import React, { Fragment, Suspense } from "react";
//app_routes
import AuthRoutes from "./AuthRoutes/index";
import PrivateRoutes from "./PrivateRoutes/index";

export const RenderAllRoutes: React.FC = () => {
  return (
    <Fragment>
      {AuthRoutes()}
      <Suspense fallback={<FallbackOnLazyLoad />}>{PrivateRoutes()}</Suspense>
    </Fragment>
  );
};

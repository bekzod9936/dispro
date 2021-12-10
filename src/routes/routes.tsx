import FallbackOnLazyLoad from "pages/Fallbacks/FallbackOnLazyLoad";
import React, { Fragment, Suspense } from "react";
//app_routes
import AuthRoutes from "./AuthRoutes/index";
import PrivateRoutes from "./PrivateRoutes/index";
import { Route } from "react-router-dom";
import NotFound from "pages/NotFound";

export const RenderAllRoutes: React.FC = () => {
  return (
    <Fragment>
      {AuthRoutes()}
      <Suspense fallback={<FallbackOnLazyLoad />}>{PrivateRoutes()}</Suspense>
      <Route path="*" component={NotFound} />
    </Fragment>
  );
};

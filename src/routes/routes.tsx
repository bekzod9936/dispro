import React from "react";
//app_routes
import AuthRoutes from "./AuthRoutes/index";
import PrivateRoutes from "./PrivateRoutes/index";

export const RenderAllRoutes: React.FC = () => {
  return (
    <React.Fragment>
      {AuthRoutes()}
      {PrivateRoutes()}
    </React.Fragment>
  );
};

import React from "react";
//app_routes
import AuthRoutes from "./AuthRoutes";
import PrivateRoutes from "./PrivateRoutes";

export const RenderAllRoutes: React.FC = () => {
  return (
    <React.Fragment>
      {AuthRoutes()}
      {PrivateRoutes()}
    </React.Fragment>
  );
};

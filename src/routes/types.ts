import { IDefaultLayout } from "../components/Layout/DefaultLayoutAdmin";

export interface IPrivateRoute {
  path: string;
  layout: React.FC<IDefaultLayout> | any;
  component: any;
}

export interface IPublicRoute {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  layout?: any;
}

//tokens
// const adminAuthentificationToken = localStorage.getItem("admin_access_token");
// const moderatorAutehntificationToken = localStorage.getItem("partner_access_token");
// const moderatorRefreshToken = localStorage.getIte m("partner_refresh_token");

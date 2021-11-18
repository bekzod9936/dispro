import React, { Suspense } from "react";
import { lazy } from "react";
import { Redirect } from "react-router-dom";
import FallbackOnLazyLoad from "../pages/Fallbacks/FallbackOnLazyLoad";
import DefaultLayoutAdmin, {
  IDefaultLayout,
} from "../components/Layout/DefaultLayoutAdmin";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import CompanyList from "../pages/LoginPages/LoginPageModerator/Companylist/index";

//tokens
// const adminAuthentificationToken = localStorage.getItem("admin_access_token");
// const moderatorAutehntificationToken = localStorage.getItem("partner_access_token");
// const moderatorRefreshToken = localStorage.getIte m("partner_refresh_token");

//Lazy loaded components
//Admin

//const DefaultLayoutAdmin = lazy(() => import("../components/Layout/DefaultLayoutAdmin"))
const Companies = lazy(
  () => import("../pages/AdminDashBoard/AdminCompanies/AdminCompanies")
);
const Categories = lazy(
  () => import("../pages/AdminDashBoard/AdminCategories/AdminCategories")
);

//Partner
const LoginPageAdmin = lazy(
  () => import("../pages/LoginPages/LoginPageAdmin/LoginPageAdmin")
);

const StatisticsPage = lazy(() => import("../pages/CompanyPages/statistics"));
const SupportPage = lazy(
  () => import("../pages/CompanyPages/feedback/screens/Support")
);
const StaffPage = lazy(() => import("../pages/CompanyPages/staff/StaffPage"));
const CashierCard = lazy(
  () => import("pages/CompanyPages/staff/screens/CashierCard/index")
);
const NotificationsPage = lazy(
  () => import("../pages/CompanyPages/notifications")
);
const NewsPage = lazy(() => import("../pages/CompanyPages/news"));

const FinancePage = lazy(() => import("../pages/CompanyPages/finances"));
const InfoPage = lazy(() => import("../pages/CompanyPages/info"));
const OrdersPage = lazy(
  () => import("../pages/CompanyPages/orders/OrdersPage")
);
const ProposalsPage = lazy(() => import("../pages/CompanyPages/proposals"));
const SettingsPage = lazy(
  () => import("../pages/CompanyPages/settings/SettingsPage")
);
const ServicesPage = lazy(
  () => import("../pages/CompanyPages/services/ServicesPage")
);
const ClientsPage = lazy(() => import("../pages/CompanyPages/clients"));
const FeedbackPage = lazy(() => import("../pages/CompanyPages/feedback"));
const TestLoginPage = lazy(
  () => import("../pages/LoginPages/LoginPageModerator/TestLoginpage/index")
);

// const CompanyList = lazy(
//   () => import('../pages/LoginPages/LoginPageModerator/CompanyList')
// );
const RegistrationPanel = lazy(
  () => import("../pages/LoginPages/LoginPageModerator/Registrationpanel/index")
);

// const LoginPageModerator = lazy(()=>import("../pages/LoginPages/LoginPageModerator/LoginPageModerator"));

export interface IPrivateRoute {
  path: string;
  layout: React.FC<IDefaultLayout>;
  component: any;
}
interface IPublicRoute {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
}

const publicRoutes: IPublicRoute[] = [
  {
    path: "/",
    component: TestLoginPage,
  },
  {
    path: "/partner",
    component: LoginPageAdmin,
  },
];

const privateCompanyRoutes: IPrivateRoute[] = [
  {
    path: "/statistics",
    layout: DefaultLayoutAdmin,
    component: StatisticsPage,
  },
  {
    path: "/statistics/:params",
    layout: DefaultLayoutAdmin,
    component: StatisticsPage,
  },
  {
    path: "/staff",
    layout: DefaultLayoutAdmin,
    component: StaffPage,
  },
  {
    path: "/staff/:params",
    layout: DefaultLayoutAdmin,
    component: StaffPage,
  },
  {
    path: "/staff/:params/:params",
    layout: DefaultLayoutAdmin,
    component: CashierCard,
  },
  {
    path: "/notifications",
    layout: DefaultLayoutAdmin,
    component: NotificationsPage,
  },
  {
    path: "/news",
    layout: DefaultLayoutAdmin,
    component: NewsPage,
  },
  {
    path: "/news/:params",
    layout: DefaultLayoutAdmin,
    component: NewsPage,
  },
  {
    path: "/info",
    layout: DefaultLayoutAdmin,
    component: InfoPage,
  },
  {
    path: "/info/:params",
    layout: DefaultLayoutAdmin,
    component: InfoPage,
  },
  {
    path: "/services",
    layout: DefaultLayoutAdmin,
    component: ServicesPage,
  },
  {
    path: "/orders",
    layout: DefaultLayoutAdmin,
    component: OrdersPage,
  },
  {
    path: "/proposals",
    layout: DefaultLayoutAdmin,
    component: ProposalsPage,
  },
  {
    path: "/proposals/:params",
    layout: DefaultLayoutAdmin,
    component: ProposalsPage,
  },
  {
    path: "/settings/:params",
    layout: DefaultLayoutAdmin,
    component: SettingsPage,
  },
  {
    path: "/finances",
    layout: DefaultLayoutAdmin,
    component: FinancePage,
  },
  {
    path: "/finances/:params",
    layout: DefaultLayoutAdmin,
    component: FinancePage,
  },
  {
    path: "/clients",
    layout: DefaultLayoutAdmin,
    component: ClientsPage,
  },
  {
    path: "/clients/:params",
    layout: DefaultLayoutAdmin,
    component: ClientsPage,
  },
  {
    path: "/clients/:params/:params",
    layout: DefaultLayoutAdmin,
    component: ClientsPage,
  },
  {
    path: "/feedback",
    layout: DefaultLayoutAdmin,
    component: FeedbackPage,
  },
  {
    path: "/feedback/:params",
    layout: DefaultLayoutAdmin,
    component: FeedbackPage,
  },
  {
    path: "/support",
    layout: DefaultLayoutAdmin,
    component: SupportPage,
  },
];

const privateRoutes: IPrivateRoute[] = [
  {
    path: "/admin/companies",
    layout: DefaultLayoutAdmin,
    component: Companies,
  },
  {
    path: "/admin/categories",
    layout: DefaultLayoutAdmin,
    component: Categories,
  },
  {
    path: "/partner/company",
    layout: TestLoginPage,
    component: CompanyList,
  },
  {
    path: "/partner/registration",
    layout: TestLoginPage,
    component: RegistrationPanel,
  },
];

const RenderPublicRoutes = () => {
  const moderatorAutehntificationToken = localStorage.getItem(
    "partner_access_token"
  );
  const moderatorRefreshToken = localStorage.getItem("partner_refresh_token");
  return publicRoutes.map((item: IPublicRoute) => {
    if (
      moderatorAutehntificationToken &&
      moderatorRefreshToken &&
      window.location.pathname === "/"
    ) {
      return <Redirect to="/partner/company" />;
    }
    return (
      <Suspense fallback={<FallbackOnLazyLoad />}>
        <PublicRoute Component={item.component} path={item.path} />
      </Suspense>
    );
  });
};

const RenderRoutes = () => {
  const adminAuthentificationToken = localStorage.getItem("admin_access_token");
  const moderatorAutehntificationToken = localStorage.getItem(
    "partner_access_token"
  );
  const moderatorRefreshToken = localStorage.getItem("partner_refresh_token");
  let companyToken = localStorage.getItem("companyToken");
  return privateRoutes
    .map((item: IPrivateRoute) => {
      if (moderatorAutehntificationToken && moderatorRefreshToken) {
        return (
          <Suspense fallback={<FallbackOnLazyLoad />}>
            <PrivateRoute
              path={item.path}
              Layout={item.layout}
              Component={item.component}
            />
          </Suspense>
        );
      } else if (window.location.pathname !== "/partner") {
        return <Redirect to="/" />;
      }
      return <Redirect to="/" />;
    })
    .concat(
      privateCompanyRoutes.map((item: IPrivateRoute) => {
        return (
          <>
            <PrivateRoute
              path={item.path}
              Layout={item.layout}
              Component={item.component}
            />
          </>
        );
      })
    );
};

export const RenderAllRoutes: React.FC = () => {
  return (
    <>
      {RenderPublicRoutes()}
      {RenderRoutes()}
    </>
  );
};

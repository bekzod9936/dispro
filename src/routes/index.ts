import { lazy } from "react";
//layout
import ModeratorLayout from "components/ModeratorLayout";
//types
import { IPrivateRoute, IPublicRoute } from "./types";
//screens
import CompanyList from "../pages/LoginPages/LoginPage/Companylist/index";
import NotFound from "pages/NotFound";

const Companies = lazy(() => import("../pages/AdminDashBoard/companies"));
const Categories = lazy(() => import("../pages/AdminDashBoard/categories"));

//Partner
const ModeratorLogin = lazy(() => import("../pages/LoginPages/ModeratorLogin"));

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
const SettingsPage = lazy(() => import("../pages/CompanyPages/settings"));
const ServicesPage = lazy(() => import("../pages/CompanyPages/services"));
const ClientsPage = lazy(() => import("../pages/CompanyPages/clients"));
const FeedbackPage = lazy(() => import("../pages/CompanyPages/feedback"));
const TestLoginPage = lazy(
  () => import("../pages/LoginPages/LoginPage/TestLoginpage/index")
);
const RegistrationPanel = lazy(
  () => import("../pages/LoginPages/LoginPage/Registrationpanel/index")
);

export const authRoutes: IPublicRoute[] = [
  {
    path: "/",
    component: TestLoginPage,
  },
  {
    path: "/admin",
    component: ModeratorLogin,
  },
];

export const privateCompanyRoutes: IPrivateRoute[] = [
  {
    path: "/statistics/:params",
    component: StatisticsPage,
  },
  {
    path: "/staff/:params",
    component: StaffPage,
  },
  {
    path: "/staff/:params/:params",
    component: CashierCard,
  },
  {
    path: "/notifications",
    component: NotificationsPage,
  },
  {
    path: "/news/:params",
    component: NewsPage,
  },
  {
    path: "/info/:params",
    component: InfoPage,
  },
  {
    path: "/services/:params",
    component: ServicesPage,
  },
  {
    path: "/services/edit/:params",
    component: ServicesPage,
  },
  {
    path: "/orders",
    component: OrdersPage,
  },
  {
    path: "/proposals/:params",
    component: ProposalsPage,
  },
  {
    path: "/settings/:params",
    component: SettingsPage,
  },
  {
    path: "/finances/:params",
    component: FinancePage,
  },
  {
    path: "/clients",
    component: ClientsPage,
  },
  {
    path: "/clients/:params",
    component: ClientsPage,
  },
  {
    path: "/clients/:params/:params",
    component: ClientsPage,
  },
  {
    path: "/feedback/:params",
    component: FeedbackPage,
  },
  {
    path: "/support",
    component: SupportPage,
  },
  // {
  //   path: "*",
  //   layout: DefaultLayoutAdmin,
  //   component: NotFound,
  // },
];

export const privateRoutes: IPrivateRoute[] = [
  {
    path: "/admin/companies",
    component: Companies,
  },
  {
    path: "/admin/categories",
    component: Categories,
  },
  {
    path: "/partner/company",
    component: CompanyList,
  },
  {
    path: "/partner/registration",
    component: RegistrationPanel,
  },
];

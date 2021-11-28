import { lazy } from "react";
//layout
import DefaultLayoutAdmin from "components/Layout/DefaultLayoutAdmin";
import ModeratorLayout from "components/ModeratorLayout";
//types
import { IPrivateRoute, IPublicRoute } from "./types";
//screens
import CompanyList from "../pages/LoginPages/LoginPage/Companylist/index";

const Companies = lazy(() => import("../pages/AdminDashBoard/AdminCompanies"));
const Categories = lazy(
  () => import("../pages/AdminDashBoard/AdminCategories/AdminCategories")
);

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
const SettingsPage = lazy(
  () => import("../pages/CompanyPages/settings/SettingsPage")
);
const ServicesPage = lazy(
  () => import("../pages/CompanyPages/services/ServicesPage")
);
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
    path: "/news/:params",
    layout: DefaultLayoutAdmin,
    component: NewsPage,
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

export const privateRoutes: IPrivateRoute[] = [
  {
    path: "/admin/companies",
    layout: ModeratorLayout,
    component: Companies,
  },
  {
    path: "/admin/categories",
    layout: ModeratorLayout,
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

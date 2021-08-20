import React, { Suspense } from "react";
import react, { lazy } from "react"
import { Redirect, Route } from "react-router-dom";
import FallbackOnLazyLoad from "../pages/Fallbacks/FallbackOnLazyLoad";
import DefaultLayoutAdmin, { IDefaultLayout } from "../components/Layout/DefaultLayoutAdmin";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const prefix = "../pages/AdminDashBoard";
//tokens
// const adminAuthentificationToken = localStorage.getItem("admin_access_token");
// const moderatorAutehntificationToken = localStorage.getItem("partner_access_token");
// const moderatorRefreshToken = localStorage.getItem("partner_refresh_token");


//Lazy loaded components
//Admin

const LoginPageModerator = lazy(() => import("../pages/LoginPages/LoginPageModerator/LoginPageModerator"))
//const DefaultLayoutAdmin = lazy(() => import("../components/Layout/DefaultLayoutAdmin"))
const Companies = lazy(() => import("../pages/AdminDashBoard/AdminCompanies/AdminCompanies"));
const Categories = lazy(() => import("../pages/AdminDashBoard/AdminCategories/AdminCategories"));

//Partner 
const LoginPageAdmin = lazy(() => import("../pages/LoginPages/LoginPageAdmin/LoginPageAdmin"));

const StatisticsPage = lazy(() => import("../pages/CompanyPages/statistics/StatisticsPage"));
const StaffPage = lazy(() => import("../pages/CompanyPages/staff/StaffPage"));
const NotificationsPage = lazy(() => import("../pages/CompanyPages/notifications/NotificationsPage"));
const NewsPage = lazy(() => import("../pages/CompanyPages/news/NewsPage"));
const FinancePage = lazy(() => import("../pages/CompanyPages/finances/FinancePage"));
const InfoPage = lazy(() => import("../pages/CompanyPages/info/InfoPage"));
const OrdersPage = lazy(() => import("../pages/CompanyPages/orders/OrdersPage"));
const ProposalsPage = lazy(() => import("../pages/CompanyPages/proposals/ProposalsPage"));
const SettingsPage = lazy(() => import("../pages/CompanyPages/settings/SettingsPage"));
const ServicesPage = lazy(() => import("../pages/CompanyPages/services/ServicesPage"));
const ClientsPage = lazy(() => import("../pages/CompanyPages/clients/ClientsPage"));
const FeedbackPage = lazy(() => import("../pages/CompanyPages/feedback/FeedbackPage"));
const TestLoginPage = lazy(() => import("../pages/LoginPages/LoginPageModerator/TestLoginPage"))
const CompanyList = lazy(() => import("../pages/LoginPages/LoginPageModerator/CompanyList"))
const RegistrationPanel = lazy(() => import("../pages/LoginPages/LoginPageModerator/RegistrationPanel"))
// const LoginPageModerator = lazy(()=>import("../pages/LoginPages/LoginPageModerator/LoginPageModerator"));

export interface IPrivateRoute {
    path: string,
    layout: React.FC<IDefaultLayout>
    component: React.LazyExoticComponent<React.ComponentType<any>>
}
interface IPublicRoute {
    path: string,
    component: React.LazyExoticComponent<React.ComponentType<any>>
}

const publicRoutes: IPublicRoute[] = [
    {
        path: "/",
        component: TestLoginPage
    },
    {
        path: "/partner",
        component: LoginPageAdmin,
    },

]

const privateCompanyRoutes: IPrivateRoute[] = [
    {
        path: "/statistics",
        layout: DefaultLayoutAdmin,
        component: StatisticsPage,
    },
    {
        path: "/staff",
        layout: DefaultLayoutAdmin,
        component: StaffPage,
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
        path: "/info",
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
        path: "/settings",
        layout: DefaultLayoutAdmin,
        component: SettingsPage,
    },
    {
        path: "/finances",
        layout: DefaultLayoutAdmin,
        component: FinancePage,
    },
    {
        path: "/clients",
        layout: DefaultLayoutAdmin,
        component: ClientsPage,
    },
    {
        path: "/feedback",
        layout: DefaultLayoutAdmin,
        component: FeedbackPage,
    },


]

const privateRoutes: IPrivateRoute[] = [
    {
        path: "/admin/companies",
        layout: DefaultLayoutAdmin,
        component: Companies,
    },
    {
        path: "/admin/categories",
        layout: DefaultLayoutAdmin,
        component: Categories
    },
    {
        path: '/partner/company',
        layout: TestLoginPage,
        component: CompanyList,
    },
    {
        path: "/partner/registration",
        layout: TestLoginPage,
        component: RegistrationPanel
    }

]

const RenderPublicRoutes = () => {

    const moderatorAutehntificationToken = localStorage.getItem("partner_access_token");
    const moderatorRefreshToken = localStorage.getItem("partner_refresh_token");
    return (

        publicRoutes.map((item: IPublicRoute) => {
            console.log("Public Routes!")
            if (moderatorAutehntificationToken && moderatorRefreshToken && window.location.pathname === "/") {

                return <Redirect to="/partner/company" />
            }
            return (<Suspense fallback={<FallbackOnLazyLoad />}>
                <PublicRoute Component={item.component} path={item.path} />
            </Suspense>)

        })

    )
}

const RenderRoutes = () => {
    const adminAuthentificationToken = localStorage.getItem("admin_access_token");
    const moderatorAutehntificationToken = localStorage.getItem("partner_access_token");
    const moderatorRefreshToken = localStorage.getItem("partner_refresh_token");
    let companyToken = localStorage.getItem("companyToken");
    return (
        privateRoutes.map((item: IPrivateRoute) => {

            if (moderatorAutehntificationToken && moderatorRefreshToken) {

                console.log("ENTERED!!!!");

                return (
                    <Suspense fallback={<FallbackOnLazyLoad />}>
                        <PrivateRoute path={item.path} Layout={item.layout} Component={item.component} />
                    </Suspense>
                )
            }
            else if (window.location.pathname !== "/partner") {

                return <Redirect to="/" />
            }
        }).concat(privateCompanyRoutes.map((item: IPrivateRoute) => {

            return (
                <Suspense fallback={<FallbackOnLazyLoad />}>
                    <PrivateRoute path={item.path} Layout={item.layout} Component={item.component} />
                </Suspense>
            )
        }

        ))

    )
}


export const RenderAllRoutes: React.FC = () => {
    return (
        <>
            {RenderPublicRoutes()}
            {RenderRoutes()}


        </>
    )
}
import React, { lazy, Suspense } from 'react';
import { Redirect } from 'react-router';
import FallbackOnLazyLoad from '../pages/Fallbacks/FallbackOnLazyLoad';
import PrivateRoute from './PrivateRoute';

import { IPrivateRoute } from './Protection';
const StatisticsPage = lazy(
  () => import('../pages/CompanyPages/statistics/StatisticsPage')
);
const StaffPage = lazy(() => import('../pages/CompanyPages/staff/StaffPage'));
const NotificationsPage = lazy(
  () => import('../pages/CompanyPages/notifications/NotificationsPage')
);
const NewsPage = lazy(() => import('../pages/CompanyPages/news/NewsPage'));
const FinancePage = lazy(
  () => import('../pages/CompanyPages/finances/FinancePage')
);
const InfoPage = lazy(() => import('../pages/CompanyPages/info/InfoPage'));
const OrdersPage = lazy(
  () => import('../pages/CompanyPages/orders/OrdersPage')
);
const ProposalsPage = lazy(
  () => import('../pages/CompanyPages/proposals/ProposalsPage')
);
const SettingsPage = lazy(
  () => import('../pages/CompanyPages/settings/SettingsPage')
);
const ServicesPage = lazy(
  () => import('../pages/CompanyPages/services/ServicesPage')
);
const ClientsPage = lazy(
  () => import('../pages/CompanyPages/clients/ClientsPage')
);
const DefaultLayoutAdmin = lazy(
  () => import('../components/Layout/DefaultLayoutAdmin')
);

const privateCompanyRoutes: IPrivateRoute[] = [
  {
    path: '/statistics',
    layout: DefaultLayoutAdmin,
    component: StatisticsPage,
  },
  {
    path: '/staff',
    layout: DefaultLayoutAdmin,
    component: StaffPage,
  },
  {
    path: '/notifications',
    layout: DefaultLayoutAdmin,
    component: NotificationsPage,
  },
  {
    path: '/news',
    layout: DefaultLayoutAdmin,
    component: NewsPage,
  },
  {
    path: '/info',
    layout: DefaultLayoutAdmin,
    component: InfoPage,
  },
  {
    path: '/services',
    layout: DefaultLayoutAdmin,
    component: ServicesPage,
  },
  {
    path: '/orders',
    layout: DefaultLayoutAdmin,
    component: OrdersPage,
  },
  {
    path: '/proposals',
    layout: DefaultLayoutAdmin,
    component: ProposalsPage,
  },
  {
    path: '/settings',
    layout: DefaultLayoutAdmin,
    component: SettingsPage,
  },
  {
    path: '/finances',
    layout: DefaultLayoutAdmin,
    component: FinancePage,
  },
  {
    path: '/clients',
    layout: DefaultLayoutAdmin,
    component: ClientsPage,
  },
];

export const renderCompanyPages = () => {
  let companyToken = localStorage.getItem('company_token');
  return privateCompanyRoutes.map((item: IPrivateRoute) => {
    if (companyToken) {
      return (
        <Suspense fallback={<FallbackOnLazyLoad />}>
          <PrivateRoute
            path={item.path}
            Layout={item.layout}
            Component={item.component}
          />
        </Suspense>
      );
    } else {
      return <Redirect to='/' />;
    }
  });
};

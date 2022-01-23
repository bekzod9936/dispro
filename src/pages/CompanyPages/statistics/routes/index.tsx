import { lazy } from 'react';
import { useTranslation } from 'react-i18next';

const Clients = lazy(() => import('../screens/Clients'));
const Offers = lazy(() => import('../screens/Offers'));
const Operations = lazy(() => import('../screens/Operations'));
const Traffics = lazy(() => import('../screens/Traffics'));

interface IStatisticRow {
  path: string;
  text: string;
  component: any;
}

const useStatisticsRoute = () => {
  const { t } = useTranslation();
  const menuItems: IStatisticRow[] = [
    {
      path: '/statistics/clients',
      text: t('clients'),
      component: Clients,
    },
    {
      path: '/statistics/operations',
      text: t('operations'),
      component: Operations,
    },
    {
      path: '/statistics/traffics',
      text: t('traffic_providers'),
      component: Traffics,
    },
    {
      path: '/statistics/offers',
      text: t('proposals'),
      component: Offers,
    },
  ];

  return { menuItems };
};

export default useStatisticsRoute;

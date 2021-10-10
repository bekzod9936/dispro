import { lazy } from 'react';
import { useTranslation } from 'react-i18next';

const About = lazy(() => import('../screens/About'));
const Address = lazy(() => import('../screens/Address'));
const Photos = lazy(() => import('../screens/Photos'));

interface IInfoRow {
  path: string;
  text: string;
  component: any;
}

const useInfoRoute = () => {
  const { t } = useTranslation();
  const menuItems: IInfoRow[] = [
    {
      path: '/info',
      text: t('aboutCompany'),
      component: About,
    },
    {
      path: '/info/address',
      text: t('address'),
      component: Address,
    },
    {
      path: '/info/photos',
      text: t('photos'),
      component: Photos,
    },
  ];

  return { menuItems };
};

export default useInfoRoute;

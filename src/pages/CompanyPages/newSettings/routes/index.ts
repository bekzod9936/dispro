import { lazy } from 'react';
import { useTranslation } from 'react-i18next';

const Loyalty = lazy(() => import('../screens/Loyalty'));
const Referal = lazy(() => import('../screens/Referal'));
const Awarding = lazy(() => import('../screens/Awarding'));
const Security = lazy(() => import('../screens/Security'));
const QRCodes = lazy(() => import('../screens/QRCodes'));

export interface ISettingsRow {
  path: string;
  text: string;
  component: any;
}

const useSettingsRoutes = () => {
  const { t } = useTranslation();
  const menuItems: ISettingsRow[] = [
    {
      path: '/newsettings/loyality',
      text: t('loyaltyProgram'),
      component: Loyalty,
    },
    {
      path: '/newsettings/referal',
      text: t('referalProgram'),
      component: Referal,
    },
    {
      path: '/newsettings/awarding',
      text: t('awarding'),
      component: Awarding,
    },
    {
      path: '/newsettings/security',
      text: t('security'),
      component: Security,
    },
    {
      path: '/newsettings/qrcodes',
      text: t('qrcodes'),
      component: QRCodes,
    },
  ];
  return { menuItems };
};

export default useSettingsRoutes;

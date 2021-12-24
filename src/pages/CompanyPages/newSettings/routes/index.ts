import { lazy } from 'react';
import { useTranslation } from 'react-i18next';

const AwardingSection = lazy(
    () => import("../screens/AwardingSection")
  );
  const LoyaltyProgramSection = lazy(
    () => import("../screens/LoyaltyProgramSection")
  );
  const QRCodesSection = lazy(
    () => import("../screens/QRCodesSection")
  );
  const ReferalProgramSection = lazy(
    () => import("../screens/ReferalProgram")
  );
  const SecuritySection = lazy(
    () => import("../screens/SecuritySection")
  );

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

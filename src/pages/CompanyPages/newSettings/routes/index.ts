import { lazy } from 'react';
import { useTranslation } from 'react-i18next';

const AwardingSection = lazy(
    () => import("../screens/Awarding")
  );
  const LoyaltyProgramSection = lazy(
    () => import("../screens/LoyaltyProgramSection")
  );
  const QRCodesSection = lazy(
    () => import("../screens/QRCodes")
  );
  const ReferalProgramSection = lazy(
    () => import("../screens/Referal")
  );
  const SecuritySection = lazy(
    () => import("../screens/Security")
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
      component: LoyaltyProgramSection,
    },
    {
      path: '/newsettings/referal',
      text: t('referalProgram'),
      component: ReferalProgramSection,
    },
    {
      path: '/newsettings/awarding',
      text: t('awarding'),
      component: AwardingSection,
    },
    {
      path: '/newsettings/security',
      text: t('security'),
      component: SecuritySection,
    },
    {
      path: '/newsettings/qrcodes',
      text: t('qrcodes'),
      component: QRCodesSection,
    },
  ];
  return { menuItems };
};

export default useSettingsRoutes;

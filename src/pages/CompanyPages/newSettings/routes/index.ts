import { lazy } from "react";
import { useTranslation } from "react-i18next";

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

 const useSettingsRoutes=()=>{
    const { t } = useTranslation();
    const menuItems:ISettingsRow[]=[
        {
            path:'/newsettings/loyality',
            text:t('loyaltyProgram'),
            component:LoyaltyProgramSection
        },
        {
            path:'/newsettings/referalProgram',
            text:t('referalProgram'),
            component:ReferalProgramSection
        },
        {
            path:'/newsettings/awarding',
            text:t('awarding'),
            component:AwardingSection
        },
        {
            path:'/newsettings/security',
            text:t('security'),
            component:SecuritySection
        },
        {
           path:'/newsettings/qrcodes',
           text:t('qrcodes'),
           component:QRCodesSection
        }
    ]
    return {menuItems}
 } 

 export default useSettingsRoutes;
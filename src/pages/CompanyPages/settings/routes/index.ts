import { lazy } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "services/redux/hooks";

const AwardingSection = lazy(() => import("../screens/Rewarding"));
const LoyaltyProgramSection = lazy(
  () => import("../screens/LoyaltyProgramSection")
);
const QRCodesSection = lazy(() => import("../screens/QRCodes"));
// const ReferalProgramSection = lazy(() => import('../screens/Referal'));
const SecuritySection = lazy(() => import("../screens/Security"));
const ReferalProgrammSection = lazy(
  () => import("../screens/ReferalProgrammSection/ReferalProgrammSection")
);
// const ReferalProgrammSection = lazy(
//   () => import('../../settings/screens/ReferalProgrammSection/ReferalProgrammSection')
// );
export interface ISettingsRow {
  path: string;
  text: string;
  component: any;
}

const useSettingsRoutes = () => {
  const { t } = useTranslation();
  const type = useAppSelector((state) => state.info.data?.type);

  const menuItems: ISettingsRow[] = [
    {
      path: "/settings/loyality",
      text: t("loyaltyProgram"),
      component: LoyaltyProgramSection,
    },
    {
      path: "/settings/referal",
      text: t("referalProgram"),
      component: ReferalProgrammSection,
    },
    {
      path: "/settings/rewarding",
      text: t("awarding"),
      component: AwardingSection,
    },

    {
      path: "/settings/security",
      text: t("security"),
      component: SecuritySection,
    },
    {
      path: "/settings/qrcodes",
      text: t("qrcodes"),
      component: QRCodesSection,
    },
  ].filter((v: any) => {
    if (v.path === "/settings/security") {
      if (type === 1) {
        return v;
      } else {
        return null;
      }
    }
    return v;
  });
  return { menuItems };
};

export default useSettingsRoutes;

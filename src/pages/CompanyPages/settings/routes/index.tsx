import { lazy } from "react";
import { useTranslation } from "react-i18next";

const AwardingSection = lazy(
  () => import("../screens/AwardingSection/AwardingSection")
);
const LoyaltyProgramSection = lazy(
  () => import("../screens/LoyalityProgramSection/LoyaltyProgramSection")
);
const QRCodesSection = lazy(
  () => import("../screens/QRCodesSection/QRCodesSection")
);
const ReferalProgrammSection = lazy(
  () => import("../screens/ReferalProgrammSection/ReferalProgrammSection")
);
const SecuritySection = lazy(
  () => import("../screens/SecuritySection/SecuritySection")
);

export interface ISettingsRow {
  path: string;
  text: string;
  component: any;
}

const useSettingsRoute = () => {
  const { t } = useTranslation();
  const menuItems: ISettingsRow[] = [
    {
      path: "/settings",
      text: t("loyaltyProgram"),
      component: LoyaltyProgramSection,
    },
    {
      path: "/settings/referalProgram",
      text: t("referalProgram"),
      component: ReferalProgrammSection,
    },
    {
      path: "/settings/awarding",
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
  ];

  return { menuItems };
};

export default useSettingsRoute;

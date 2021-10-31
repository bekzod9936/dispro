import { lazy } from "react";
import { useTranslation } from "react-i18next";

const CashierScreen = lazy(() => import("../screens/CashierScreen"));
const ManagerScreen = lazy(() => import("../screens/ManagerScreen"));
const CashierSetting = lazy(() => import("../screens/CashierSettings"));
const CashierCard = lazy(() => import("../screens/CashierCard/index"));
const CashierBalls = lazy(
  () => import("../screens/CashierCard/screens/CashierBalls")
);
const CashierFeedback = lazy(
  () => import("../screens/CashierCard/screens/CashierFeedback")
);

export interface IStaffsRow {
  path: string;
  text: string;
  component: any;
}

const useStaffRoute = () => {
  const { t } = useTranslation();
  const staffPath: IStaffsRow[] = [
    {
      path: "/staff",
      text: t("cashier"),
      component: CashierScreen,
    },
    {
      path: "/staff/manager",
      text: t("manager"),
      component: ManagerScreen,
    },
  ];

  const menuItems: IStaffsRow[] = [
    {
      path: "/staff",
      text: t("cashier"),
      component: CashierScreen,
    },
    {
      path: "/staff/setting",
      text: t("cashier_setting"),
      component: CashierSetting,
    },
    {
      path: "/staff/manager",
      text: t("manager"),
      component: ManagerScreen,
    },
    {
      path: "/staff/cashier/statistic",
      text: t("statistic"),
      component: CashierCard,
    },
    {
      path: "/staff/cashier/balls",
      text: t("balls"),
      component: CashierBalls,
    },
    {
      path: "/staff/cashier/feedback",
      text: t("comments"),
      component: CashierFeedback,
    },
  ];

  return {
    menuItems,
    staffPath,
  };
};

export default useStaffRoute;

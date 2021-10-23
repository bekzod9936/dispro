import { lazy } from "react";
import { useTranslation } from "react-i18next";

const CashierScreen = lazy(() => import("../screens/CashierScreen"));
const ManagerScreen = lazy(() => import("../screens/ManagerScreen"));

export interface IStaffsRow {
  path: string;
  text: string;
  component: any;
}

const useStaffRoute = () => {
  const { t } = useTranslation();
  const menuItems: IStaffsRow[] = [
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

  return {
    menuItems,
  };
};

export default useStaffRoute;

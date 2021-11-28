import { useMemo } from "react";
import { StatisticsIcon } from "./style";

const useLayout = () => {
  const sidebar = useMemo(
    () => [
      {
        path: "/admin/companies",
        label: "companies",
        Icon: StatisticsIcon,
      },
    ],
    []
  );
  return {
    sidebar,
  };
};

export default useLayout;

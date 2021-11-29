import { useMemo } from "react";
import { StatisticsIcon } from "./style";

const useLayout = () => {
  const sidebar = useMemo(
    () => [
      {
        path: "admin/companies",
        text: "companies",
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

import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const headers = [
  {
    value: "value",
    label: "",
  },
  {
    value: "role",
    label: "role",
  },
];

const useRoles = () => {
  const { t } = useTranslation();
  const roles: any = [
    { role: t("statistics"), value: "statistics" },
    { role: t("staff"), value: "staff" },
    { role: t("clients"), value: "clients" },
    { role: t("coupons"), value: "coupons" },
    { role: t("news"), value: "news" },
    { role: t("ratings"), value: "ratings" },
    { role: t("information"), value: "information" },
    { role: t("settings"), value: "settings" },
    { role: t("finance"), value: "finance" },
  ];

  const columns: any = useMemo(() => {
    return headers.map((header) => {
      return {
        Header: header.value,
        accessor: header.label,
      };
    });
  }, [headers]);

  return {
    roles,
    columns,
  };
};

export default useRoles;

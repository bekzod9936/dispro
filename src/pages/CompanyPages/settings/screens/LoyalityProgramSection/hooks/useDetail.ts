import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const useDetail = () => {
  const { t } = useTranslation();

  const loyalityOptions = useMemo(
    () => [
      { value: 1, label: t("purchaseSum") },
      { value: 3, label: t("companyVisits") },
      {
        value: 2,
        label: t("recomendations"),
      },
    ],
    [t]
  );

  const oneFullOptions = useMemo(
    () => [{ value: "and", label: t("and") }],
    [t]
  );

  const labelType = (value: string | number) => {
    if (value === 1) {
      return t("purchaseSum");
    } else if (value === 2) {
      return t("recomendations");
    } else if (value === 3) {
      return t("companyVisits");
    } else {
      return "";
    }
  };
  return {
    labelType,
    loyalityOptions,
    oneFullOptions,
  };
};

export default useDetail;

import notification from "assets/images/notification.png";
import { useTranslation } from "react-i18next";
import { WrapDefault } from "./style";

const Default = () => {
  const { t } = useTranslation();
  return (
    <WrapDefault>
      <img src={notification} alt="notification.png" />
      <span>{t("notificationsfromdiscount")}</span>
    </WrapDefault>
  );
};

export default Default;

import { useTranslation } from "react-i18next";
import { NotificationDiv } from "./style";

const NotificationsPage = () => {
  const { t } = useTranslation();

  return (
    <NotificationDiv>
      <p>{t("male")}</p>
    </NotificationDiv>
  );
};

export default NotificationsPage;

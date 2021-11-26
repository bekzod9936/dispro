import { useTranslation } from "react-i18next";

const useRoles = () => {
  const { t } = useTranslation();

  const permissionsRole: any = {
	statistics: [],
	clients: [],
	orders: [],
	services: [],
	feedback: [],
	news: [],
	staff: [],
	proposals: [],
	finances: [],
	notifications: [],
	info: [],
	settings: [],
	support: [],
};


  return {
    permissionsRole,
  };
};

export default useRoles;

import moment from "moment";
import adminInterceptor from "services/interceptors/adminInterceptor";
import partnerApi from "services/interceptors/companyInterceptor";
import { URL } from "services/constants/config";

// Using program loyality and customer point

export const fetchProgramSettings = () => {
  const response = partnerApi.get("/directory/company-settings/program");
  return response;
};

export const changeProgramLoyality = ({ bonusType, data }: any) => {
  const response = partnerApi.put(`/bonus/${bonusType}s/active-status`, data);
  return response;
};

export const loyalitySaveChange = (data: any, active: any) => {
  const response = partnerApi.put(`/bonus/${active}s`, data);

  return response;
};

export const saveUseProgramLoyality = (data: any) => {
  const response = partnerApi.put(`/directory/company-settings/program`, data);

  return response;
};

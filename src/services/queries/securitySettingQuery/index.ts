import partnerApi from "services/interceptors/partner_interceptor";

export const changeCompanySecurity = (data: any) => {
  const response = partnerApi.put("/core/company-safeties", data);

  return response;
};

import adminInterceptor from "../../interceptors/moderator_interceptor";

export const fetchCompanies = (type: string) => {
  const response = adminInterceptor.get(
    `/directory/company/by/type/${type}?app=web`
  );
  return response;
};

export const fetchCompanyStatus = () => {
  const response = adminInterceptor.get(`directory/company/counts/by-status`);
  return response;
};

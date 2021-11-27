import adminInterceptor from "services/interceptors/moderator_interceptor";

export const getCompanies = async () => {
  const response = await adminInterceptor.get(
    `directory/company/by/type/2?app=web`
  );
  return response;
};

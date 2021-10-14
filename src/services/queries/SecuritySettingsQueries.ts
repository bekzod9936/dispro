import partnerApi from "services/interceptors/companyInterceptor";

export const changeCompanySecurity = (data: any) => {
  const response = partnerApi.put("/core/company-safeties", {
    safeties: {
      daily_purchase_limit: +data.first,
    },
  });

  return response;
};

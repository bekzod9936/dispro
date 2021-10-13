import partnerApi from "services/interceptors/companyInterceptor";

export const setNewReferal = ({ companyId, referals }: any) => {
  const response = partnerApi.post("/bonus/bonusreferals", {
    companyId: companyId,
    levels: referals,
  });

  return response;
};

export const changeReferal = ({ companyId, referals }: any) => {
  const response = partnerApi.put("/bonus/bonusreferals", {
    companyId: companyId,
    levels: referals,
  });

  return response;
};

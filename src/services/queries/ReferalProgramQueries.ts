import partnerApi from "services/interceptors/companyInterceptor";

export const setNewReferal = ({ companyId, referals, isActive }: any) => {
  const response = partnerApi.post("/bonus/bonusreferals", {
    companyId: companyId,
    levels: referals,
    isActive: isActive,
  });

  return response;
};

export const changeReferal = ({ companyId, referals, isActive }: any) => {
  const response = partnerApi.put("/bonus/bonusreferals", {
    companyId: companyId,
    levels: referals,
    isActive: isActive,
  });

  return response;
};

export const getReferalLevel = () => {
  const response = partnerApi.get("/core/referals/clients-by-level");

  return response;
};

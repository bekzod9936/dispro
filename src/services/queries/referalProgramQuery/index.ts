import partnerApi from "services/interceptors/partner_interceptor";

export const setNewReferal = async ({ companyId, referals, isActive }: any) => {
  const response = await partnerApi.post("/bonus/bonusreferals", {
    companyId: companyId,
    levels: referals,
    isActive: isActive,
  });

  return response;
};

export const changeReferal = async ({ companyId, referals, isActive }: any) => {
  const response = await partnerApi.put("/bonus/bonusreferals", {
    companyId: companyId,
    levels: referals,
    isActive: isActive,
  });

  return response;
};

export const getReferalLevel = async () => {
  const response = await partnerApi.get("/core/referals/clients-by-level");

  return response;
};

export const setReferalActive = async (data: any) => {
  const response = await partnerApi.put(
    "/bonus/bonusreferals/active-status",
    data
  );

  return response;
};

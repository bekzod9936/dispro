import partnerApi from "services/interceptors/partner_interceptor";

//rewarding

export const fetchRewards = () => {
  const response = partnerApi.get("/bonus/rewards");
  return response;
};

export const postRewards = (data: any) => {
  const response = partnerApi.post("/bonus/rewards", data);
  return response;
};

//security

export const fetchSecurity = () => {
  const response = partnerApi.get("/core/company-safeties");
  return response;
};

export const postSecurity = (data: any) => {
  const response = partnerApi.put("/core/company-safeties", data);
  return response;
};

//qrcodes

export const fetchQRCodes = () => {
  const response = partnerApi.get("/core/ref");
  return response;
};

export const fetchBranchesQrCode = () => {
  const response = partnerApi.get("/directory/stores/qr-codes");
  return response;
};

export const putBranchesQuery = (data: any) => {
  const response = partnerApi.put("/directory/company/generate/qr-code", data);
  return response;
};

export const postRefQuery = async (data: any) => {
  const response = await partnerApi.post("/core/ref", data);
  return response;
};

export const refDeleteQrCode = async (data: any) => {
  const response = await partnerApi.delete("/core/ref", data);
  return response;
};

export const refEditQrCode = async (data: any) => {
  const response = await partnerApi.put("/core/ref", data);
  return response;
};

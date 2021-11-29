import partnerApi from "services/interceptors/partner_interceptor";

export const createQrCode = async (data: any) => {
  const response = await partnerApi.post("/core/ref", data);

  return response;
};

export const editQrCode = async (data: any) => {
  const response = await partnerApi.put("/core/ref", data);
  return response;
};

export const deleteQrCode = async (data: any) => {
  const response = await partnerApi.delete("/core/ref", data);

  return response;
};

export const generateBranchQr = async (data: any) => {
  const response = await partnerApi.put(
    "/directory/company/generate/qr-code",
    data
  );

  return response;
};

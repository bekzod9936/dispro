import partnerApi from "services/interceptors/companyInterceptor";

export const createQrCode = (data: any) => {
  const response = partnerApi.post("/core/ref", data);

  return response;
};

export const editQrCode = (data: any) => {
  const response = partnerApi.put("/core/ref", data);
  return response;
};

export const deleteQrCode = (data: any) => {
  const response = partnerApi.delete("/core/ref", data);

  return response;
};

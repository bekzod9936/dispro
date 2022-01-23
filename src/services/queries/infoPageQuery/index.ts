import partnerApi from "services/interceptors/partner_interceptor";

export const fetchAddressInfo = async (id: any) => {
  const response = partnerApi.get(`directory/stores/by-company/${id}`);
  return response;
};

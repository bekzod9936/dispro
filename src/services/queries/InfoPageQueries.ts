import partnerApi from "../interceptors/companyInterceptor";

export const fetchAddressInfo = async (id: any) => {
	const response = partnerApi.get(`directory/stores/by-company/${id}`);
	return response;
};

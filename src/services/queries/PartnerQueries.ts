import partnerApi from "../interceptors/companyInterceptor";

export const fetchClientStatistics = async () => {
	const response = await partnerApi.get(`partner-stats/clients`);
	return response;
};

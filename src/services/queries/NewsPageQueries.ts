import partnerApi from "../interceptors/companyInterceptor";

export const fetchFilials = () => {
	const response = partnerApi.get("/directory/store");
	return response;
};

export const fetchPendingNews = (section: string) => {
	const response = partnerApi.get("/core/news/by/company/" + section);
	return response;
};

export const fetchActiveQueries = () => {
	const response = partnerApi.get("/core/news/by/company/actives/news");
	return response;
};

// export const fetchArchiveQueries = () => {
// 	const response = partnerApi.get("/core/news/by/company/archives");
// 	return response;
// };

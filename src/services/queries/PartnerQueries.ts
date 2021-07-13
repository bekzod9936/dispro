import moment from "moment";
import partnerApi from "../interceptors/companyInterceptor";

export const fetchClientStatistics = async (
	section: string,
	gender?: "male" | "female" | "",
	purchaseFrom?: number,
	purchaseTo?: number,
	purchaseCost?: number,
	status?: string,
	traffic_provider?: string,
	endDate?: any,
	fromDate?: any,
	startDateUpper?: any,
	endDateUpper?: any
) => {
	const query = [];
	if (gender) {
		query.push(
			`genderTypeId=${gender === "male" ? 1 : gender === "female" ? 2 : null}`
		);
	}
	if (purchaseFrom) {
		query.push(`purchaseCountFrom=${purchaseFrom}`);
	}
	if (purchaseTo) {
		query.push(`purchaseCountTo=${purchaseTo}`);
	}
	if (purchaseCost) {
		query.push(`allPurchaseSum=${purchaseCost}`);
	}
	if (endDate) {
		query.push(`regDateTo=${moment(endDate).format("YYYY-MM-DD")}`);
	}
	if (fromDate) {
		query.push(`regDateFrom=${moment(fromDate).format("YYYY-MM-DD")}`);
	}
	if (startDateUpper) {
		query.push(`startDate=${moment(startDateUpper).format("YYYY-MM-DD")}`);
	}
	if (endDateUpper) {
		query.push(`endDate=${moment(endDateUpper).format("YYYY-MM-DD")}`);
	}

	const response = await partnerApi.get(
		`partner-stats/${section}${
			query.length === 1
				? `?${query[0]}`
				: query.length > 1
				? `?${query.join("&")}`
				: ""
		}`
	);
	return response;
};

export const fetchClients = async (page: number) => {
	const response = await partnerApi(
		`/core/client/by/company?page=${page}&perPage=6`
	);
	return response;
};

export const fetchFeedbacks = async () => {
	const response = await partnerApi.get(
		"core/cashier/rating-review/?perPage=6&page=1"
	);
	return response;
};

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { URL, VERSION } from "../constants/config";
import jwtDecode from "jwt-decode";
import adminInterceptor from "./adminInterceptor";

const partnerApi = axios.create({
	baseURL: `${URL}/web`,
});

partnerApi.interceptors.request.use((config: AxiosRequestConfig) => {
	let companyToken = localStorage.getItem("companyToken");
	let moderatorToken = localStorage.getItem("access_token");
	config.headers.authorization = `Bearer ${companyToken}`;
	config.headers.langId = 1;
	config.headers.vers = VERSION;
	return config;
});

partnerApi.interceptors.response.use(
	(response: AxiosResponse<any>) => response,
	async (err: any) => {
		let companyToken = localStorage.getItem("companyToken");
		let moderatorToken = localStorage.getItem("access_token");
		console.log("HERE : " + companyToken);
		if (err.response.data.error.errId === 8 && companyToken) {
			console.log("here!");
			let decoded = await jwtDecode<any>(companyToken);
			if (decoded) {
				console.log(decoded);

				const response = await axios.put(
					`${URL}/auth/update-token`,
					{
						companyId: decoded?.companyId,
						companyType: decoded?.companyType,
					},
					{
						headers: {
							Authorization: "Bearer " + moderatorToken,
							langId: 1,
							vers: VERSION,
						},
					}
				);
				console.log("Response : " + response);
			}
		}

		return Promise.reject(err);
	}
);
export default partnerApi;

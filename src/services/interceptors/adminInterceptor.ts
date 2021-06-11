import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { error } from "console";
import { URL, VERSION } from "../constants/config";
import { IAuthToken } from "../Types/api";

const adminInterceptor = axios.create({
	baseURL: `${URL}/web`,
	headers: {
		"Content-Type": "application/json",
		langId: 1,
	},
});

adminInterceptor.interceptors.request.use((value: AxiosRequestConfig) => {
	const accessToken = localStorage.getItem("moderator_access_token");
	//const refreshToken = localStorage.getItem("moderator_refresh_token");
	value.headers.authorization = "Bearer " + accessToken;
	value.headers.vers = VERSION;
	//  value.headers.langId = 1;
	return value;
});

adminInterceptor.interceptors.response.use(
	(value: AxiosResponse<any>) => value,
	async (error: any) => {
		const originalRequest = error.config;
		const refreshToken = localStorage.getItem("moderator_refresh_token");

		if (error.response.data.error?.errId === 8) {
			try {
				const response = await axios.post(
					`${URL}/auth/token`,
					{
						refreshToken: refreshToken,
					},
					{
						headers: {
							langId: 1,
						},
					}
				);
				let data: IAuthToken = response.data;
				if (data.data?.accessToken) {
					console.log(data);
					localStorage.setItem("moderator_access_token", data.data.accessToken);
				}
			} catch (error) {
				if (
					error.response.data.error?.errId === 8 ||
					error.response.data.error?.errId === 7
				) {
					localStorage.clear();
					window.location.pathname = "/";
				}
			}
			return adminInterceptor(originalRequest);
		}

		return Promise.reject(error);
	}
);

export default adminInterceptor;

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { URL, VERSION } from "../../constants/config";
import { IAuthToken } from "../../Types/api";
import { MODERATOR } from "./types";

const adminInterceptor = axios.create({
  baseURL: `${URL}/web`,
  headers: {
    "Content-Type": "application/json",
    langId: 1,
  },
});

adminInterceptor.interceptors.request.use((value: AxiosRequestConfig) => {
  const accessToken = localStorage.getItem(MODERATOR.ACCESS_TOKEN);
  if (value.url?.includes("company/token")) {
    value.baseURL = URL;
  }
  value.headers.authorization = "Bearer " + accessToken;
  value.headers.vers = VERSION;
  value.headers.langId = 1;
  return value;
});

adminInterceptor.interceptors.response.use(
  (value: AxiosResponse<any>) => value,
  async (error: any) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem(MODERATOR.REFRESH_TOKEN);
    const errId = error?.response?.data?.error?.errId;

    if (errId === 8) {
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
          localStorage.setItem(MODERATOR.ACCESS_TOKEN, data.data.accessToken);
        }
      } catch (error: any) {
        if (errId === 8 || errId === 7) {
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

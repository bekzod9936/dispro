import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { URL, VERSION } from "../../constants/config";
import jwtDecode from "jwt-decode";
import { IAuthToken } from "../../Types/api";
import { PARTNER } from "../partner_interceptor/types";

const authApi = axios.create({
  baseURL: URL,
  headers: {},
});

authApi.interceptors.request.use((config: AxiosRequestConfig) => {
  let companyToken = localStorage.getItem("companyToken");
  config.headers.authorization = `Bearer ${companyToken}`;
  config.headers.langId = 1;
  config.headers.vers = VERSION;
  return config;
});

authApi.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  async (err: any) => {
    const originalRequest = err.config;
    let companyToken = localStorage.getItem(PARTNER.COMPANY_TOKEN);
    let accessToken = localStorage.getItem(PARTNER.ACCESS_TOKEN);
    let refreshToken = localStorage.getItem(PARTNER.REFRESH_TOKEN);
    const errId = err?.response?.data?.error?.errId;

    if ((errId === 8 || errId === 7) && companyToken) {
      let decoded: any = jwtDecode(companyToken);

      try {
        const response1 = await axios.post(
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
        let data: IAuthToken = response1.data;
        if (data.data?.accessToken) {
          localStorage.setItem(PARTNER.ACCESS_TOKEN, data.data.accessToken);
        }
      } catch (error: any) {
        if (errId === 8 || errId === 7) {
          localStorage.clear();
          window.location.pathname = "/";
        }
      }

      if (decoded) {
        const response2 = await axios({
          method: "PUT",
          url: `${URL}/auth/update-token`,
          headers: {
            langId: 1,
            authorization: "Bearer " + accessToken,
            vers: VERSION,
          },

          data: {
            companyId: decoded?.companyId,
            companyType: decoded?.companyType,
          },
        });
        localStorage.setItem(
          PARTNER.COMPANY_TOKEN,
          response2.data.data.accessToken
        );
      }
      authApi(originalRequest);
    }
    return Promise.reject(err);
  }
);
export default authApi;

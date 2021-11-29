import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import jwtDecode from "jwt-decode";
//constants
import { URL, VERSION } from "../../constants/config";
//types
import { IAuthToken } from "../../Types/api";
import { PARTNER } from "./types";

const partnerApi = axios.create({
  baseURL: `${URL}/web`,
  headers: {},
});

partnerApi.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = localStorage.getItem(PARTNER.ACCESS_TOKEN);
  const companyToken = localStorage.getItem(PARTNER.COMPANY_TOKEN);
  console.log(config.url, config.method, "main url");
  if (
    config.url?.includes("core/staff-companies") ||
    config.url?.includes("auth/update-token") ||
    (config.url === "/directory/company" && config.method === "post")
  ) {
    config.headers.authorization = `Bearer ${accessToken}`;
  } else {
    config.headers.authorization = `Bearer ${companyToken}`;
  }
  config.headers.langId = 1;
  config.headers.vers = VERSION;
  return config;
});

partnerApi.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  async (err: any) => {
    const originalRequest = err.config;
    let companyToken = localStorage.getItem(PARTNER.COMPANY_TOKEN);
    let moderatorToken = localStorage.getItem(PARTNER.ACCESS_TOKEN);
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
      //return adminInterceptor(originalRequest);

      if (decoded) {
        const response2 = await axios({
          method: "PUT",
          url: `${URL}/auth/update-token`,
          headers: {
            langId: 1,
            authorization: "Bearer " + moderatorToken,
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
      partnerApi(originalRequest);
    }
    return Promise.reject(err);
  }
);
export default partnerApi;
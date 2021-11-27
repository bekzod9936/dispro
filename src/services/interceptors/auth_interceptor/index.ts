import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { URL, VERSION } from "../../constants/config";
import jwtDecode from "jwt-decode";
import { IAuthToken } from "../../Types/api";

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
    let companyToken = localStorage.getItem("companyToken");
    let moderatorToken = localStorage.getItem("partner_access_token");
    let refreshToken = localStorage.getItem("partner_refresh_token");

    if (
      (err.response.data.error.errId === 8 ||
        err.response.data.error.errId === 7) &&
      companyToken
    ) {
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
          localStorage.setItem("partner_access_token", data.data.accessToken);
        }
      } catch (error: any) {
        if (
          error.response.data.error?.errId === 8 ||
          error.response.data.error?.errId === 7
        ) {
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
            authorization: "Bearer " + moderatorToken,
            vers: VERSION,
          },

          data: {
            companyId: decoded?.companyId,
            companyType: decoded?.companyType,
          },
        });
        localStorage.setItem("companyToken", response2.data.data.accessToken);
      }
      authApi(originalRequest);
    }
    return Promise.reject(err);
  }
);
export default authApi;

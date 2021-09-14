import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { URL, VERSION } from '../constants/config';
import jwtDecode from 'jwt-decode';
import adminInterceptor from './adminInterceptor';
import { IAuthToken } from '../Types/api';
//import { decode } from "querystring";

const partnerApi = axios.create({
  baseURL: `${URL}/web`,
  headers: {},
});

partnerApi.interceptors.request.use((config: AxiosRequestConfig) => {
  let companyToken = localStorage.getItem('companyToken');
  let moderatorToken = localStorage.getItem('partner_access_token');
  config.headers.authorization = `Bearer ${companyToken}`;
  config.headers.langId = 1;
  config.headers.vers = VERSION;
  return config;
});

partnerApi.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  async (err: any) => {
    const originalRequest = err.config;
    let companyToken = localStorage.getItem('companyToken');
    let moderatorToken = localStorage.getItem('partner_access_token');
    let refreshToken = localStorage.getItem('partner_refresh_token');

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
          localStorage.setItem('partner_access_token', data.data.accessToken);
        }
      } catch (error: any) {
        if (
          error.response.data.error?.errId === 8 ||
          error.response.data.error?.errId === 7
        ) {
          localStorage.clear();
          window.location.pathname = '/';
        }
      }
      //return adminInterceptor(originalRequest);

      if (decoded) {
        let moderatorUpdatedToken = localStorage.getItem(
          'partner_access_token'
        );
        const response2 = await axios({
          method: 'PUT',
          url: `${URL}/auth/update-token`,
          headers: {
            langId: 1,
            authorization: 'Bearer ' + moderatorToken,
            vers: VERSION,
          },

          data: {
            companyId: decoded?.companyId,
            companyType: decoded?.companyType,
          },
        });
        localStorage.setItem('companyToken', response2.data.data.accessToken);
      }
      partnerApi(originalRequest);
    }
    return Promise.reject(err);
  }
);
export default partnerApi;

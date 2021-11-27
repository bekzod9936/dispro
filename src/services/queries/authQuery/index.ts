import axios from "axios";
import { URL } from "services/constants/config";
import authApi from "services/interceptors/auth_interceptor";

const apiMod = axios.create({
  baseURL: URL,
  headers: {
    langid: 1,
    vers: "1.0.405",
  },
});

export const setFcm = async (data: any) => {
  const response = await authApi.put(`/auth/set/fcm`, data);
  return response;
};

export const loginModerator = async (data: any) => {
  const response = await apiMod.post(`${URL}/auth/admin/login`, data);
  return response;
};

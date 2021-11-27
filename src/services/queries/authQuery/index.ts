import axios from "axios";
import { URL } from "services/constants/config";
import authApi from "services/interceptors/auth_interceptor";

export const setFcm = async (data: any) => {
  const response = await authApi.put(`/auth/set/fcm`, data);
  return response;
};

export const loginModerator = async (data: any) => {
  const response = await axios.put(`${URL}/auth/admin/login`, data);
  return response;
};

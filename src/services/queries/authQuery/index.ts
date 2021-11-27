import authApi from "services/interceptors/auth_interceptor";

export const setFcm = (data: any) => {
  const response = authApi.put(`/auth/set/fcm`, data);
  return response;
};

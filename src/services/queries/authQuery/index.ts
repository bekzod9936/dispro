import authApi from "services/interceptors/authInterceptor";

export const setFcm = (data: any) => {
  const response = authApi.put(`/auth/set/fcm`, data);
  return response;
};

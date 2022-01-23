import axios from "axios";
import { ICoupon } from "pages/CompanyPages/proposals/screens/Coupons";
import partnerApi from "services/interceptors/partner_interceptor";
import { IDeferred } from "services/redux/Slices/proposals/types";

export const uploadImg = async (data: any) => {
  const response = await axios.post(
    "https://storage.uat.dis-count.app/coupon/upload",
    data
  );
  return response;
};

export const fetchCoupons = async (query: string, situation: number) => {
  if (query) {
    const response = await partnerApi(
      `/bonus/coupons/by/situation/${situation}/new?key=${query}`
    );
    return response;
  } else {
    const response = await partnerApi(
      `/bonus/coupons/by/situation/${situation}/new`
    );
    return response;
  }
};

export const postCoupon = async (data: any) => {
  const response = await partnerApi.post("/bonus/coupons/new", data);
  return response;
};

export const putCoupon = async (id: number, data: any) => {
  const response = await partnerApi.put(
    `/bonus/coupons/${id}/publish/new`,
    data
  );
};

export const updateCoupon = async (id: number, data: IDeferred) => {
  const response = await partnerApi.put(`/bonus/coupons/${id}/new`, data);
  return response;
};

export const deleteCoupon = async (id: number) => {
  await partnerApi.delete("/bonus/coupons", {
    data: {
      ids: [id],
    },
  });
};

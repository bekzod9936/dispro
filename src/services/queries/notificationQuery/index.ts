import partnerApi from "../../interceptors/partner_interceptor";

interface Props {
  page: number;
  perPage: number;
}

export const fetchNotifactions = ({ page, perPage }: Props) => {
  const response = partnerApi.get(
    `/directory/announcements/for/partner?perPage=${perPage}&page=${page}`
  );
  return response;
};

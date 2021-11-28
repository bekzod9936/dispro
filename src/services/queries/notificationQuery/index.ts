import partnerApi from "../../interceptors/partner_interceptor";

interface Props {
  url: any;
}

export const fetchNotifactions = ({ url }: Props) => {
  const response = partnerApi.get(
    `/directory/announcements/for/partner?${url}`
  );
  return response;
};

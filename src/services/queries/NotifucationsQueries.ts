import partnerApi from '../interceptors/companyInterceptor';

interface Props {
  url: any;
}

export const fetchNotifactions = ({ url }: Props) => {
  const response = partnerApi.get(
    `/directory/announcements/for/partner?${url}`
  );
  return response;
};

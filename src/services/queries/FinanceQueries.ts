import partnerApi from '../interceptors/companyInterceptor';
interface Props {
  url: string;
}
export const fetchFinanceSuggestion = async ({ url }: Props) => {
  const response = partnerApi.get(
    `banking/accounts/company/coupon/history?${url}`
  );
  return response;
};

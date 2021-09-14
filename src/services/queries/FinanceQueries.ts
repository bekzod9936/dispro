import partnerApi from '../interceptors/companyInterceptor';
interface Props {
  id: any;
  page: number;
  perPage: number;
}
export const fetchFinanceSuggestion = async ({ id, page, perPage }: Props) => {
  const response = partnerApi.get(
    `banking/accounts/company/coupon/history?page=${page}&perPage=${perPage}&companyId=${id}`
  );
  return response;
};

// https://api.vades.uz/v1/web/banking/accounts/company/coupon/history?page=1&perPage=10&companyId=18

import partnerApi from '../interceptors/companyInterceptor';
interface Props {
  url: string;
}
export const fetchFinanceSuggestion = ({ url }: Props) => {
  const response = partnerApi.get(
    `banking/accounts/company/coupon/history?${url}`
  );
  return response;
};

export const fetchFinancePayment = ({ url }: Props) => {
  const response = partnerApi.get(
    `banking/accounts/company/pay-go/history?${url}`
  );
  return response;
};

export const fetchFinanceHistory = ({ url }: Props) => {
  const response = partnerApi.get(`core/staffs/get/cashier-histories?${url}`);
  return response;
};

export const fetchFinanceCashBack = ({ url }: Props) => {
  const response = partnerApi.get(
    `/banking/accounts/company/cashback/history/out?${url}`
  );
  return response;
};

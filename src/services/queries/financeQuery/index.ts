import partnerApi from '../../interceptors/partner_interceptor';
interface Props {
  url: string;
  accountId?: any;
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

interface ExProps {
  startDate?: string;
  endDate?: string;
}

export const fetchFinanceHistoryExcel = ({ startDate, endDate }: ExProps) => {
  const response = partnerApi.get(
    `core/staffs/get/cashier-histories?startDate=${startDate}&endDate=${endDate}`
  );
  return response;
};

export const fetchFinanceCashBack = ({ url, accountId }: Props) => {
  const response = partnerApi.get(
    `/banking/accounts/company/cashback/history/new?accountId=${accountId}&${url}`
  );
  return response;
};

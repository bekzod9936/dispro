import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchFinanceSuggestion } from 'services/queries/FinanceQueries';

interface Props {
  amount: number;
  amountPartner: number;
  closed: boolean;
  couponName: string;
  couponType: number;
  disCommission: number;
  finished: boolean;
  firstName: string;
  id: number;
  lastName: string;
  payDate: string;
  payType: number;
}

interface PProps {
  page?: number;
}

const useSuggestion = ({ page = 1 }: PProps) => {
  const [data, setData] = useState<Props[]>([
    {
      amount: 0,
      amountPartner: 0,
      closed: false,
      couponName: '',
      couponType: 0,
      disCommission: 0,
      finished: false,
      firstName: '',
      id: 0,
      lastName: '',
      payDate: '',
      payType: 0,
    },
  ]);
  let companyId = localStorage.getItem('companyId');

  const response = useQuery(
    ['fetchSuggestionInfo', page],
    () => fetchFinanceSuggestion({ id: companyId, page: page, perPage: 10 }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => setData(data.data.data.history),
    }
  );

  return { response, data };
};

export default useSuggestion;

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

interface FProps {
  total: number;
  page: number;
  perPage: number;
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
  const [totalCount, setTotalCount] = useState<number>(0);

  let companyId = localStorage.getItem('companyId');

  function format({ total, page, perPage }: FProps) {
    let start = 1;
    let end = 1;
    if (page === 1) {
      start = 1;
      end = perPage;
    } else {
      start = (page - 1) * perPage + 1;
      end = page * perPage;
    }

    let info = `${start}-${end}`;
    return info;
  }

  const perPage = 5;
  const [between, setBetween] = useState<string>('');
  const response = useQuery(
    ['fetchSuggestionInfo', page],
    () =>
      fetchFinanceSuggestion({
        id: companyId,
        page: page,
        perPage: perPage,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        console.log(data);
        setData(data.data.data.history);
        setTotalCount(Math.ceil(data.data.data.totalCount / perPage));
        setBetween(
          format({
            total: data.data.data.totalCount,
            page: page,
            perPage: perPage,
          })
        );
      },
    }
  );

  return { response, data, totalCount, between };
};

export default useSuggestion;

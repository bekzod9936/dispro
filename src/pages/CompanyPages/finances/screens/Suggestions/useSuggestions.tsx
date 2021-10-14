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
  filterValues: any;
}

interface FProps {
  total: number;
  page: number;
  perPage: number;
}

const useSuggestion = ({ filterValues }: PProps) => {
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

  function format({ page, perPage }: FProps) {
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

  const [between, setBetween] = useState<string>('');
  const response = useQuery(
    ['fetchSuggestionInfo', filterValues],
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => `${v}=${filterValues[v]}&`)
        .join('');
      return fetchFinanceSuggestion({
        url: url,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        setData(data.data.data.history);

        setTotalCount(
          Math.ceil(data.data.data.totalCount / filterValues?.perPage)
        );
        setBetween(
          format({
            total: data.data.data.totalCount,
            page: filterValues?.page,
            perPage: filterValues?.perPage,
          })
        );
      },
    }
  );

  return { response, data, totalCount, between };
};

export default useSuggestion;

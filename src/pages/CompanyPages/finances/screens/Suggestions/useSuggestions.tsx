import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchFinanceSuggestion } from 'services/queries/FinanceQueries';
import { formatPagination } from 'services/utils/formatPagination';

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
          formatPagination({
            page: filterValues?.page,
            perPage: filterValues?.perPage,
            total: data.data.data.totalCount,
          })
        );
      },
    }
  );

  return { response, data, totalCount, between };
};

export default useSuggestion;

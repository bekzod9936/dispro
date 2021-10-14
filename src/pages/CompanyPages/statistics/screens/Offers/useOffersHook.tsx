import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCilentsData } from 'services/queries/StatisticsQueries';

interface Props {
  filterValues?: any;
}

const useOffersHook = ({ filterValues }: Props) => {
  const [data, setData] = useState([
    {
      activeCount: '',
      expireCount: '',
      payedCount: '',
      type: '',
      usedCount: '',
    },
  ]);

  const response = useQuery(
    'fetchOffersInfo',
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => `${v}=${filterValues[v]}&`)
        .join('');
      return fetchCilentsData({ section: `coupons/new?${url}` });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data: any) => {
        setData(data.data.data);
      },
    }
  );

  return { response, data };
};

export default useOffersHook;

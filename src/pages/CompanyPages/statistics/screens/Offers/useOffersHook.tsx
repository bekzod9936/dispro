import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCilentsData } from 'services/queries/StatisticsQueries';

const useOffersHook = () => {
  const [data, setData] = useState([
    {
      activeCount: '',
      expireCount: '',
      payedCount: '',
      usedCount: '',
    },
  ]);

  const response = useQuery(
    'fetchOffersInfo',
    () => fetchCilentsData({ section: 'coupons' }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data: any) => console.log(data.data.data),
    }
  );

  return { response, data };
};

export default useOffersHook;

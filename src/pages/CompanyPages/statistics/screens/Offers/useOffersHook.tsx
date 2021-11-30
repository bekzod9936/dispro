import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCilentsData } from 'services/queries/statisticsQuery';
import { useAppDispatch } from 'services/redux/hooks';
import { setOffers } from 'services/redux/Slices/statistics/statistics';

const useOffersHook = () => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState({ startDate: '', endDate: '' });

  const response = useQuery(
    'fetchOffersInfo',
    () => {
      const url = `&startDate=${date.startDate}&endDate=${date.endDate}`;
      return fetchCilentsData({ section: `coupons/new?${url}` });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data: any) => {
        dispatch(setOffers(data.data.data));
      },
    }
  );

  return { response, date, setDate };
};

export default useOffersHook;

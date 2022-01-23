import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCilentsData } from 'services/queries/statisticsQuery';
import { useAppDispatch } from 'services/redux/hooks';
import { setTraffic } from 'services/redux/Slices/statistics/statistics';

const useTrafficsHook = () => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState({ startDate: '', endDate: '' });

  const response = useQuery(
    'fetchTrafficsInfo',
    () => {
      const url = `&startDate=${date.startDate}&endDate=${date.endDate}`;
      return fetchCilentsData({ section: `traffic?${url}` });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data: any) => {
        dispatch(setTraffic(data?.data?.data?.refStats));
      },
    }
  );

  return { response, setDate, date };
};

export default useTrafficsHook;

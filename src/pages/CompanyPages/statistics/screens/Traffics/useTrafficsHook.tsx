import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCilentsData } from 'services/queries/StatisticsQueries';

const useTrafficsHook = () => {
  const [data, setData] = useState([
    {
      source: '',
      clientCount: '',
      clientPayedCount: '',
      chequeCount: '',
      receipts: '',
    },
  ]);

  const response = useQuery(
    'fetchTrafficsInfo',
    () => fetchCilentsData({ section: 'traffic' }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data: any) => setData(data?.data?.data?.refStats),
    }
  );

  return { response, data };
};

export default useTrafficsHook;
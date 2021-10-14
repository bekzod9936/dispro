import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCilentsData } from 'services/queries/StatisticsQueries';

interface Props {
  filterValues?: any;
}

const useTrafficsHook = ({ filterValues }: Props) => {
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
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => `${v}=${filterValues[v]}&`)
        .join('');
      return fetchCilentsData({ section: `traffic?${url}` });
    },
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

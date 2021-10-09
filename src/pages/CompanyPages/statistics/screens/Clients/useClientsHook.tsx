import { useQuery } from 'react-query';
import { fetchCilentsData } from 'services/queries/StatisticsQueries';

interface Props {
  filterValues?: any;
}

const useClientsHook = ({ filterValues }: Props) => {
  const response = useQuery(
    'fetchClientsInfo',
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => `${v}=${filterValues[v]}&`)
        .join('');
      return fetchCilentsData({ section: `clients?${url}` });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  const data = response?.data?.data?.data;
  return { response, data };
};

export default useClientsHook;

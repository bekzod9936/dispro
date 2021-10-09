import { useQuery } from 'react-query';
import { fetchCilentsData } from 'services/queries/StatisticsQueries';

const useClientsHook = () => {
  const response = useQuery(
    'fetchClientsInfo',
    () => fetchCilentsData({ section: 'clients' }),
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

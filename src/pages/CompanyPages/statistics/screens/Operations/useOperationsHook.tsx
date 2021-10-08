import { useQuery } from 'react-query';
import { fetchCilentsData } from 'services/queries/StatisticsQueries';

const useOperationsHook = () => {
  const response = useQuery(
    'fetchOperationsInfo',
    () => fetchCilentsData({ section: 'operations' }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );
  const data = response?.data?.data?.data;
  return { response, data };
};

export default useOperationsHook;

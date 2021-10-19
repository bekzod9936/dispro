import { useQuery } from 'react-query';
import { fetchCilentsData } from 'services/queries/StatisticsQueries';

interface Props {
  filterValues?: any;
}

const useOperationsHook = ({ filterValues }: Props) => {
  console.log(filterValues);
  const response = useQuery(
    'fetchOperationsInfo',
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => `${v}=${filterValues[v]}&`)
        .join('');
      return fetchCilentsData({ section: `operations?${url}` });
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

export default useOperationsHook;

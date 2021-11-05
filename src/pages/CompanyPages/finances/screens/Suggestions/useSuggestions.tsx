import { useQuery } from 'react-query';
import { fetchFinanceSuggestion } from 'services/queries/FinanceQueries';
import { useAppDispatch } from 'services/redux/hooks';
import {
  setSuggestionFinanceBetween,
  setSuggestionFinanceData,
  setSuggestionFinanceTotal,
} from 'services/redux/Slices/finance';
import { formatPagination } from 'services/utils/formatPagination';

interface PProps {
  filterValues: any;
}

const useSuggestion = ({ filterValues }: PProps) => {
  const dispatch = useAppDispatch();

  const response = useQuery(
    ['fetchSuggestionInfo', filterValues],
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => `${v}=${filterValues[v]}&`)
        .join('');
      return fetchFinanceSuggestion({
        url: url,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        dispatch(setSuggestionFinanceData(data.data.data.history));
        dispatch(
          setSuggestionFinanceTotal(
            Math.ceil(data.data.data.totalCount / filterValues?.perPage)
          )
        );
        dispatch(
          setSuggestionFinanceBetween(
            formatPagination({
              page: filterValues?.page,
              perPage: filterValues?.perPage,
              total: data.data.data.totalCount,
            })
          )
        );
      },
    }
  );

  return { response };
};

export default useSuggestion;

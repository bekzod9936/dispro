import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchNotifactions } from 'services/queries/NotifucationsQueries';
import { formatPagination } from 'services/utils/formatPagination';

interface Props {
  body?: string;
  createdAt?: string;
  id?: number;
  image?: string;
  isSend?: boolean;
  title?: string;
}

interface PProps {
  filterValues: any;
}

const useNotefications = ({ filterValues }: PProps) => {
  const [data, setData] = useState<Props[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [between, setBetween] = useState<string>('');
  const response = useQuery(
    ['fetchSuggestionInfo', filterValues],
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => `${v}=${filterValues[v]}&`)
        .join('');
      return fetchNotifactions({
        url: url,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        setData(data.data.data.announcements);
        setTotalCount(
          Math.ceil(data.data.data.totalCount / filterValues?.perPage)
        );
        setBetween(
          formatPagination({
            page: filterValues?.page,
            perPage: filterValues?.perPage,
            total: data.data.data.totalCount,
          })
        );
      },
    }
  );

  return { response, data, totalCount, between };
};

export default useNotefications;

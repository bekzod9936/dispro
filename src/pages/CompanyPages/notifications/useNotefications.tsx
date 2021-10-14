import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchNotifactions } from 'services/queries/NotifucationsQueries';

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

interface FProps {
  page: number;
  perPage: number;
}

const useNotefications = ({ filterValues }: PProps) => {
  const [data, setData] = useState<Props[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  function format({ page, perPage }: FProps) {
    let start = 1;
    let end = 1;
    if (page === 1) {
      start = 1;
      end = perPage;
    } else {
      start = (page - 1) * perPage + 1;
      end = page * perPage;
    }

    let info = `${start}-${end}`;
    return info;
  }

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
          format({
            page: filterValues?.page,
            perPage: filterValues?.perPage,
          })
        );
      },
    }
  );

  return { response, data, totalCount, between };
};

export default useNotefications;

import { useQuery } from 'react-query';
import { useAppDispatch } from 'services/redux/hooks';
import {
  fetchFeedBackClients,
  fetchFeedBackCashiers,
  fetchClientsRatings,
} from 'services/queries/feedbackQuery';
import {
  setAverageRatingFeedBack,
  setFiterFeedBack,
  setClientsFeedBack,
  setRatingsFeedBack,
  setTotalCountFeedBack,
} from 'services/redux/Slices/feedback';
import { useState } from 'react';
import { formatPagination } from 'services/utils/formatPagination';

interface Props {
  filterValues?: any;
  key?: any;
}

const useFeedBack = ({ filterValues, key }: Props) => {
  const dispatch = useAppDispatch();
  const [between, setBetween] = useState<string>('');
  const [totalCount, setTotalCount] = useState<number>(0);

  const resCashiers = useQuery('feedBackCashiers', fetchFeedBackCashiers, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      dispatch(setFiterFeedBack(data.data.data));
    },
  });

  const resClients = useQuery(
    ['feedBackClientsInfo', key, filterValues],
    () => {
      const url = Object.keys(filterValues)
        .map((v: any) => {
          if (filterValues[v] !== '' && filterValues[v] !== undefined) {
            return `${v}=${filterValues[v]}&`;
          } else {
            return '';
          }
        })
        .join('');

      const key1 = key !== '' && key !== undefined ? `&key=${key}` : '';
      return fetchFeedBackClients({
        url: `/rating-review?${url}${key1}`,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        dispatch(setTotalCountFeedBack(data.data.data.totalCount));
        dispatch(setClientsFeedBack(data.data.data.ratingAndReviews));
        setTotalCount(data.data.data.totalCount);
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

  const resRatings = useQuery('feedBackClientsRatings', fetchClientsRatings, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      dispatch(setRatingsFeedBack(data.data.data.ratingNumbers));
      dispatch(setAverageRatingFeedBack(data.data.data.rating));
    },
  });

  return { resClients, resCashiers, resRatings, between, totalCount };
};

export default useFeedBack;

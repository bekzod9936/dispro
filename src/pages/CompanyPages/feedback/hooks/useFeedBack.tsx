import { useQuery } from 'react-query';
import { useAppDispatch } from 'services/redux/hooks';
import {
  fetchFeedBackClients,
  fetchFeedBackCashiers,
  fetchClientsRatings,
} from 'services/queries/FeedBack';
import {
  setAverageRatingFeedBack,
  setCashiersFeedBack,
  setClientsFeedBack,
  setRatingsFeedBack,
  setTotalCountFeedBack,
  setTotalRatingFeedBack,
} from 'services/redux/Slices/feedback';
import { useState } from 'react';
import { formatPagination } from 'services/utils/formatPagination';

interface Props {
  filterValues?: any;
}

const useFeedBack = ({ filterValues }: Props) => {
  const dispatch = useAppDispatch();
  const [between, setBetween] = useState<string>('');
  const [totalCount, setTotalCount] = useState<number>(0);

  const resCashiers = useQuery('feedBackCashiers', fetchFeedBackCashiers, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      dispatch(setCashiersFeedBack(data.data.data));
    },
  });

  const resClients = useQuery(
    'feedBackClientsInfo',
    () =>
      fetchFeedBackClients({
        url: `/rating-review/${filterValues.cashierStaffId}?perPage=${filterValues.perPage}&page=${filterValues?.page}`,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        dispatch(setTotalCountFeedBack(data.data.data.totalCount));
        dispatch(
          setClientsFeedBack(
            filterValues?.cashierStaffId !== ''
              ? data.data.data
              : data.data.data.ratingAndReviews
          )
        );
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

  const resRatings = useQuery('feedBackClientsRatings', fetchClientsRatings, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      dispatch(setRatingsFeedBack(data.data.data.ratings));
      dispatch(setAverageRatingFeedBack(data.data.data.averageRating));
      dispatch(setTotalRatingFeedBack(data.data.data.totalRating));
    },
  });

  return { resClients, resCashiers, resRatings, between, totalCount };
};

export default useFeedBack;

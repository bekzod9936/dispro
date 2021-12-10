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
      dispatch(setFiterFeedBack(data.data.data));
    },
  });

  const resClients = useQuery(
    'feedBackClientsInfo',
    () => {
      const rating: any =
        filterValues.rating !== '' && filterValues.rating !== undefined
          ? `&rating=${filterValues.rating}`
          : '';
      const cash: any =
        filterValues.cashierStaffId !== '' &&
        filterValues.cashierStaffId !== undefined
          ? `&cashierId=${filterValues.cashierStaffId}`
          : '';
      return fetchFeedBackClients({
        url: `/rating-review?perPage=${filterValues.perPage}&page=${filterValues?.page}${rating}${cash}`,
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

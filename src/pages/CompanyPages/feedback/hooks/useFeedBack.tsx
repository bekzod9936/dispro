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

interface Props {
  page?: number;
  filterValues?: any;
}

const perPage = 6;

const useFeedBack = ({ page, filterValues }: Props) => {
  const dispatch = useAppDispatch();

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
        url: `/rating-review/${filterValues}?perPage=${perPage}&page=${page}`,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        dispatch(setTotalCountFeedBack(data.data.data.totalCount));
        dispatch(
          setClientsFeedBack(
            filterValues !== ''
              ? data.data.data
              : data.data.data.ratingAndReviews
          )
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

  return { resClients, resCashiers, resRatings };
};

export default useFeedBack;

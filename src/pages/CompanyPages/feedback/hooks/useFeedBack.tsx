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
}

const perPage = 6;

const useFeedBack = ({ page }: Props) => {
  const dispatch = useAppDispatch();

  const resCashiers = useQuery('feedBackCashiers', fetchFeedBackCashiers, {
    onSuccess: (data) => {
      dispatch(setCashiersFeedBack(data.data.data));
    },
  });

  const resClients = useQuery(
    'feedBackClientsInfo',
    () =>
      fetchFeedBackClients({
        url: `/rating-review/?perPage=${perPage}&page=${page}`,
      }),
    {
      onSuccess: (data) => {
        dispatch(setTotalCountFeedBack(data.data.data.totalCount));
        dispatch(setClientsFeedBack(data.data.data.ratingAndReviews));
      },
    }
  );

  const resRatings = useQuery('feedBackClientsRatings', fetchClientsRatings, {
    onSuccess: (data) => {
      dispatch(setRatingsFeedBack(data.data.data.ratings));
      dispatch(setAverageRatingFeedBack(data.data.data.averageRating));
      dispatch(setTotalRatingFeedBack(data.data.data.totalRating));
    },
  });

  return { resClients, resCashiers, resRatings };
};

export default useFeedBack;

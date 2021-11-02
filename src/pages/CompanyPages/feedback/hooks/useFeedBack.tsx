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

interface Props {
  filterValues?: any;
}

interface FProps {
  page: number;
  perPage: number;
}

const useFeedBack = ({ filterValues }: Props) => {
  const dispatch = useAppDispatch();
  const [between, setBetween] = useState<string>('');
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
        console.log(data);
        setBetween(
          format({
            page: filterValues?.page,
            perPage: filterValues?.perPage,
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

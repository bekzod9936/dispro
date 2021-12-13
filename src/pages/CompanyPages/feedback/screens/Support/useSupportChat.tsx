import { useState } from 'react';
import { useQuery } from 'react-query';
import { USER_TYPES } from 'services/constants/chat';
import { fetchChatSupportHistory } from 'services/queries/feedbackQuery';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
  setChatSupportHistory,
  setTotalSupportHistory,
} from 'services/redux/Slices/feedback';

const useSupportChat = () => {
  const [data, setData] = useState<any>([]);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [noValue, setNoValue] = useState(false);
  const totalHistory: any = useAppSelector(
    (state) => state.feedbackPost.totalSupportHistory
  );

  const histories: any = useAppSelector(
    (state) => state.feedbackPost.supporthistories
  );

  const fetchData = (page: any) => {
    return fetchChatSupportHistory({
      url: `withUserType=${USER_TYPES.WORKER}&withId=1&page=${page}&perPage=22`,
    });
  };

  const resChatSupportHistory = useQuery(
    ['getChatSupportHistory', page],
    () => {
      return fetchData(page);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        if (data.data.data.totalCount === 0) {
          setNoValue(true);
        } else {
          setNoValue(false);
        }
        if (data?.data?.data?.histories.length === 0) {
          dispatch(
            setTotalSupportHistory({
              ...totalHistory,
              total: data?.data?.data?.totalCount,
              loading: false,
              hasMore: false,
            })
          );
        } else {
          const arr = [...histories, ...data?.data?.data?.histories];
          dispatch(setChatSupportHistory(arr));
          setData(arr);
          dispatch(
            setTotalSupportHistory({
              ...totalHistory,
              total: data?.data?.data?.totalCount,
              loading: false,
              hasMore: true,
            })
          );
        }
      },
    }
  );

  return { resChatSupportHistory, setPage, page, data, noValue };
};

export default useSupportChat;

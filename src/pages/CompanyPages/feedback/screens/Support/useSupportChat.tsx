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
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
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
        const arr = [...histories, ...data?.data?.data?.histories];
        dispatch(setChatSupportHistory(arr));

        dispatch(
          setTotalSupportHistory({
            ...totalHistory,
            total: data?.data?.data?.totalCount,
            loading: false,
          })
        );
      },
    }
  );

  return { resChatSupportHistory, setPage , page};
};

export default useSupportChat;

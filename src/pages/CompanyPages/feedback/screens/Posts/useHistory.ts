import { useState } from 'react';
import { useQuery } from 'react-query';
import { USER_TYPES } from 'services/constants/chat';
import { fetchChatClientHistory } from 'services/queries/feedbackQuery';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
  setChatClientHistory,
  setTotalHistory,
} from 'services/redux/Slices/feedback';

const useHistory = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const chosen = useAppSelector(
    (state) => state.feedbackPost.chosenListUser?.chosen
  );
  const histories: any = useAppSelector(
    (state) => state.feedbackPost.histories
  );
  const totalData: any = useAppSelector(
    (state) => state.feedbackPost.totalHistory
  );
  const fetchHistory = (nextpage: any) => {
    return fetchChatClientHistory({
      url: `withUserType=${USER_TYPES.CUSTOMER}&withId=${chosen?.id}&page=${nextpage}&perPage=5`,
    });
  };

  const resChatClientHistory = useQuery(
    ['getClientChatHistory', page],
    () => {
      return fetchHistory(page);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: false,
      onSuccess: (data) => {
        dispatch(
          setChatClientHistory([...histories, ...data.data.data.histories])
        );
        dispatch(
          setTotalHistory({
            ...totalData,
            total: data.data.data.totalCount,
            loading: false,
          })
        );
      },
    }
  );

  return { resChatClientHistory, page, setPage };
};

export default useHistory;

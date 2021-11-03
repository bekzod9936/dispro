import { useQuery } from 'react-query';
import { USER_TYPES } from 'services/constants/chat';
import {
  fetchChatClients,
  fetchChatClientHistory,
} from 'services/queries/FeedBack';
import { useAppDispatch } from 'services/redux/hooks';
import {
  setChatClientHistory,
  setMessagesFeedBack,
  setTotalHistory,
} from 'services/redux/Slices/feedback';

interface Props {
  chosen?: any;
}

const useChatClients = ({ chosen }: Props) => {
  const dispatch = useAppDispatch();

  const resChatClients = useQuery('getClientsChat', fetchChatClients, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      dispatch(setMessagesFeedBack(data.data.data));
      console.log(data.data.data);
    },
  });

  const resChatClientHistory = useQuery(
    'getClientChatHistory',
    () => {
      return fetchChatClientHistory({
        url: `withUserType=${USER_TYPES.CUSTOMER}&withId=${chosen?.id}&page=1&perPage=22`,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: false,
      onSuccess: (data) => {
        dispatch(setChatClientHistory(data.data.data.histories));
        dispatch(setTotalHistory(data.data.data.totalCount));
      },
    }
  );

  return { resChatClients, resChatClientHistory };
};

export default useChatClients;

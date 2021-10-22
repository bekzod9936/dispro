import { useQuery } from 'react-query';
import {
  fetchChatClients,
  fetchChatClientHistory,
} from 'services/queries/FeedBack';
import { useAppDispatch } from 'services/redux/hooks';
import { setMessagesFeedBack } from 'services/redux/Slices/feedback';

const useChatClients = () => {
  const dispatch = useAppDispatch();

  const resChatClients = useQuery('getClientsChat', fetchChatClients, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      dispatch(setMessagesFeedBack(data.data.data));
    },
  });

  const resChatClientHistory = useQuery(
    'getClientChatHistory',
    () => {
      return fetchChatClientHistory({ url: '' });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        console.log(data, 'his');
      },
    }
  );

  return { resChatClients, resChatClientHistory };
};

export default useChatClients;

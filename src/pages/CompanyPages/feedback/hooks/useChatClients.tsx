import { useMutation, useQuery } from 'react-query';
import { USER_TYPES } from 'services/constants/chat';
import {
  fetchChatClients,
  fetchChatClientHistory,
  deleteChat,
} from 'services/queries/feedbackQuery';
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

  const deleteRes = useMutation((data) => {
    return deleteChat({ data });
  });

  return { resChatClients, resChatClientHistory, deleteRes };
};

export default useChatClients;

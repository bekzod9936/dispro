import { useQuery } from 'react-query';
import { USER_TYPES } from 'services/constants/chat';
import { fetchChatSupportHistory } from 'services/queries/FeedBack';
import { useAppDispatch } from 'services/redux/hooks';
import {
  setChatSupportHistory,
  setTotalSupportHistory,
} from 'services/redux/Slices/feedback';

const useSupportChat = () => {
  const dispatch = useAppDispatch();

  const resChatSupportHistory = useQuery(
    'getChatSupportHistory',
    () => {
      return fetchChatSupportHistory({
        url: `withUserType=${USER_TYPES.WORKER}&withId=1&page=1&perPage=22&companyId=0`,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        dispatch(setChatSupportHistory(data.data.data.histories));
        dispatch(setTotalSupportHistory(data.data.data.totalCount));
      },
    }
  );
  return { resChatSupportHistory };
};

export default useSupportChat;

import { useQuery } from "react-query";
import { USER_TYPES } from "services/constants/chat";
import { fetchChatSupportHistory } from "services/queries/feedbackQuery";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import {
  setChatSupportHistory,
  setTotalSupportHistory,
} from "services/redux/Slices/feedback";

const useSupportChat = () => {
  const dispatch = useAppDispatch();

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

  console.log(totalHistory.page, "page");

  const resChatSupportHistory = useQuery(
    "getChatSupportHistory",
    () => {
      return fetchData(totalHistory.page);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data: any) => {
        dispatch(
          setChatSupportHistory([...histories, ...data?.data?.data?.histories])
        );
        dispatch(
          setTotalSupportHistory({
            ...totalHistory,
            total: data?.data?.data?.totalCount,
            loading: false,
            page: totalHistory.page + 1,
          })
        );
      },
    }
  );

  return { resChatSupportHistory };
};

export default useSupportChat;

import { useQuery } from 'react-query';
import { fetchChatClients } from 'services/queries/feedbackQuery';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { setUsers } from 'services/redux/Slices/feedback';

const useUsers = () => {
  const dispatch = useAppDispatch();
  const users: any = useAppSelector((state) => state.feedbackPost.users);

  const resChatClients = useQuery('getClientsChat123', fetchChatClients, {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      const newUsers: any = data.data.data.map((v: any) => {
        const newArr = users.find((a: any) => a?.id === v?.id);
        if (newArr?.id !== undefined) {
          return { ...newArr, info: v };
        } else {
          return {
            id: v?.id,
            messages: [],
            total: 0,
            hasMore: true,
            page: 1,
            info: v,
          };
        }
      });
      dispatch(setUsers(newUsers));
    },
  });
  return { resChatClients };
};

export default useUsers;

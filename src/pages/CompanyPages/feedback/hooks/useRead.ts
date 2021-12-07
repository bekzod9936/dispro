import { useMutation } from 'react-query';
import { fetchReadChats } from 'services/queries/feedbackQuery';

const useRead = () => {
  const readChat = useMutation((data: any) => fetchReadChats({ data }));
  return { readChat };
};

export default useRead;

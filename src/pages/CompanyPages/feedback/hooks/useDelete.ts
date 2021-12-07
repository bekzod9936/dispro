import { useMutation } from 'react-query';
import { deleteChat } from 'services/queries/feedbackQuery';

const useDelete = () => {
  const deleteRes = useMutation((data) => {
    return deleteChat({ data });
  });
  return { deleteRes };
};

export default useDelete;

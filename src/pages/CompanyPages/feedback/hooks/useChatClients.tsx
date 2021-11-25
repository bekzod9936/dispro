import { useState, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import { USER_TYPES } from 'services/constants/chat';
import {
  fetchChatClients,
  fetchChatClientHistory,
  deleteChat,
} from 'services/queries/feedbackQuery';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
  setChatClientHistory,
  setMessagesFeedBack,
  setTotalHistory,
} from 'services/redux/Slices/feedback';

interface ChProps {
  date?: string;
  firstName?: string;
  id?: number;
  image?: string;
  isDeleted?: boolean;
  lastMsg?: string;
  lastName?: string;
  genderTypeId?: number;
  obtainProgramLoyalty?: { levelName?: string; percent?: number };
}

const useChatClients = () => {
  const dispatch = useAppDispatch();
  const messagesStartRef = useRef<HTMLDivElement>(null);

  const [chosen, setChosen] = useState<ChProps>({});
  const [isChoose, setIsChoose] = useState<boolean>(false);

  const scrollToTop = () => {
    messagesStartRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const handleChoose = async (v: ChProps) => {
    await setChosen(v);
    await setIsChoose(true);
    await resChatClientHistory.refetch();
    await scrollToTop();
  };

  const chosenClient = useAppSelector(
    (state) => state.feedbackPost.chosenClient
  );

  const resChatClients = useQuery('getClientsChat', fetchChatClients, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      if (chosenClient?.choose) {
        const newArr = data.data.data.filter((v: any) => {
          if (v.id === chosenClient?.data?.clientId) {
            return v;
          } else {
            return null;
          }
        });
        if (newArr.length === 0) {
          dispatch(
            setMessagesFeedBack([
              {
                date: '',
                firstName: chosenClient?.data?.clientFirstName,
                id: chosenClient?.data?.clientId,
                image: chosenClient?.data?.clientImage,
                isDeleted: false,
                lastMsg: '',
                lastName: chosenClient?.data?.clientLastName,
                genderTypeId: chosenClient?.data?.clientGenderTypeId,
                obtainProgramLoyalty: chosenClient?.data?.obtainProgramLoyalty,
              },
              ...data.data.data,
            ])
          );
          handleChoose({
            date: '',
            firstName: chosenClient?.data?.clientFirstName,
            id: chosenClient?.data?.clientId,
            image: chosenClient?.data?.clientImage,
            isDeleted: false,
            lastMsg: '',
            lastName: chosenClient?.data?.clientLastName,
            genderTypeId: chosenClient?.data?.clientGenderTypeId,
            obtainProgramLoyalty: chosenClient?.data?.obtainProgramLoyalty,
          });

          setIsChoose(chosenClient?.choose);
          scrollToTop();
        } else {
          dispatch(setMessagesFeedBack(data.data.data));
          setIsChoose(true);
          handleChoose(newArr[0]);
          scrollToTop();
        }
      } else {
        dispatch(setMessagesFeedBack(data.data.data));
      }
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

  return {
    resChatClients,
    resChatClientHistory,
    deleteRes,
    handleChoose,
    chosen,
    setChosen,
    isChoose,
    setIsChoose,
    scrollToTop,
    messagesStartRef,
  };
};

export default useChatClients;

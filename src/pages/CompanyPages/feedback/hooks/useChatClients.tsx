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

const inntialState = { page: 1, perPage: 5 };

const useChatClients = () => {
  const dispatch = useAppDispatch();
  const messagesStartRef = useRef<HTMLDivElement>(null);
  const histories = useAppSelector((state) => state.feedbackPost.histories);
  const [chosen, setChosen] = useState<ChProps>({});
  const [isChoose, setIsChoose] = useState<boolean>(false);
  const [inntialHistory, setInntialHistory] = useState(inntialState);

  const scrollToTop = () => {
    console.log('top');

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
      const withId = chosen?.id ? `&withId=${chosen?.id}` : '';
      return fetchChatClientHistory({
        url: `withUserType=${USER_TYPES.CUSTOMER}${withId}&page=${inntialHistory?.page}&perPage=${inntialHistory?.perPage}`,
      });
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: false,
      onSuccess: (data) => {
        const his: any = histories;
        dispatch(setChatClientHistory([...his, ...data.data.data.histories]));
        dispatch(setTotalHistory(data.data.data.totalCount));
        console.log(histories, data.data.data.histories);
      },
    }
  );

  const fetchHisFetchData = async () => {
    await setInntialHistory((prev) => {
      return { page: 2, perPage: inntialHistory.perPage };
    });

    await resChatClientHistory.refetch();
  };

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
    setInntialHistory,
    inntialHistory,
    fetchHisFetchData
  };
};

export default useChatClients;

import { useRef } from 'react';
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
  setChosenListUser,
  setMessagesFeedBack,
  setTotalHistory,
} from 'services/redux/Slices/feedback';

const useChatClients = () => {
  const dispatch = useAppDispatch();
  const messagesStartRef = useRef<HTMLDivElement>(null);

  const histories = useAppSelector((state) => state.feedbackPost.histories);
  const chosen = useAppSelector(
    (state) => state.feedbackPost.chosenListUser?.chosen
  );

  const choseListUser: any = useAppSelector(
    (state) => state.feedbackPost.chosenListUser
  );

  const scrollToTop = () => {
    messagesStartRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const handleChoose = async (v: any) => {
    await dispatch(
      setChosenListUser({
        ...choseListUser,
        chosen: v,
        isChoose: true,
        fetchHistory: true,
      })
    );
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
          dispatch(
            setChosenListUser({
              ...choseListUser,
              isChoose: chosenClient?.choose,
            })
          );

          scrollToTop();
        } else {
          dispatch(setMessagesFeedBack(data.data.data));
          dispatch(
            setChosenListUser({
              ...choseListUser,
              isChoose: true,
            })
          );
          handleChoose(newArr[0]);
          scrollToTop();
        }
      } else {
        dispatch(setMessagesFeedBack(data.data.data));
      }
      if (choseListUser?.fetchHistory) {
        resChatClientHistory.refetch();
      }
    },
  });

  const resChatClientHistory = useQuery(
    'getClientChatHistory',
    () => {
      const withId = chosen?.id ? `&withId=${chosen?.id}` : '';
      return fetchChatClientHistory({
        url: `withUserType=${USER_TYPES.CUSTOMER}${withId}&page=${choseListUser?.inntialHistory?.page}&perPage=${choseListUser?.inntialHistory?.perPage}`,
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
      },
    }
  );

  const fetchHisFetchData = async () => {
    await dispatch(
      setChosenListUser({
        ...choseListUser,
        inntialHistory: {
          ...choseListUser?.inntialHistory,
          page: choseListUser?.inntialHistory?.page + 1,
        },
      })
    );

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
    scrollToTop,
    messagesStartRef,
    fetchHisFetchData,
  };
};

export default useChatClients;

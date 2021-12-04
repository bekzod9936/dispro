import { useRef } from 'react';
import { useQuery } from 'react-query';
import { fetchChatClients } from 'services/queries/feedbackQuery';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import {
  setChosenListUser,
  setMessagesFeedBack,
  setTotalHistory,
} from 'services/redux/Slices/feedback';

const useChatClients = () => {
  const dispatch = useAppDispatch();
  const messagesStartRef = useRef<HTMLDivElement>(null);
  const choseListUser: any = useAppSelector(
    (state) => state.feedbackPost.chosenListUser
  );

  const handleChoose = (v: any) => {
    dispatch(
      setChosenListUser({
        ...choseListUser,
        chosen: v,
        isChoose: true,
        fetchHistory: true,
      })
    );
  };

  const totalData: any = useAppSelector(
    (state) => state.feedbackPost.totalHistory
  );

  const scrollToTop = () => {
    messagesStartRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
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
        const newData = {
          date: '',
          firstName: chosenClient?.data?.clientFirstName,
          id: chosenClient?.data?.clientId,
          image: chosenClient?.data?.clientImage,
          isDeleted: false,
          lastMsg: '',
          lastName: chosenClient?.data?.clientLastName,
          genderTypeId: chosenClient?.data?.clientGenderTypeId,
          obtainProgramLoyalty: chosenClient?.data?.obtainProgramLoyalty,
        };

        if (newArr.length === 0) {
          dispatch(setMessagesFeedBack([newData, ...data.data.data]));
          dispatch(setTotalHistory({ ...totalData, hasMore: false }));
          dispatch(
            setChosenListUser({
              ...choseListUser,
              isChoose: chosenClient?.choose,
              chosen: newData,
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
          dispatch(setTotalHistory({ ...totalData, hasMore: true }));
          dispatch(
            setChosenListUser({
              ...choseListUser,
              isChoose: chosenClient?.choose,
              chosen: newData,
            })
          );
          handleChoose(newArr[0]);
          scrollToTop();
        }
      } else {
        dispatch(setMessagesFeedBack(data.data.data));
      }
    },
  });

  return {
    resChatClients,
    handleChoose,
    scrollToTop,
    messagesStartRef,
  };
};

export default useChatClients;

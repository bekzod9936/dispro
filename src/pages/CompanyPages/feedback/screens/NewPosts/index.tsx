import Input from 'components/Custom/Input';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import ChatUser from '../../components/ChatUser';
import useUsers from './useUsers';
import defaultChat from 'assets/images/choosechat.png';
import Chat from './Chat';
import {
  Container,
  LeftSide,
  RightSide,
  SearchIcon,
  Header,
  Fetching,
  Loading,
  WrapChatUsers,
  NoResult,
  WrapImg,
  WrapChoose,
  Img,
} from './style';
import { SOCKET_EVENT } from 'services/constants/chat';
import { setChosenClientChat, setUsers } from 'services/redux/Slices/feedback';

const NewPosts = () => {
  const { t } = useTranslation();
  const [inpuSearch, setInpuSearch] = useState<string>('');
  const [searchRes, setSearchRes] = useState<any[]>([]);
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [review, setReview] = useState<any>({});
  const dispatch = useAppDispatch();

  const badge: any = useAppSelector(
    (state) => state.feedbackPost.badgeStorePost
  );

  const chosenReview: any = useAppSelector(
    (state) => state.feedbackPost.chosenClient
  );
  const users: any = useAppSelector((state) => state.feedbackPost.users);
  const socket = useAppSelector((state) => state.feedbackPost.socket);

  const { resChatClients } = useUsers();

  useEffect(() => {
    socket?.on(SOCKET_EVENT.CHAT_CLIENT_TO_PARTNER, function () {
      resChatClients.refetch();
    });
  }, [socket]);

  useEffect(() => {
    if (currentUser?.id !== undefined) {
      const newArr = users?.find((v: any) => v?.id === currentUser?.id);
      setCurrentUser(newArr);
    }
  }, [users]);

  useEffect(() => {
    if (users?.length > 0 && badge?.id !== undefined) {
      const newArr = users?.find((v: any) => v?.id === badge?.id);
      setCurrentUser(newArr);
    }
  }, [badge, users]);

  useEffect(() => {
    if (users?.length > 0 && chosenReview?.data?.clientId !== undefined) {
      const newArr = users?.find(
        (v: any) => v?.id === chosenReview?.data?.clientId
      );
      if (newArr?.id !== undefined) {
        setCurrentUser(newArr);
      } else {
        const newData = {
          date: '',
          firstName: chosenReview?.data?.clientFirstName,
          id: chosenReview?.data?.clientId,
          image: chosenReview?.data?.clientImage,
          isDeleted: false,
          lastMsg: '',
          lastName: chosenReview?.data?.clientLastName,
          genderTypeId: chosenReview?.data?.clientGenderTypeId,
          obtainProgramLoyalty: chosenReview?.data?.obtainProgramLoyalty,
        };
        const newUser = {
          id: chosenReview?.data?.clientId,
          messages: [],
          total: 0,
          hasMore: true,
          page: 1,
          info: newData,
        };

        setCurrentUser(newUser);
        dispatch(setUsers([newUser, ...users]));
      }
    }
  }, [chosenReview, users]);

  const handleSearch = (e: any) => {
    setInpuSearch(e.target.value);
    const searchResult: any = users?.filter((v: any) => {
      return (
        v.info.firstName
          .toLowerCase()
          .includes(e.target.value?.toLowerCase()) ||
        v.info.lastName.toLowerCase().includes(e.target.value?.toLowerCase())
      );
    });

    setSearchRes(searchResult);
  };

  const funRenderUsers = (list: any) => {
    return list?.map((v: any) => {
      return (
        <ChatUser
          key={v?.id}
          value={{
            onClick: () => {
              setCurrentUser(v);
              dispatch(setChosenClientChat({ data: {}, choose: false }));
            },
            isActive: v?.id === currentUser?.id,
            data: v?.info,
          }}
        />
      );
    });
  };

  return (
    <Container>
      <LeftSide>
        <Header>
          <Input
            fullWidth={true}
            inputStyle={{
              border: 'none',
              inpadding: '0  5px 0 20px',
              height: { desktop: 50, laptop: 45, planshet: 45, mobile: 40 },
            }}
            placeholder={t('searchthere')}
            IconEnd={<SearchIcon />}
            type='search'
            onChange={handleSearch}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => (inpuSearch === '' ? setSearchFocus(false) : null)}
            value={inpuSearch}
          />
          {resChatClients.isFetching && !resChatClients.isLoading ? (
            <Fetching>Loading....</Fetching>
          ) : null}
        </Header>
        {resChatClients.isLoading ? (
          <Loading style={{ display: 'flex', justifyContent: 'center' }}>
            Loading....
          </Loading>
        ) : (
          <WrapChatUsers>
            {!searchFocus || inpuSearch === '' ? (
              funRenderUsers(users)
            ) : searchRes?.length === 0 ? (
              <NoResult>{t('notfinduser')}</NoResult>
            ) : (
              funRenderUsers(searchRes)
            )}
          </WrapChatUsers>
        )}
      </LeftSide>
      <RightSide>
        {currentUser?.id !== undefined ? (
          <Chat value={currentUser} setCurrentUser={setCurrentUser} />
        ) : (
          <WrapImg>
            <Img src={defaultChat} alt='defphoto' />
            <WrapChoose>{t('choseChat')}</WrapChoose>
          </WrapImg>
        )}
      </RightSide>
    </Container>
  );
};

export default NewPosts;

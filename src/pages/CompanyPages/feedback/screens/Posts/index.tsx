//libaries
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useForm, Controller } from 'react-hook-form';
//hooks
import { ReactComponent as LeftBack } from 'assets/icons/FinanceIcons/leftback.svg';
import useChatClients from './useChatClients';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { ruCount } from '../../hooks/format';
import useLayout from 'components/Layout/useLayout';
import useRead from '../../hooks/useRead';
//assets
import defuserman from 'assets/icons/defuserman.png';
import defuserwoman from 'assets/icons/defuserwoman.png';
import App from 'assets/icons/StatistisPage/app.svg';
import defaultChat from 'assets/images/choosechat.png';
//components
import Dots from '../../components/Dots';
import Emoji from '../../components/Emoji';
import ChatUser from '../../components/ChatUser';
//custom
import Input from 'components/Custom/Input';
import Button from 'components/Custom/Button';
import { IconButton } from '@material-ui/core';
import ChatPlace from '../../components/ChatPlace';
import { CHAT_TYPES, SOCKET_EVENT } from 'services/constants/chat';
import {
  setChatClientHistory,
  setChosenListUser,
  setMessagesFeedBack,
  setTotalHistory,
} from 'services/redux/Slices/feedback';
import { TextareaAutosize } from '@material-ui/core';
//style
import {
  Container,
  Upside,
  Downside,
  Box1,
  Box2,
  Box3,
  Box4,
  SearchIcon,
  Fetching,
  Img,
  WrapImg,
  WrapChoose,
  WrapChatUsers,
  WrapUserInfo,
  UserName,
  WrapInfo,
  Form,
  Body,
  NoResult,
  Wranning,
  MobileContainer,
  MobileMessages,
  WrapModal,
  HeaderModal,
  BodyModal,
  FooterModal,
  WrapTextArea,
  WrapButtons,
} from './style';
import {
  Avatar,
  Status,
  InputDown,
  ScriptIcon,
  SmileIcon,
  SendIcon,
  InputWarn,
  WrapIcons,
  WrapScript,
} from '../../style';
import FullModal from 'components/Custom/FullModal';
import useDelete from '../../hooks/useDelete';

interface StateProps {
  chosenValues?: any;
  showEmoji?: boolean;
  loading?: boolean;
  limit: number;
}

interface FormProps {
  message?: string;
}

const Posts = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [state, setState] = useState<StateProps>({
    showEmoji: false,
    loading: false,
    chosenValues: {},
    limit: 400,
  });
  const companyId: any = localStorage.getItem('companyId');
  const [newMassage, setNewMassage] = useState<any>({});
  const [inpuSearch, setInpuSearch] = useState<string>('');
  const [searchRes, setSearchRes] = useState<any[]>([]);
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [users, setUsers] = useState<any>([]);
  const words = 400;
  const { width } = useWindowWidth();
  const histories: any = useAppSelector(
    (state) => state.feedbackPost.histories
  );
  const { resBadge } = useLayout({ id: companyId });
  const { readChat } = useRead();
  const staffId = useAppSelector((state) => state.auth.staffId);
  const badgeStore = useAppSelector(
    (state) => state.feedbackPost.badgeStorePost
  );
  const chosenClient = useAppSelector(
    (state) => state.feedbackPost.chosenClient
  );

  const socket = useAppSelector((state) => state.feedbackPost.socket);
  const { control, handleSubmit, setValue, getValues, watch } =
    useForm<FormProps>({
      mode: 'onBlur',
      shouldFocusError: true,
    });
  const values = getValues();

  const messages: any = useAppSelector((state) => state.feedbackPost.messages);
  const totalData: any = useAppSelector(
    (state) => state.feedbackPost.totalHistory
  );
  useEffect(() => {
    if (chosenClient?.choose) {
      const newArr = messages.filter((v: any) => {
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
        dispatch(setMessagesFeedBack([newData, ...messages]));
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
      }
      setState({ ...state, chosenValues: newData });
      dispatch(setChatClientHistory([]));
    }
  }, [chosenClient]);

  const { resChatClients, scrollToTop } = useChatClients();
  useEffect(() => {
    if (values?.message !== undefined) {
      setState({ ...state, limit: words - values?.message?.length });
    }
  }, [watch('message')]);

  const choseListUser: any = useAppSelector(
    (state) => state.feedbackPost.chosenListUser
  );

  useEffect(() => {
    if (badgeStore?.id !== state.chosenValues.id) {
      setState({ ...state, chosenValues: badgeStore });
      dispatch(setChatClientHistory([]));
    }
  }, [badgeStore]);

  useEffect(() => {
    setUsers(messages);
  }, [messages]);

  useEffect(() => {
    socket?.on(SOCKET_EVENT.CHAT_CLIENT_TO_PARTNER, function (message: any) {
      resChatClients.refetch();
      setNewMassage({
        chatType: message.chatType,
        companyId: message.companyId,
        createdAt: Date.now(),
        fromId: message.fromId,
        id: message.id,
        msg: message.data.message,
        status: message.status,
        toId: message.toId,
      });
    });
  }, [socket]);

  useEffect(() => {
    if (state.chosenValues.id !== undefined) {
      dispatch(setChatClientHistory([newMassage, ...histories]));
      if (CHAT_TYPES.CLIENT_TO_PARTNER === newMassage.chatType) {
        resBadge.refetch();
        readChat.mutate([newMassage?.id]);
      }
    }
  }, [newMassage]);

  const handleSearch = (e: any) => {
    setInpuSearch(e.target.value);
    const searchResult: any = messages?.filter((v: any) => {
      return (
        v.firstName.toLowerCase().includes(e.target.value?.toLowerCase()) ||
        v.lastName.toLowerCase().includes(e.target.value?.toLowerCase())
      );
    });

    setSearchRes(searchResult);
  };

  const limitwords = (
    <>
      {t('limitfeedback')}

      {` ${state.limit} ${ruCount({
        count: state.limit,
        firstWord: 'символ',
        secondWord: 'символа',
        thirdWord: 'символов',
      })}`}
    </>
  );

  const onSubmit = (e: any) => {
    setState({ ...state, loading: true });
    if (e.message.length > 0) {
      socket.emit(
        'chat_to_server',
        {
          langId: 1,
          chatType: 2,
          toId: state.chosenValues?.id,
          fromId: staffId,
          companyId: +companyId,
          data: {
            message: e.message,
          },
        },
        (res: any) => {
          if (res.success) {
            setValue('message', '');
            setNewMassage({
              chatType: res?.data?.chatType,
              companyId: res?.data?.datacompanyId,
              createdAt: res?.data?.createdAt,
              fromId: res?.data?.fromId,
              id: res?.data?.id,
              msg: res?.data?.msg,
              status: res?.data?.status,
              toId: res?.data?.toId,
            });
            scrollToTop();
            setState({ ...state, loading: false });
          } else {
            setState({ ...state, loading: false });
          }
        }
      );
    }
  };

  const userList = users?.map((v: any) => {
    return (
      <ChatUser
        key={v.id}
        value={{
          onClick: () => {
            if (v.id !== state.chosenValues?.id) {
              setState({ ...state, chosenValues: v });
              dispatch(setChatClientHistory([]));
              dispatch(
                setChosenListUser({
                  ...choseListUser,
                  chosen: v,
                  isChoose: true,
                })
              );
            }
          },
          isActive: v.id === state.chosenValues?.id,
          firstName: v.firstName,
          image: v.image,
          lastName: v.lastName,
          lastMsg: v.lastMsg,
          clientGenderTypeId: v.genderTypeId,
          chatType: v.chatType,
          status: v.status,
        }}
      />
    );
  });

  const searchList = searchRes?.map((v: any) => {
    return (
      <ChatUser
        key={v.id}
        value={{
          onClick: () => {
            if (v.id !== state.chosenValues?.id) {
              setState({ ...state, chosenValues: v });
              dispatch(setChatClientHistory([]));
              dispatch(
                setChosenListUser({
                  ...choseListUser,
                  chosen: v,
                  isChoose: true,
                })
              );
            }
          },
          isActive: v.id === state.chosenValues?.id,
          firstName: v.firstName,
          image: v.image,
          lastName: v.lastName,
          lastMsg: v.lastMsg,
          clientGenderTypeId: v.genderTypeId,
          chatType: v.chatType,
          status: v.status,
        }}
      />
    );
  });

  if (width <= 600) {
    return (
      <MobileContainer>
        <Input
          IconStart={<SearchIcon />}
          inputStyle={{
            border: 'none',
            shadow: '0px 4px 4px rgba(0, 0, 0, 0.04)',
            outpadding: width > 600 ? '0 0 0 25px' : '0 0 0 10px',
            inpadding: width > 600 ? '0 20px 0 10px' : '0 10px 0 0',
            height: {
              desktop: 50,
              laptop: 45,
              planshet: 40,
              mobile: 36,
            },
          }}
          type='search'
          placeholder={t('searchbyclients')}
          onChange={handleSearch}
          onFocus={() => setSearchFocus(true)}
          onBlur={() => (inpuSearch === '' ? setSearchFocus(false) : null)}
          value={inpuSearch}
        />
        {resChatClients.isFetching || resChatClients.isLoading ? (
          <Fetching>Loading....</Fetching>
        ) : (
          <>
            {!searchFocus || inpuSearch === '' ? (
              <MobileMessages>{userList}</MobileMessages>
            ) : searchRes?.length === 0 ? (
              <NoResult>{t('notfinduser')}</NoResult>
            ) : (
              <MobileMessages>{searchList}</MobileMessages>
            )}
          </>
        )}
        <FullModal open={choseListUser?.isChoose}>
          <WrapModal>
            <HeaderModal>
              <IconButton
                onClick={() => {
                  dispatch(setChatClientHistory([]));
                  dispatch(
                    setChosenListUser({
                      ...choseListUser,
                      chosen: {},
                      isChoose: false,
                      fetchHistory: false,
                    })
                  );
                }}
                style={{ margin: '0 5px 0 -12px' }}
              >
                <LeftBack />
              </IconButton>
              <Avatar big={true}>
                <LazyLoadImage
                  alt='image'
                  height='100%'
                  src={
                    state?.chosenValues?.image
                      ? state?.chosenValues?.image
                      : state?.chosenValues?.genderTypeId === 1
                      ? defuserman
                      : state?.chosenValues?.genderTypeId === 2
                      ? defuserwoman
                      : App
                  }
                  width='100%'
                  effect='blur'
                  style={{ objectFit: 'cover' }}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = App;
                  }}
                />
              </Avatar>
              <WrapUserInfo>
                <WrapInfo>
                  <UserName>
                    {state?.chosenValues?.firstName}{' '}
                    {state?.chosenValues?.lastName}
                  </UserName>
                  <Status main={true}>
                    {`${t('status')}: ${
                      state?.chosenValues?.obtainProgramLoyalty?.levelName
                    } ${state?.chosenValues?.obtainProgramLoyalty?.percent}%`}
                  </Status>
                </WrapInfo>
                <Dots />
              </WrapUserInfo>
            </HeaderModal>
            <BodyModal>
              <ChatPlace />
            </BodyModal>
            <FooterModal>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <WrapTextArea>
                  <Controller
                    name='message'
                    control={control}
                    rules={{
                      required: true,
                    }}
                    defaultValue=''
                    render={({ field }) => (
                      <TextareaAutosize
                        minRows={1}
                        maxRows={6}
                        placeholder={t('writeyoutmessage')}
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        style={{
                          maxWidth: '100%',
                          minWidth: '100%',
                          maxHeight: '102px',
                        }}
                        maxLength={400}
                      />
                    )}
                  />
                  <WrapButtons>
                    <IconButton>
                      <ScriptIcon />
                    </IconButton>
                    <IconButton type='submit' disabled={state.loading}>
                      <SendIcon />
                    </IconButton>
                  </WrapButtons>
                </WrapTextArea>
                <Wranning>{limitwords}</Wranning>
              </Form>
            </FooterModal>
          </WrapModal>
        </FullModal>
      </MobileContainer>
    );
  } else {
    return (
      <Container>
        <Upside>
          <Box1>
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
            {resChatClients.isFetching || resChatClients.isLoading ? (
              <Fetching>Loading....</Fetching>
            ) : null}
          </Box1>
          <Box2>
            {state?.chosenValues?.id !== undefined &&
            choseListUser?.isChoose ? (
              <WrapUserInfo>
                <div>
                  <Avatar big={true}>
                    <LazyLoadImage
                      alt='image'
                      height='100%'
                      src={
                        state?.chosenValues?.image
                          ? state?.chosenValues?.image
                          : state?.chosenValues?.genderTypeId === 1
                          ? defuserman
                          : state?.chosenValues?.genderTypeId === 2
                          ? defuserwoman
                          : App
                      }
                      width='100%'
                      effect='blur'
                      style={{ objectFit: 'cover' }}
                      onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src = App;
                      }}
                    />
                  </Avatar>
                  <WrapInfo>
                    <UserName>
                      {state?.chosenValues?.firstName}{' '}
                      {state?.chosenValues?.lastName}
                    </UserName>
                    <Status main={true}>
                      {`${t('status')}: ${
                        state?.chosenValues?.obtainProgramLoyalty?.levelName
                      } ${state?.chosenValues?.obtainProgramLoyalty?.percent}%`}
                    </Status>
                  </WrapInfo>
                </div>
                <Dots />
              </WrapUserInfo>
            ) : null}
          </Box2>
        </Upside>
        <Downside>
          <Box3>
            <WrapChatUsers>
              {!searchFocus || inpuSearch === '' ? (
                <>{userList}</>
              ) : searchRes?.length === 0 ? (
                <NoResult>{t('notfinduser')}</NoResult>
              ) : (
                <>{searchList}</>
              )}
            </WrapChatUsers>
          </Box3>
          {state?.chosenValues?.id !== undefined && choseListUser?.isChoose ? (
            messages?.map((v: any) => {
              if (v.id === state?.chosenValues?.id) {
                return (
                  <>
                    <Box4>
                      <ChatPlace data={state.chosenValues} />
                      <Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                          <Controller
                            name='message'
                            control={control}
                            rules={{
                              required: true,
                              maxLength: 400,
                            }}
                            defaultValue=''
                            render={({ field }) => (
                              <Input
                                fullWidth={true}
                                multiline={true}
                                placeholder={t('writeyoutmessage')}
                                inputStyle={{
                                  border: 'none',
                                  inpadding: width > 1500 ? '10px 20px' : '',
                                }}
                                field={field}
                                maxLength={400}
                              />
                            )}
                          />
                          <InputDown>
                            <InputWarn>{limitwords}</InputWarn>
                            <WrapIcons>
                              <IconButton
                                onClick={() =>
                                  setState({
                                    ...state,
                                    showEmoji: !state.showEmoji,
                                  })
                                }
                              >
                                <SmileIcon />
                              </IconButton>
                              <WrapScript>
                                <IconButton>
                                  <ScriptIcon />
                                </IconButton>
                              </WrapScript>
                              <Button
                                type='submit'
                                disabled={state.loading}
                                startIcon={<SendIcon />}
                              >
                                {t('send')}
                              </Button>
                            </WrapIcons>
                          </InputDown>
                        </Form>
                      </Body>
                    </Box4>
                    {state.showEmoji ? (
                      <Emoji
                        value={getValues('message')}
                        onSelect={(e) => setValue('message', e)}
                        onBlur={() => setState({ ...state, showEmoji: false })}
                      />
                    ) : null}
                  </>
                );
              }
            })
          ) : (
            <Box4>
              <WrapImg>
                <Img src={defaultChat} alt='defphoto' />
                <WrapChoose>{t('choseChat')}</WrapChoose>
              </WrapImg>
            </Box4>
          )}
        </Downside>
      </Container>
    );
  }
};

export default Posts;

import { useEffect, useRef, useState } from 'react';
import ChatUser from '../../components/ChatUser';
import Input from 'components/Custom/Input';
import Button from 'components/Custom/Button';
import { useTranslation } from 'react-i18next';
import { Avatar, Status } from '../../style';
import useChatClients from '../../hooks/useChatClients';
import { useAppSelector, useAppDispatch } from 'services/redux/hooks';
import defaultChat from 'assets/images/choosechat.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { SOCKET_EVENT } from 'services/constants/chat';
import dayjs from 'dayjs';
import Popover from 'components/Custom/Popover';
import { ruCount } from '../../hooks/format';
import { Picker } from 'emoji-mart';
import { IconButton } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import defuserman from 'assets/icons/defuserman.png';
import defuserwoman from 'assets/icons/defuserwoman.png';
import App from 'assets/icons/StatistisPage/app.svg';
import FullModal from 'components/Custom/FullModal';
import { ReactComponent as LeftBack } from 'assets/icons/FinanceIcons/leftback.svg';
import { TextareaAutosize } from '@material-ui/core';
import {
  Container,
  LeftSide,
  RightSide,
  Header,
  SearchIcon,
  WrapChatUsers,
  WrapUserInfo,
  UserName,
  WrapInfo,
  DotsIcon,
  Form,
  Body,
  InputDown,
  ScriptIcon,
  SmileIcon,
  SendIcon,
  InputWarn,
  WrapIcons,
  ChatPlace,
  WrapImg,
  WrapChoose,
  Messages,
  Wrapper,
  DownIcon,
  WrapDown,
  Img,
  Message,
  MessageText,
  MessageDate,
  MessageWrap,
  Delete,
  Link,
  SelectWrap,
  DotsWrap,
  Loading,
  Fetching,
  EPicker,
  WrapScript,
  WrapDownIcon,
  NoResult,
  MobileMessages,
  MobileContainer,
  WrapModal,
  HeaderModal,
  BodyModal,
  FooterModal,
  Wranning,
  WrapTextArea,
  WrapButtons,
  WrapDateMessage,
} from './style';

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

interface FormProps {
  message?: string;
}

const Posts = () => {
  const { t } = useTranslation();
  const companyId: any = localStorage.getItem('companyId');
  const words = 400;
  const { control, handleSubmit, setValue, getValues, watch } =
    useForm<FormProps>({
      mode: 'onBlur',
      shouldFocusError: true,
    });

  const values = getValues();

  const staffId = useAppSelector((state) => state.auth.staffId);

  const { width } = useWindowWidth();
  const [users, setUsers] = useState<any>([]);
  const [limit, setLimit] = useState(words);
  const [historyFetch, setHistoryFetch] = useState(false);

  const [loading, setLoading] = useState(false);
  const [closeFun, setCloseFun] = useState<any>();

  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [inpuSearch, setInpuSearch] = useState<string>('');
  const [searchRes, setSearchRes] = useState<any[]>([]);
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [height, setHeight] = useState(0);
  const {
    resChatClients,
    resChatClientHistory,
    deleteRes,
    isChoose,
    setIsChoose,
    chosen,
    setChosen,
    scrollToTop,
    messagesStartRef,
    setInntialHistory,
    inntialHistory,
    fetchHisFetchData,
  } = useChatClients();
  const messages = useAppSelector((state) => state.feedbackPost.messages);
  const histories = useAppSelector((state) => state.feedbackPost.histories);
  const totalHistory: any = useAppSelector(
    (state) => state.feedbackPost.totalHistory
  );
  const socket = useAppSelector((state) => state.feedbackPost.socket);
  const companyInfo = useAppSelector((state) => state.partner.companyInfo);

  useEffect(() => {
    setUsers(messages);
  }, [messages]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    console.log('bottom');
    console.log(messagesEndRef);
    messagesEndRef?.current?.scrollIntoView({
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

  useEffect(() => {
    socket?.on(SOCKET_EVENT.CHAT_CLIENT_TO_PARTNER, function () {
      resChatClients.refetch();
      resChatClientHistory.refetch();
    });
  }, []);

  const findScrollHeight = (e: any) => {
    e.preventDefault();
    setHeight(e.target.scrollHeight);
    setScrollHeight(Math.abs(e.target.scrollTop));
  };

  useEffect(() => {
    const a: any = messagesStartRef?.current?.offsetTop;
    if (scrollHeight + a + 1 === height) {
      console.log('ok');

      if (
        inntialHistory.page <= Math.ceil(totalHistory / inntialHistory.perPage)
      ) {
        fetchHisFetchData();
      }
    }
  }, [scrollHeight, height]);

  useEffect(() => {
    if (socket) {
      scrollToBottom();
    }
  }, [socket]);

  const handleClose = (e: any) => {
    setCloseFun(e);
  };

  const handleShowEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  useEffect(() => {
    if (values?.message !== undefined) {
      setLimit(words - values?.message?.length);
    }
  }, [watch('message')]);

  const onSubmit = (e: any) => {
    setLoading(true);
    if (e.message.length > 0) {
      socket.emit(
        'chat_to_server',
        {
          langId: 1,
          chatType: 2,
          toId: chosen.id,
          fromId: staffId,
          companyId: +companyId,
          data: {
            message: e.message,
          },
        },
        (res: any) => {
          if (res.success) {
            resChatClientHistory.refetch();
            resChatClients.refetch();
            setValue('message', '');
            setLoading(false);
          } else {
            setLoading(false);
          }
        }
      );
    }
  };

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

  const handleDelete = () => {
    const data: any = {
      withUserType: 1,
      withId: chosen.id,
    };
    deleteRes.mutate(data, {
      onSuccess: () => {
        closeFun.close();
        setChosen({});
        setIsChoose(false);
        resChatClients.refetch();
      },
    });
  };

  const avatar = (
    <Avatar big={true}>
      <LazyLoadImage
        alt='image'
        height='100%'
        src={
          chosen.image
            ? chosen.image
            : chosen?.genderTypeId === 1
            ? defuserman
            : chosen?.genderTypeId === 2
            ? defuserwoman
            : ''
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
  );

  const limitwords = (
    <>
      {t('limitfeedback')}

      {` ${limit} ${ruCount({
        count: limit,
        firstWord: 'символ',
        secondWord: 'символа',
        thirdWord: 'символов',
      })}`}
    </>
  );

  const status = (
    <Status main={true}>
      {`${t('status')}: ${chosen.obtainProgramLoyalty?.levelName} ${
        chosen.obtainProgramLoyalty?.percent
      }%`}
    </Status>
  );

  return width <= 600 ? (
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
      {resChatClients.isFetching && !resChatClients.isLoading ? (
        <Loading>Loading....</Loading>
      ) : null}
      {resChatClients.isLoading ? (
        <Loading style={{ display: 'flex', justifyContent: 'center' }}>
          Loading....
        </Loading>
      ) : (
        <>
          {!searchFocus || inpuSearch === '' ? (
            <MobileMessages>
              {users?.map((v: any) => {
                return (
                  <ChatUser
                    key={v.id}
                    value={{
                      onClick: () => {
                        setHistoryFetch(true);
                        handleChoose(v);
                      },
                      isActive: v.id === chosen.id,
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
              })}
            </MobileMessages>
          ) : searchRes?.length === 0 ? (
            <NoResult>{t('notfinduser')}</NoResult>
          ) : (
            <MobileMessages>
              {searchRes?.map((v: any) => {
                return (
                  <ChatUser
                    key={v.id}
                    value={{
                      onClick: () => handleChoose(v),
                      isActive: v.id === chosen.id,
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
              })}
            </MobileMessages>
          )}
        </>
      )}
      <FullModal open={isChoose}>
        <WrapModal>
          <HeaderModal>
            <IconButton
              onClick={() => {
                setIsChoose(false);
                setHistoryFetch(false);
                setChosen({});
              }}
              style={{ margin: '0 5px 0 -12px' }}
            >
              <LeftBack />
            </IconButton>
            {avatar}
            <WrapUserInfo>
              <WrapInfo>
                <UserName>
                  {chosen.firstName} {chosen.lastName}
                </UserName>
                {status}
              </WrapInfo>
              <Popover
                click={
                  <DotsWrap>
                    <DotsIcon />
                  </DotsWrap>
                }
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                openBgColor='rgba(96, 110, 234, 0.1)'
                radius={14}
                popoverStyle={{ marginTop: '20px', zIndex: 99999 }}
                onClose={handleClose}
              >
                <SelectWrap>
                  <Link>{t('sharelink')}</Link>
                  <Delete onClick={handleDelete}>{t('deletechat')}</Delete>
                </SelectWrap>
              </Popover>
            </WrapUserInfo>
          </HeaderModal>
          <BodyModal>
            <ChatPlace>
              <Messages onScroll={findScrollHeight}>
                <div>
                  <div ref={messagesStartRef} />
                  {histories?.map((v: any) => {
                    return (
                      <MessageWrap type={v.chatType}>
                        <Message type={v.chatType}>
                          <MessageDate type={v.chatType}>
                            {dayjs(v.createdAt).format('hh:mm')}
                          </MessageDate>
                          <MessageText type={v.chatType}>{v.msg}</MessageText>
                        </Message>
                      </MessageWrap>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </Messages>
            </ChatPlace>
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
                  <IconButton type='submit' disabled={loading}>
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
  ) : (
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
              users?.map((v: any) => {
                return (
                  <ChatUser
                    key={v.id}
                    value={{
                      onClick: () => {
                        handleChoose(v);
                      },
                      isActive: v.id === chosen.id,
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
              })
            ) : searchRes?.length === 0 ? (
              <NoResult>{t('notfinduser')}</NoResult>
            ) : (
              searchRes?.map((v: any) => {
                return (
                  <ChatUser
                    key={v.id}
                    value={{
                      onClick: () => handleChoose(v),
                      isActive: v.id === chosen.id,
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
              })
            )}
          </WrapChatUsers>
        )}
      </LeftSide>
      <RightSide>
        {isChoose ? (
          <Wrapper>
            <Header right={true}>
              <WrapUserInfo>
                {avatar}
                <WrapInfo>
                  <UserName>
                    {chosen.firstName} {chosen.lastName}
                  </UserName>
                  {status}
                </WrapInfo>
              </WrapUserInfo>
              <Popover
                click={
                  <DotsWrap>
                    <DotsIcon />
                  </DotsWrap>
                }
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                openBgColor='rgba(96, 110, 234, 0.1)'
                radius={14}
                popoverStyle={{ marginTop: '20px' }}
                onClose={handleClose}
              >
                <SelectWrap>
                  <Link>{t('sharelink')}</Link>
                  <Delete onClick={handleDelete}>{t('deletechat')}</Delete>
                </SelectWrap>
              </Popover>
            </Header>
            <Body>
              <ChatPlace>
                {scrollHeight > 0 ? (
                  <WrapDownIcon>
                    <WrapDown onClick={() => scrollToTop()}>
                      <DownIcon />
                    </WrapDown>
                  </WrapDownIcon>
                ) : null}
                <Messages onScroll={findScrollHeight}>
                  <div ref={messagesStartRef} />
                  {histories?.map((v: any) => {
                    return (
                      <MessageWrap>
                        <Avatar>
                          <LazyLoadImage
                            src={
                              v.chatType === 1
                                ? chosen?.image
                                  ? chosen?.image
                                  : ''
                                : companyInfo.logo
                            }
                            alt='user'
                            style={{
                              objectFit: 'cover',
                            }}
                            height='100%'
                            width='100%'
                            onError={(e: any) => {
                              e.target.onerror = null;
                              e.target.src = App;
                            }}
                          />
                        </Avatar>
                        <Message type={v.chatType}>
                          <WrapDateMessage>
                            <MessageDate type={v.chatType}>
                              {dayjs(v.createdAt).format('hh:mm')}
                            </MessageDate>
                          </WrapDateMessage>
                          <MessageText type={v.chatType}>{v.msg}</MessageText>
                        </Message>
                      </MessageWrap>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </Messages>
              </ChatPlace>
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
                    <IconButton onClick={handleShowEmoji}>
                      <SmileIcon />
                    </IconButton>
                    <WrapScript>
                      <IconButton>
                        <ScriptIcon />
                      </IconButton>
                    </WrapScript>
                    <Button
                      type='submit'
                      disabled={loading}
                      startIcon={<SendIcon />}
                    >
                      {t('send')}
                    </Button>
                  </WrapIcons>
                </InputDown>
              </Form>
            </Body>
            {showEmoji ? (
              <EPicker onBlur={() => setShowEmoji(false)}>
                <Picker
                  set='google'
                  onSelect={(e: any) => {
                    const m = getValues('message') + e.native;
                    setValue('message', m);
                  }}
                  sheetSize={20}
                  showPreview={false}
                  emojiTooltip={true}
                  showSkinTones={false}
                  useButton={true}
                  color='#606eea'
                />
              </EPicker>
            ) : null}
          </Wrapper>
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

export default Posts;

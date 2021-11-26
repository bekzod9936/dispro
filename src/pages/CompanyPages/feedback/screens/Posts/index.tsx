import { useEffect, useRef, useState } from 'react';
import ChatUser from '../../components/ChatUser';
import Input from 'components/Custom/Input';
import Button from 'components/Custom/Button';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../../style';
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
import {
  Container,
  LeftSide,
  RightSide,
  Header,
  SearchIcon,
  WrapChatUsers,
  WrapUserInfo,
  UserName,
  Status,
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
} from './style';
import defuserman from 'assets/icons/defuserman.png';
import defuserwoman from 'assets/icons/defuserwoman.png';
import App from 'assets/icons/StatistisPage/app.svg';

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

  const [loading, setLoading] = useState(false);
  const [closeFun, setCloseFun] = useState<any>();

  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [inpuSearch, setInpuSearch] = useState<string>('');
  const [searchRes, setSearchRes] = useState<any[]>([]);
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
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
  } = useChatClients();
  const messages = useAppSelector((state) => state.feedbackPost.messages);
  const histories = useAppSelector((state) => state.feedbackPost.histories);
  const socket = useAppSelector((state) => state.feedbackPost.socket);
  const companyInfo = useAppSelector((state) => state.partner.companyInfo);

  useEffect(() => {
    setUsers(messages);
  }, [messages]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
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

    setScrollHeight(Math.abs(e.target.scrollTop));
  };

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
              users?.map((v: any) => {
                return (
                  <ChatUser
                    key={v.id}
                    firstName={v.firstName}
                    image={v.image}
                    lastName={v.lastName}
                    date={v.date}
                    id={v.id}
                    isDeleted={v.isDelete}
                    onClick={() => handleChoose(v)}
                    lastMsg={v.lastMsg}
                    isActive={v.id === chosen.id}
                    clientGenderTypeId={v.genderTypeId}
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
                    firstName={v.firstName}
                    image={v.image}
                    lastName={v.lastName}
                    date={v.date}
                    id={v.id}
                    isDeleted={v.isDelete}
                    onClick={() => handleChoose(v)}
                    lastMsg={v.lastMsg}
                    isActive={v.id === chosen.id}
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
                  />
                </Avatar>
                <WrapInfo>
                  <UserName>
                    {chosen.firstName} {chosen.lastName}
                  </UserName>
                  <Status>{`${chosen.obtainProgramLoyalty?.levelName} ${chosen.obtainProgramLoyalty?.percent}%`}</Status>
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
                          />
                        </Avatar>
                        <Message
                          bgcolor={v.chatType === 1 ? '#E5E9FF' : '#606eea'}
                        >
                          <MessageDate
                            bgcolor={v.chatType === 1 ? '#A5A5A5' : '#fff'}
                          >
                            {dayjs(v.createdAt)
                              .subtract(2, 'minute')
                              .format('hh:mm')}
                          </MessageDate>
                          <MessageText
                            bgcolor={v.chatType === 1 ? '#223367' : '#fff'}
                          >
                            {v.msg}
                          </MessageText>
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
                  <InputWarn>
                    Вы можете написать еще
                    {` ${limit} ${ruCount({
                      count: limit,
                      firstWord: 'символ',
                      secondWord: 'символа',
                      thirdWord: 'символов',
                    })}`}
                  </InputWarn>
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

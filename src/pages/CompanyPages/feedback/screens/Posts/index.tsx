import { createRef, useCallback, useEffect, useRef, useState } from 'react';
import ChatUser from '../../components/ChatUser';
import Input from 'components/Custom/Input';
import Button from 'components/Custom/Button';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../../style';
import useChatClients from '../../hooks/useChatClients';
import { useAppSelector } from 'services/redux/hooks';
import defaultChat from 'assets/images/choosechat.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { SOCKET_EVENT } from 'services/constants/chat';
import moment from 'moment';
import Popover from 'components/Custom/Popover';
import Spinner from 'components/Custom/Spinner';
import 'emoji-mart/css/emoji-mart.css';
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
} from './style';

interface ChProps {
  date?: string;
  firstName?: string;
  id?: number;
  image?: string;
  isDeleted?: boolean;
  lastMsg?: string;
  lastName?: string;
}

interface FormProps {
  message?: string;
}

const companyId: any = localStorage.getItem('companyId');

const Posts = () => {
  const { t } = useTranslation();

  const { control, handleSubmit, setValue, getValues } = useForm<FormProps>({
    mode: 'onBlur',
    shouldFocusError: true,
  });

  const { width } = useWindowWidth();
  const [chosen, setChosen] = useState<ChProps>({});

  const [closeFun, setCloseFun] = useState<any>();
  const [isChoose, setIsChoose] = useState<boolean>(false);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [scrollHeight, setScrollHeight] = useState(0);

  const { resChatClients, resChatClientHistory } = useChatClients({ chosen });
  const messages = useAppSelector((state) => state.feedbackPost.messages);
  const histories = useAppSelector((state) => state.feedbackPost.histories);
  const socket = useAppSelector((state) => state.feedbackPost.socket);
  const companyInfo = useAppSelector((state) => state.partner.companyInfo);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleChoose = async (v: ChProps) => {
    await setChosen(v);
    await setIsChoose(true);
    await resChatClientHistory.refetch();
  };

  useEffect(() => {
    socket?.on(SOCKET_EVENT.CHAT_CLIENT_TO_PARTNER, function (data: any) {
      resChatClients.refetch();
      resChatClientHistory.refetch();
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
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

  const onSubmit = (e: any) => {
    const fromId = histories?.find((v: any) => {
      if (v.chatType === 2) return v.fromId;
    });

    if (e.message.length > 0) {
      socket.emit(
        'chat_to_server',
        {
          langId: 1,
          chatType: 2,
          toId: chosen.id,
          fromId: fromId?.fromId,
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
          } else {
            console.log(res);
          }
        }
      );
    }
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
            {messages?.map((v: any) => {
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
            })}
          </WrapChatUsers>
        )}
      </LeftSide>
      <RightSide>
        {isChoose ? (
          resChatClientHistory.isFetching ? (
            <Spinner />
          ) : (
            <Wrapper>
              <Header right={true}>
                <WrapUserInfo>
                  <Avatar big={true}>
                    <LazyLoadImage
                      src={chosen?.image ? chosen?.image : ''}
                      alt='image'
                      style={{
                        objectFit: 'cover',
                      }}
                      height='100%'
                      width='100%'
                    />
                  </Avatar>
                  <WrapInfo>
                    <UserName>
                      {chosen.firstName} {chosen.lastName}
                    </UserName>
                    <Status>Base 5%</Status>
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
                    <Delete>{t('deletechat')}</Delete>
                  </SelectWrap>
                </Popover>
              </Header>
              <Body>
                <ChatPlace>
                  <Messages>
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
                              {moment(v.createdAt).format('LT')}
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
                    <WrapDown>
                      <DownIcon />
                    </WrapDown>
                  </Messages>
                </ChatPlace>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name='message'
                    control={control}
                    rules={{
                      required: true,
                    }}
                    defaultValue=''
                    render={({ field }) => (
                      <Input
                        fullWidth={true}
                        multiline={width > 1500 ? true : false}
                        placeholder={t('writeyoutmessage')}
                        inputStyle={{
                          border: 'none',
                          inpadding: width > 1500 ? '10px 20px' : '',
                        }}
                        field={field}
                      />
                    )}
                  />
                  <InputDown>
                    <InputWarn>Вы можете написать еще 400 сообщения</InputWarn>
                    <WrapIcons>
                      <IconButton onClick={handleShowEmoji}>
                        <SmileIcon />
                      </IconButton>
                      <WrapScript>
                        <IconButton>
                          <ScriptIcon />
                        </IconButton>
                      </WrapScript>
                      <Button type='submit' startIcon={<SendIcon />}>
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
          )
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

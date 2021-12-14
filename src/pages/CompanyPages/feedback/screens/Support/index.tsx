import { useEffect, useRef, useState } from 'react';
import Title from 'components/Custom/Title';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Button from 'components/Custom/Button';
import Input from 'components/Custom/Input';
import { IconButton } from '@material-ui/core';
import useSupportChat from './useSupportChat';
import dayjs from 'dayjs';
import { CHAT_TYPES, SOCKET_EVENT } from 'services/constants/chat';
import disicon from 'assets/icons/disicon.png';
import { ruCount } from '../../hooks/format';
import FullModal from 'components/Custom/FullModal';
import { ReactComponent as LeftBack } from 'assets/icons/FinanceIcons/leftback.svg';
import { useHistory } from 'react-router';
import App from 'assets/icons/StatistisPage/app.svg';
import { TextareaAutosize } from '@material-ui/core';
import Emoji from '../../components/Emoji';
import Spinner from 'components/Custom/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  setChatSupportHistory,
  setTotalSupportHistory,
} from 'services/redux/Slices/feedback';
import useRead from '../../hooks/useRead';
import useLayout from 'components/Layout/useLayout';
import {
  Container,
  MessageContainer,
  Body,
  Wrapper,
  Header,
  Form,
  HTitle,
  Link,
  WorkingTime,
  TimeWrap,
  LinkWrap,
  WrapTitile,
  WrapImg,
  Messages,
  ChatPlace,
  MessageWrap,
  Message,
  MessageDate,
  MessageText,
  WrapDown,
  DownIcon,
  WrapDownIcon,
  DisIcon,
  WrapModal,
  HeaderModal,
  BodyModal,
  FooterModal,
  WrapPhone,
  Wranning,
  WrapTextArea,
  WrapButtons,
} from './style';
import {
  Avatar,
  InputDown,
  SmileIcon,
  SendIcon,
  InputWarn,
  WrapIcons,
  Divider,
} from '../../style';

interface FormProps {
  message?: string;
}

const Support = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [lastdate, setLastdate] = useState<any>('');
  const companyId: any = localStorage.getItem('companyId');
  const words = 400;
  const { control, handleSubmit, setValue, getValues, watch } =
    useForm<FormProps>({
      mode: 'onBlur',
      shouldFocusError: true,
    });
  const [loading, setLoading] = useState(false);
  const total: any = useAppSelector(
    (state) => state.feedbackPost.totalSupportHistory
  );
  const staffId = useAppSelector((state) => state.auth.staffId);

  const histories: any = useAppSelector(
    (state) => state.feedbackPost.supporthistories
  );

  const { resChatSupportHistory, setPage, page, noValue } = useSupportChat();
  const { readChat } = useRead();
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [limit, setLimit] = useState(words);
  const [newMassage, setNewMassage] = useState<any>({});
  const socket = useAppSelector((state) => state.feedbackPost.socket);
  const companyInfo = useAppSelector((state) => state.partner.companyInfo);
  const { resBadge } = useLayout({ id: companyId });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesStartRef = useRef<HTMLDivElement>(null);

  const values = getValues();

  const scrollToTop = () => {
    messagesStartRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const fetchHisFetchData = () => {
    if (total.total > histories.length) {
      setPage(page + 1);
      dispatch(
        setTotalSupportHistory({
          ...total,
          hasMore: true,
        })
      );
    } else {
      dispatch(
        setTotalSupportHistory({
          ...total,
          hasMore: false,
        })
      );
    }
  };

  useEffect(() => {
    const newArr = histories
      .filter((v: any) => (v.chatType === 6 && v.status === 1 ? v.id : null))
      .map((i: any) => i.id);
    if (newArr.length !== 0) {
      readChat.mutate(newArr, {
        onSuccess: () => {
          resBadge.refetch();
        },
      });
    }
    if (histories.length > 0) {
      const last = histories[histories?.length - 1];
      setLastdate(last?.createdAt);
    }
  }, [histories]);

  const findScrollHeight = (e: any) => {
    e.preventDefault();

    setScrollHeight(Math.abs(e.target.scrollTop));
  };

  const handleShowEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  useEffect(() => {
    socket.on(SOCKET_EVENT.CHAT_MODERATOR_TO_PARTNER, (message: any) => {
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

  const fun = async () => {
    await dispatch(setChatSupportHistory([newMassage, ...histories]));
    await scrollToTop();
  };

  useEffect(() => {
    if (newMassage.id !== undefined) {
      fun();
      scrollToTop();
      if (CHAT_TYPES.PARTNER_TO_MODERATOR !== newMassage.chatType) {
        readChat.mutate([newMassage?.id], {
          onSuccess: () => {
            resBadge.refetch();
          },
        });
      }
    }
  }, [newMassage]);

  useEffect(() => {
    if (values?.message !== undefined) {
      setLimit(words - values?.message?.length);
    }
  }, [watch('message')]);

  const funScrollDown = async (message: any) => {
    await dispatch(setChatSupportHistory([message, ...histories]));
    await scrollToTop();
  };

  const onSubmit = (e: any) => {
    if (e.message.length > 0 && e?.message.match(/\S/) !== null) {
      setLoading(true);
      socket.emit(
        'chat_to_server',
        {
          langId: 1,
          chatType: CHAT_TYPES.PARTNER_TO_MODERATOR,
          toId: 1,
          fromId: staffId,
          companyId: +companyId,
          data: {
            message: e.message.trim(),
          },
        },
        (res: any) => {
          if (res.success) {
            setValue('message', '');
            const message = {
              chatType: res?.data?.chatType,
              companyId: res?.data?.datacompanyId,
              createdAt: res?.data?.createdAt,
              fromId: res?.data?.fromId,
              id: res?.data?.id,
              msg: res?.data?.msg,
              status: res?.data?.status,
              toId: res?.data?.toId,
            };
            funScrollDown(message);
            setLoading(false);
          } else {
            setLoading(false);
          }
        }
      );
    }
  };

  const title = <HTitle>{t('supportcall')}</HTitle>;

  const avatar = (
    <Avatar big={true} bgcolor='#E6E6E6'>
      <DisIcon />
    </Avatar>
  );

  const tel = <Link href='tel:+998712002015'> +99871 200 20 15</Link>;

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

  if (width > 600) {
    return (
      <Container>
        <Title>{t('supportcall')}</Title>
        <MessageContainer>
          <Wrapper>
            <Header>
              <WrapImg>
                {avatar}
                <WrapTitile>
                  {title}
                  <LinkWrap>
                    {tel}
                    <Link href='mailto:support@dis-count.app'>
                      support@dis-count.app
                    </Link>
                  </LinkWrap>
                </WrapTitile>
              </WrapImg>
              <TimeWrap>
                <WorkingTime>Время работы службы поддержки:</WorkingTime>
                <WorkingTime>ПН-ПТ с 9:00 до 18:00</WorkingTime>
                <WorkingTime>СБ-ВС выходной</WorkingTime>
              </TimeWrap>
            </Header>
            <Body>
              <ChatPlace>
                {resChatSupportHistory.isLoading ? (
                  <Spinner />
                ) : noValue ? (
                  <div
                    style={{
                      display: 'flex',
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                    }}
                  >
                    {t('thereisnomessage')}
                  </div>
                ) : (
                  <>
                    <Messages id='scrollableDiv' onScroll={findScrollHeight}>
                      <div ref={messagesStartRef} />
                      {scrollHeight > 1 ? (
                        <WrapDownIcon>
                          <WrapDown onClick={() => scrollToTop()}>
                            <DownIcon />
                          </WrapDown>
                        </WrapDownIcon>
                      ) : null}
                      <InfiniteScroll
                        dataLength={histories?.length}
                        next={fetchHisFetchData}
                        style={{
                          display: 'flex',
                          flexDirection: 'column-reverse',
                          overflow: 'hidden',
                        }}
                        inverse={true}
                        hasMore={total?.hasMore}
                        loader={
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              width: '100%',
                            }}
                          >
                            <Spinner />
                          </div>
                        }
                        scrollableTarget='scrollableDiv'
                        endMessage={
                          <Divider>
                            <div>{dayjs(lastdate).format('DD MMMM YYYY')}</div>
                          </Divider>
                        }
                      >
                        {histories?.map((v: any) => {
                          return (
                            <MessageWrap type={v.chatType} key={v.id}>
                              <Avatar bgcolor='#E6E6E6'>
                                {v.chatType === 6 ? (
                                  <DisIcon />
                                ) : (
                                  <LazyLoadImage
                                    src={companyInfo.logo}
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
                                )}
                              </Avatar>
                              <Message type={v.chatType}>
                                <MessageDate type={v.chatType}>
                                  {dayjs(v.createdAt).format('HH:mm')}
                                </MessageDate>
                                <MessageText type={v.chatType}>
                                  {v.msg}
                                </MessageText>
                              </Message>
                            </MessageWrap>
                          );
                        })}
                      </InfiniteScroll>
                      <div ref={messagesEndRef} />
                    </Messages>
                  </>
                )}
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
              <Emoji
                value={getValues('message')}
                onSelect={(e) => setValue('message', e)}
                onBlur={() => setShowEmoji(false)}
              />
            ) : null}
          </Wrapper>
        </MessageContainer>
      </Container>
    );
  } else {
    return (
      <FullModal open={true}>
        <WrapModal>
          <HeaderModal>
            <IconButton
              onClick={() => {
                history.goBack();
              }}
              style={{ margin: '0 5px 0 -12px' }}
            >
              <LeftBack />
            </IconButton>
            {avatar}
            <WrapPhone>
              {title}
              {tel}
            </WrapPhone>
          </HeaderModal>
          <BodyModal>
            <ChatPlace>
              {resChatSupportHistory.isLoading ? (
                <Spinner />
              ) : histories.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                  }}
                >
                  {t('thereisnomessage')}
                </div>
              ) : (
                <Messages id='scrollableDiv' onScroll={findScrollHeight}>
                  <div ref={messagesStartRef} />
                  {scrollHeight > 1 ? (
                    <WrapDownIcon>
                      <WrapDown onClick={() => scrollToTop()}>
                        <DownIcon />
                      </WrapDown>
                    </WrapDownIcon>
                  ) : null}
                  <InfiniteScroll
                    dataLength={histories?.length}
                    next={fetchHisFetchData}
                    style={{
                      display: 'flex',
                      flexDirection: 'column-reverse',
                      overflow: 'hidden',
                    }}
                    inverse={true}
                    hasMore={total?.hasMore}
                    loader={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '100%',
                          zIndex: 3000,
                        }}
                      >
                        <Spinner />
                      </div>
                    }
                    scrollableTarget='scrollableDiv'
                    endMessage={
                      <Divider>
                        <div>{dayjs(lastdate).format('DD MMMM YYYY')}</div>
                      </Divider>
                    }
                  >
                    {histories?.map((v: any) => {
                      return (
                        <MessageWrap type={v.chatType} key={v.id}>
                          <Message type={v.chatType}>
                            <MessageDate type={v.chatType}>
                              {dayjs(v.createdAt).format('HH:mm')}
                            </MessageDate>
                            <MessageText type={v.chatType}>{v.msg}</MessageText>
                          </Message>
                        </MessageWrap>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </InfiniteScroll>
                </Messages>
              )}
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
    );
  }
};

export default Support;

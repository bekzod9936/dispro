import { useEffect, useRef, useState } from 'react';
import Title from 'components/Custom/Title';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import useWindowWidth from 'services/hooks/useWindowWidth';
import { useAppSelector } from 'services/redux/hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Button from 'components/Custom/Button';
import Input from 'components/Custom/Input';
import { Avatar } from '../../style';
import { IconButton } from '@material-ui/core';
import { Picker } from 'emoji-mart';
import useSupportChat from '../../hooks/useSupportChat';
import dayjs from 'dayjs';
import { CHAT_TYPES } from 'services/constants/chat';
import disicon from 'assets/icons/disicon.png';
import { ruCount } from '../../hooks/format';
import FullModal from 'components/Custom/FullModal';
import { ReactComponent as LeftBack } from 'assets/icons/FinanceIcons/leftback.svg';
import { useHistory } from 'react-router';
import App from 'assets/icons/StatistisPage/app.svg';
import { TextareaAutosize } from '@material-ui/core';
import {
  InputDown,
  ScriptIcon,
  SmileIcon,
  SendIcon,
  InputWarn,
  WrapIcons,
  EPicker,
  WrapScript,
} from '../Posts/style';
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

interface FormProps {
  message?: string;
}

const Support = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const history = useHistory();
  const companyId: any = localStorage.getItem('companyId');
  const words = 400;
  const { control, handleSubmit, setValue, getValues, watch } =
    useForm<FormProps>({
      mode: 'onBlur',
      shouldFocusError: true,
    });
  const [loading, setLoading] = useState(false);

  const staffId = useAppSelector((state) => state.auth.staffId);

  const { resChatSupportHistory } = useSupportChat();

  const histories = useAppSelector(
    (state) => state.feedbackPost.supporthistories
  );

  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [limit, setLimit] = useState(words);

  const socket = useAppSelector((state) => state.feedbackPost.socket);
  const companyInfo = useAppSelector((state) => state.partner.companyInfo);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesStartRef = useRef<HTMLDivElement>(null);

  const values = getValues();

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const scrollToTop = () => {
    messagesStartRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const findScrollHeight = (e: any) => {
    e.preventDefault();

    setScrollHeight(Math.abs(e.target.scrollTop));
  };

  useEffect(() => {
    if (socket) {
      scrollToBottom();
    }
  }, [socket]);

  useEffect(() => {
    if (values?.message !== undefined) {
      setLimit(words - values?.message?.length);
    }
  }, [watch('message')]);

  const handleShowEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const onSubmit = (e: any) => {
    setLoading(true);
    if (e.message.length > 0) {
      socket.emit(
        'chat_to_server',
        {
          langId: 1,
          chatType: CHAT_TYPES.PARTNER_TO_MODERATOR,
          toId: 1,
          fromId: staffId,
          companyId: +companyId,
          data: {
            message: e.message,
          },
        },
        (res: any) => {
          if (res.success) {
            console.log(res);
            setValue('message', '');
            resChatSupportHistory.refetch();
            setLoading(false);
          } else {
            console.log('thereis errror');
            setLoading(false);
          }
        }
      );
    }
  };

  const title = <HTitle>{t('supportcall')}</HTitle>;

  const avatar = (
    <Avatar big={true}>
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

  return width > 600 ? (
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
              <Messages onScroll={findScrollHeight}>
                <div ref={messagesStartRef} />
                {histories?.map((v: any) => {
                  return (
                    <MessageWrap type={v.chatType}>
                      <Avatar>
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
                          {dayjs(v.createdAt)
                            .subtract(2, 'minute')
                            .format('hh:mm')}
                        </MessageDate>
                        <MessageText type={v.chatType}>{v.msg}</MessageText>
                      </Message>
                    </MessageWrap>
                  );
                })}
                <div ref={messagesEndRef} />
              </Messages>
              {scrollHeight > 0 ? (
                <WrapDownIcon>
                  <WrapDown onClick={() => scrollToTop()}>
                    <DownIcon />
                  </WrapDown>
                </WrapDownIcon>
              ) : null}
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
      </MessageContainer>
    </Container>
  ) : (
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
            <Messages onScroll={findScrollHeight}>
              <div ref={messagesStartRef} />
              {histories?.map((v: any) => {
                return (
                  <MessageWrap type={v.chatType}>
                    <Message type={v.chatType}>
                      <MessageDate type={v.chatType}>
                        {dayjs(v.createdAt)
                          .subtract(2, 'minute')
                          .format('hh:mm')}
                      </MessageDate>
                      <MessageText type={v.chatType}>{v.msg}</MessageText>
                    </Message>
                  </MessageWrap>
                );
              })}
              <div ref={messagesEndRef} />
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
  );
};

export default Support;

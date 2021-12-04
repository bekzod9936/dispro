import useWindowWidth from 'services/hooks/useWindowWidth';
import Spinner from 'components/Custom/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import dayjs from 'dayjs';
import { Avatar, Divider } from '../../style';
import {
  WrapDateMessage,
  WrapDownIcon,
  MessageWrap,
  MessageDate,
  MessageText,
  Message,
  WrapDown,
  DownIcon,
  Messages,
  ChatPlace1,
} from './style';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAppDispatch, useAppSelector } from 'services/redux/hooks';
import { useState, useRef } from 'react';
import {
  setChatClientHistory,
  setTotalHistory,
} from 'services/redux/Slices/feedback';
import { OneCheckIcon, DoubleCheckIcoon } from '../../style';
import App from 'assets/icons/StatistisPage/app.svg';
import useChatClients from '../../screens/Posts/useChatClients';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchChatClientHistory } from 'services/queries/feedbackQuery';
import { CHAT_TYPES, USER_TYPES } from 'services/constants/chat';
import defuserman from 'assets/icons/defuserman.png';
import defuserwoman from 'assets/icons/defuserwoman.png';
import useRead from '../../hooks/useRead';
import { useTranslation } from 'react-i18next';

interface Props {
  data?: any;
}

const ChatPlace = ({ data }: Props) => {
  const { t } = useTranslation();

  const { width } = useWindowWidth();
  const [scrollHeight, setScrollHeight] = useState(0);
  const [page, setPage] = useState(1);
  const [lastdate, setLastdate] = useState<any>('');
  const [data1, setData1] = useState<any>([]);
  const companyInfo = useAppSelector((state) => state.partner.companyInfo);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { readChat } = useRead();
  const dispatch = useAppDispatch();
  const { scrollToTop, messagesStartRef } = useChatClients();
  const chosen = useAppSelector(
    (state) => state.feedbackPost.chosenListUser?.chosen
  );
  const totalData: any = useAppSelector(
    (state) => state.feedbackPost.totalHistory
  );

  const resChatClientHistory = useQuery(
    'getClientChatHistory',
    () => {
      return fetchChatClientHistory({
        url: `withUserType=${USER_TYPES.CUSTOMER}&withId=${data.id}&page=${page}&perPage=5`,
      });
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        dispatch(
          setChatClientHistory([...histories, ...data.data.data.histories])
        );
        dispatch(
          setTotalHistory({
            ...totalData,
            total: data.data.data.totalCount,
            loading: false,
          })
        );
      },
    }
  );

  useEffect(() => {
    dispatch(setChatClientHistory([]));
    dispatch(
      setTotalHistory({
        total: 0,
        page: 1,
        perPage: 10,
        loading: false,
        hasMore: true,
      })
    );
    setScrollHeight(0);
  }, [chosen]);

  const fetchHisFetchData = () => {
    if (totalHistory.total > histories?.length) {
      setPage(page + 1);
      dispatch(
        setTotalHistory({
          ...totalHistory,
          hasMore: true,
          page: totalHistory.page + 1,
        })
      );
      resChatClientHistory.refetch();
    } else {
      dispatch(
        setTotalHistory({
          ...totalHistory,
          hasMore: false,
        })
      );
    }
  };

  const check = (status: any) => {
    return status === 1 ? (
      <OneCheckIcon />
    ) : status === 2 ? (
      <DoubleCheckIcoon />
    ) : null;
  };

  const histories: any = useAppSelector(
    (state) => state.feedbackPost.histories
  );
  const totalHistory: any = useAppSelector(
    (state) => state.feedbackPost.totalHistory
  );

  useEffect(() => {
    const newArr = histories
      .filter((v: any) =>
        v.chatType === CHAT_TYPES.CLIENT_TO_PARTNER
          ? v.status === 1
            ? v.id
            : null
          : null
      )
      .map((i: any) => i.id);
    if (newArr.length !== 0) {
      readChat.mutate(newArr);
    }
    if (histories.length === totalHistory.total) {
      const last = histories[histories?.length - 1];
      setLastdate(last?.createdAt);
    }
    setData1(data1);
  }, [histories]);

  const findScrollHeight = (e: any) => {
    e.preventDefault();
    setScrollHeight(Math.abs(e.target.scrollTop));
  };

  console.log(histories.length);
  if (width <= 600) {
    return (
      <ChatPlace1>
        {resChatClientHistory.isLoading ? (
          <Spinner />
        ) : histories?.length === 0 ? (
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
            <Messages onScroll={findScrollHeight}>
              <div>
                <div ref={messagesStartRef} />
                <InfiniteScroll
                  dataLength={histories?.length}
                  next={fetchHisFetchData}
                  style={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    overflow: 'hidden',
                  }}
                  inverse={true}
                  scrollThreshold='-1000px'
                  hasMore={totalHistory?.hasMore}
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
                </InfiniteScroll>
                <div ref={messagesEndRef} />
              </div>
            </Messages>
          </>
        )}
      </ChatPlace1>
    );
  } else {
    return (
      <ChatPlace1>
        {resChatClientHistory.isLoading ? (
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
          <>
            {scrollHeight > 0 ? (
              <WrapDownIcon>
                <WrapDown onClick={() => scrollToTop()}>
                  <DownIcon />
                </WrapDown>
              </WrapDownIcon>
            ) : null}
            <Messages id='scrollableDiv' onScroll={findScrollHeight}>
              <div ref={messagesStartRef} />
              <InfiniteScroll
                dataLength={histories?.length}
                next={fetchHisFetchData}
                style={{
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  overflow: 'hidden',
                }}
                inverse={true}
                scrollThreshold='-1000px'
                hasMore={totalHistory?.hasMore}
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
                    <MessageWrap>
                      <Avatar>
                        <LazyLoadImage
                          src={
                            v?.chatType === 1
                              ? data?.image
                                ? data?.image
                                : data?.genderTypeId === 1
                                ? defuserman
                                : data?.genderTypeId === 2
                                ? defuserwoman
                                : App
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
                          {v.chatType === 2 ? check(v.status) : null}
                        </WrapDateMessage>
                        <MessageText type={v.chatType}>{v.msg}</MessageText>
                      </Message>
                    </MessageWrap>
                  );
                })}
              </InfiniteScroll>
              <div ref={messagesEndRef} />
            </Messages>
          </>
        )}
      </ChatPlace1>
    );
  }
};

export default ChatPlace;

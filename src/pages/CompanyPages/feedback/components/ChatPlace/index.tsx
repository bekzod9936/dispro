import { useTranslation } from 'react-i18next';
import useWindowWidth from 'services/hooks/useWindowWidth';
import Spinner from 'components/Custom/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import dayjs from 'dayjs';
import { Avatar } from '../../style';
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
import useHistory from '../../screens/Posts/useHistory';
import { setTotalHistory } from 'services/redux/Slices/feedback';
import { OneCheckIcon, DoubleCheckIcoon } from '../../style';
import App from 'assets/icons/StatistisPage/app.svg';
import useChatClients from '../../screens/Posts/useChatClients';

const ChatPlace = () => {
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const [scrollHeight, setScrollHeight] = useState(0);
  const companyInfo = useAppSelector((state) => state.partner.companyInfo);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { resChatClientHistory, setPage, page } = useHistory();
  const dispatch = useAppDispatch();
  const { scrollToTop, messagesStartRef } = useChatClients();

  const chosen = useAppSelector(
    (state) => state.feedbackPost.chosenListUser?.chosen
  );

  const fetchHisFetchData = () => {
    if (totalHistory.total > histories?.length) {
      setPage(page + 1);
      dispatch(
        setTotalHistory({
          ...totalHistory,
          hasMore: true,
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

  const findScrollHeight = (e: any) => {
    e.preventDefault();
    setScrollHeight(Math.abs(e.target.scrollTop));
  };

  if (width <= 600) {
    return (
      <ChatPlace1>
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
      </ChatPlace1>
    );
  } else {
    return (
      <ChatPlace1>
        {resChatClientHistory.isLoading ? (
          <Spinner />
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
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
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

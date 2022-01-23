import { useState, useRef, useEffect } from "react";
import Dots from "pages/CompanyPages/feedback/components/Dots";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";
import defuserman from "assets/icons/defuserman.png";
import defuserwoman from "assets/icons/defuserwoman.png";
import App from "assets/icons/StatistisPage/app.svg";
import { Controller, useForm } from "react-hook-form";
import Emoji from "pages/CompanyPages/feedback/components/Emoji";
import Input from "components/Custom/Input";
import Button from "components/Custom/Buttons/Button";
import { ruCount } from "../../../hooks/format";
import Spinner from "components/Custom/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import useWindowWidth from "services/hooks/useWindowWidth";
import { IconButton } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import { USER_TYPES } from "services/constants/chat";
import { useQuery } from "react-query";
import { fetchChatClientHistory } from "services/queries/feedbackQuery";
import { setChosenClientChat, setUsers } from "services/redux/Slices/feedback";
import useLayout from "components/Layout/useLayout";
import useRead from "../../../hooks/useRead";
import { CHAT_TYPES, SOCKET_EVENT } from "services/constants/chat";
import dayjs from "dayjs";
import {
  Container,
  WrapUserInfo,
  WrapInfo,
  UserName,
  Body,
  Form,
  ChatPlace1,
  Messages,
  MessageWrap,
  WrapDownIcon,
  Message,
  WrapDown,
  DownIcon,
  WrapDateMessage,
  MessageText,
  MessageDate,
  Divider,
} from "./style";
import { Header } from "../style";
import {
  Status,
  Avatar,
  InputWarn,
  InputDown,
  WrapIcons,
  SmileIcon,
  SendIcon,
  OneCheckIcon,
  DoubleCheckIcoon,
} from "../../../style";
import useUsers from "../useUsers";

interface Props {
  value?: any;
  setCurrentUser?: any;
}

interface FormProps {
  message?: string;
}

const Chat = ({ value, setCurrentUser }: Props) => {
  const words = 400;
  const { t } = useTranslation();
  const { width } = useWindowWidth();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(words);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [lastdate, setLastdate] = useState<any>("");
  const [newMassage, setNewMassage] = useState<any>({});
  const [noValue, setNoValue] = useState(false);
  const socket = useAppSelector((state) => state.feedbackPost.socket);
  const companyInfo = useAppSelector((state) => state.partner.companyInfo);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesStartRef = useRef<HTMLDivElement>(null);
  const staffId = useAppSelector((state) => state.auth.staffId);
  const companyId: any = localStorage.getItem("companyId");
  const users: any = useAppSelector((state) => state.feedbackPost.users);
  const { resBadge } = useLayout({ id: companyId });
  const { readChat } = useRead();
  const { resChatClients } = useUsers();
  const scrollToTop = () => {
    messagesStartRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };
  const { control, handleSubmit, setValue, getValues, watch } =
    useForm<FormProps>({
      mode: "onBlur",
      shouldFocusError: true,
    });
  const values = getValues();

  const resChatClientHistory = useQuery(
    ["getClientChatHistory", value.page],
    () => {
      return fetchChatClientHistory({
        url: `withUserType=${USER_TYPES.CUSTOMER}&withId=${value.id}&page=${value.page}&perPage=15`,
      });
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      retry: 0,
      enabled: false,
      onSuccess: (info) => {
        const newArray = users.map((v: any) => {
          if (value?.id === v.id) {
            const messages =
              (v.total === v?.messages.length && v?.messages.length !== 0) ||
              v.page * 15 === v?.messages.length
                ? v?.messages
                : [...v?.messages, ...info.data.data.histories];
            const value = {
              ...v,
              messages: messages,
              total: info.data.data.totalCount,
            };
            return value;
          } else {
            return v;
          }
        });
        if (info.data.data.totalCount === 0) {
          setNoValue(true);
        } else {
          setNoValue(false);
        }
        dispatch(setUsers(newArray));

        const newArr = info.data.data.histories
          .filter((v: any) =>
            v.chatType === CHAT_TYPES.CLIENT_TO_PARTNER
              ? v.status === 1
                ? v.id
                : null
              : null
          )
          .map((i: any) => i.id);
        if (newArr.length !== 0) {
          readChat.mutate(newArr, {
            onSuccess: () => {
              resBadge.refetch();
              resChatClients.refetch();
            },
          });
        }
      },
    }
  );

  useEffect(() => {
    resChatClientHistory.refetch();
    setValue("message", "");
  }, [value.page, value.id]);

  useEffect(() => {
    if (values?.message !== undefined) {
      setLimit(words - values?.message?.length);
    }
  }, [watch("message")]);

  const avatar = (
    <Avatar big={true}>
      <LazyLoadImage
        alt="image"
        height="100%"
        src={
          value?.info?.image
            ? value?.info?.image
            : value?.info?.genderTypeId === 1
            ? defuserman
            : value?.info?.genderTypeId === 2
            ? defuserwoman
            : App
        }
        width="100%"
        effect="blur"
        style={{ objectFit: "cover" }}
        onError={(e: any) => {
          e.target.onerror = null;
          e.target.src = App;
        }}
      />
    </Avatar>
  );

  const limitwords = (
    <>
      {t("limitfeedback")}

      {` ${limit} ${ruCount({
        count: limit,
        firstWord: "символ",
        secondWord: "символа",
        thirdWord: "символов",
      })}`}
    </>
  );

  useEffect(() => {
    if (value.messages.length === value.total) {
      const last = value.messages[value?.messages.length - 1];
      setLastdate(last?.createdAt);
    }
  }, [value]);

  const status = (
    <Status main={true}>{`${t("status")}: ${
      value?.info?.obtainProgramLoyalty?.levelName
    } ${value?.info?.obtainProgramLoyalty?.percent}%`}</Status>
  );

  const handleShowEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const check = (status: any) => {
    return status === 1 ? (
      <OneCheckIcon />
    ) : status === 2 ? (
      <DoubleCheckIcoon />
    ) : null;
  };

  useEffect(() => {
    socket?.on(SOCKET_EVENT.CHAT_CLIENT_TO_PARTNER, function (message: any) {
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

  const setMessageSuccess = async (data: any) => {
    await dispatch(setUsers(data));
    await scrollToTop();
    await resChatClients.refetch();
  };

  useEffect(() => {
    if (value.id === newMassage?.fromId) {
      const newArray = users.map((v: any) => {
        if (value?.id === v.id) {
          const messages = [newMassage, ...v.messages];
          const value = {
            ...v,
            messages: messages,
            total: v.total + 1,
          };
          return value;
        } else {
          return v;
        }
      });
      dispatch(setUsers(newArray));
      if (CHAT_TYPES.CLIENT_TO_PARTNER === newMassage.chatType) {
        readChat.mutateAsync([newMassage?.id]).then(() => {
          resBadge.refetch();
          resChatClients.refetch();
        });
      }
    }
    if (2 === newMassage?.chatType && newMassage.msg !== "") {
      const newArray = users.map((v: any) => {
        if (value?.id === v.id) {
          const messages = [newMassage, ...v.messages];
          const value = {
            ...v,
            messages: messages,
            total: v.total + 1,
          };
          return value;
        } else {
          return v;
        }
      });
      setMessageSuccess(newArray);
      scrollToTop();
    }
  }, [newMassage]);

  const onSubmit = (e: any) => {
    setLoading(true);
    if (e.message.length > 0 && e?.message.match(/\S/) !== null) {
      socket.emit(
        "chat_to_server",
        {
          langId: 1,
          chatType: 2,
          toId: value?.id,
          fromId: staffId,
          companyId: +companyId,
          data: {
            message: e.message.trim(),
          },
        },
        (res: any) => {
          if (res.success) {
            setValue("message", "");
            setLoading(false);
            setNoValue(false);
            dispatch(setChosenClientChat({ data: undefined, choose: false }));
            setNewMassage({
              chatType: res.data?.chatType,
              companyId: res.data?.datacompanyId,
              createdAt: res.data?.createdAt,
              fromId: res.data?.fromId,
              id: res.data?.id,
              msg: res.data?.msg,
              status: res.data?.status,
              toId: res.data?.toId,
            });
          } else {
            setLoading(false);
          }
        }
      );
    } else {
      setLoading(false);
    }
  };

  const findScrollHeight = (e: any) => {
    e.preventDefault();
    setScrollHeight(Math.abs(e.target.scrollTop));
  };

  const fetchHisFetchData = () => {
    const newUser = users.find((v: any) => v.id === value.id);
    if (!resChatClientHistory.isFetching && !resChatClientHistory.isLoading) {
      if (newUser?.total > newUser?.messages.length) {
        const newArray = users.map((v: any) => {
          if (value?.id === v.id) {
            return {
              ...v,
              page: v?.page + 1,
            };
          } else {
            return v;
          }
        });
        dispatch(setUsers(newArray));
      } else {
        const newArray = users.map((v: any) => {
          if (value?.id === v?.id) {
            return {
              ...v,
              hasMore: false,
            };
          } else {
            return v;
          }
        });
        dispatch(setUsers(newArray));
      }
    }
  };

  return (
    <Container>
      <Header right={true}>
        <WrapUserInfo>
          {avatar}
          <WrapInfo>
            <UserName>
              {`${value?.info?.firstName} ${value?.info?.lastName}`}
            </UserName>
            {status}
          </WrapInfo>
        </WrapUserInfo>
        <Dots id={value.id} setCurrentUser={setCurrentUser} />
      </Header>
      <Body>
        <ChatPlace1>
          {resChatClientHistory.isLoading ? (
            <Spinner />
          ) : noValue ? (
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
              }}
            >
              {t("thereisnomessage")}
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
              <Messages id="scrollableDiv" onScroll={findScrollHeight}>
                <div ref={messagesStartRef} />
                <InfiniteScroll
                  dataLength={value.messages.length}
                  next={fetchHisFetchData}
                  style={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    overflow: "hidden",
                  }}
                  inverse={true}
                  scrollThreshold="-1000px"
                  hasMore={value?.hasMore}
                  loader={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <Spinner />
                    </div>
                  }
                  scrollableTarget="scrollableDiv"
                  endMessage={
                    <Divider>
                      <div>{dayjs(lastdate).format("DD MMMM YYYY")}</div>
                    </Divider>
                  }
                >
                  {value?.messages.map((v: any) => {
                    return (
                      <MessageWrap>
                        <Avatar>
                          <LazyLoadImage
                            src={
                              v.chatType === 1
                                ? value?.info?.image
                                  ? value?.info?.image
                                  : value?.info?.genderTypeId === 1
                                  ? defuserman
                                  : value?.info?.genderTypeId === 2
                                  ? defuserwoman
                                  : App
                                : companyInfo.logo
                            }
                            alt="user"
                            style={{
                              objectFit: "cover",
                            }}
                            height="100%"
                            width="100%"
                            onError={(e: any) => {
                              e.target.onerror = null;
                              e.target.src = App;
                            }}
                          />
                        </Avatar>
                        <Message type={v.chatType}>
                          <WrapDateMessage>
                            <MessageDate type={v.chatType}>
                              {dayjs(v.createdAt).format("HH:mm")}
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="message"
            control={control}
            rules={{
              required: true,
              maxLength: 400,
            }}
            defaultValue=""
            render={({ field }) => (
              <Input
                fullWidth={true}
                multiline={true}
                placeholder={t("writeyoutmessage")}
                inputStyle={{
                  border: "none",
                  inpadding: width > 1500 ? "10px 20px" : "",
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
              <Button type="submit" disabled={loading} startIcon={<SendIcon />}>
                {t("send")}
              </Button>
            </WrapIcons>
          </InputDown>
        </Form>
      </Body>
      {showEmoji ? (
        <Emoji
          value={getValues("message")}
          onSelect={(e) => setValue("message", e)}
          onBlur={() => setShowEmoji(false)}
        />
      ) : null}
    </Container>
  );
};

export default Chat;

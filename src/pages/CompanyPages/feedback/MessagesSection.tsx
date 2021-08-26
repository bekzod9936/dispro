import { Avatar, Input, InputAdornment } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchChatItems, fetchSingleChatItem } from '../../../services/queries/PartnerQueries';
import { Flex } from '../../../styles/BuildingBlocks';
import { ChatItem, ChatList, ChatSpace, ChatWrapper, MessageContainer, Text } from '../../../styles/CustomStyles';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatTextArea } from './ChatTextArea';
import { CHAT_TYPES, SOCKET_EVENT, USER_TYPES } from '../../../services/constants/chat';
import choseChat from "../../../assets/images/choseChat.png"
import { io } from "socket.io-client"
import { useAppDispatch, useAppSelector } from '../../../services/redux/hooks';
import { setSocket } from '../../../services/redux/Slices/FeedbackSlice';
import CustomModal from '../../../components/Custom/CustomModal';
import BlockChatDelete from './BlockChatDelete';
import { makeStyles } from "@material-ui/core"
import { borderRadius } from '@material-ui/system';
import { RedWarning, SearchIcon } from '../../../assets/icons/FeedBackIcons.tsx/FeedbackIcons';
import jwtDecode from 'jwt-decode';
const useStyles = makeStyles({
    input: {
        width: '100%',
        borderRadius: "14px",
        padding: '9px 20px',
        outline: 'none',
        border: 'none',
        background: 'white',
        margin: '5px'
    }
});

const MessagesSection = () => {
    const classes = useStyles();
    const [enableChat, setEnableChat] = useState<boolean>(false);
    const [id, setId] = useState<number>(-1);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [deletionProcess, setDeletionProcess] = useState<string>("");
    const [lastChatType, setLastChatType] = useState();
    const response = useQuery(["chat"], fetchChatItems, {
        onSuccess: (data) => {
            setFirstResponse(data.data.data);
        }
    });
    const [sendingChat, setSendingChat] = useState<string>("");
    const [commingMessage, setCommingMesssage] = useState<any>();
    const [responseRefetch, setResponseRefetch] = useState<number>(0);
    const [firstResponse, setFirstResponse] = useState<any>(null);
    const [secondResponse, setSecondResponse] = useState<any>(null);
    const [chatSendCount, setChatSendCount] = useState<number>(0);
    const [searchText, setSearchText] = useState("");
    const [chatList, setChatList] = useState<any>([]);
    const companyId = localStorage.getItem("companyId");
    const companyToken: any = localStorage.getItem("companyToken");
    const decoded: any = jwtDecode(companyToken)
    const staffId = decoded?.staffId
    // const [socket, setSocket] = useState<any>()
    //const socket: any = useAppSelector(state => state.feedback.socket);
    const responseChatItem = useQuery(["chatItem", id, responseRefetch], () => fetchSingleChatItem(id),
        {
            enabled: id >= 0,
            retry: 0,
            onSuccess: (data) => {
                setEnableChat(false);
                setSecondResponse(data.data.data);
                setChatSendCount(chatSendCount + 1);
                //setChatList([...data?.data?.data?]);
            }
        })
    const socketConnection: any = useAppSelector(state => state.feedback.socket);


    let token = localStorage.getItem("partner_access_token");
    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log(process.env.REACT_APP_WEBSOCKET_URL);
        if (!socketConnection) {

            const socket = io(
                `${process.env.REACT_APP_WEBSOCKET_URL}/nsp_staff_svdfv8732f5rycf76f8732rvuy23cfi77c3u6fr2387frv8237vfidu23vf2vdd7324df4`,
                {
                    path: "/",
                    auth: {
                        token: `Bearer ${token}`,
                    },
                }
            );
            socket.on("connect", (res: any) => {
                console.log(res, "socket");
                dispatch(setSocket(socket));
            })


        }
    }, [])



    useEffect(() => {
        if (socketConnection !== null) {
            socketConnection.on(SOCKET_EVENT.CHAT_CLIENT_TO_PARTNER, (data: any) => {
                setCommingMesssage(data);
                setResponseRefetch(responseRefetch + 1);

            })
        }


    }, [commingMessage])

    useEffect(() => {
        console.log("here useEffect");

        if (socketConnection && sendingChat) {
            console.log('socket here!');
            console.log('sendingChat');

            socketConnection.emit("chat_to_server", {
                langId: 1,
                chatType: 2,
                toId: id,
                fromId: staffId,
                companyId: companyId,
                data: {
                    message: sendingChat
                }
            },
                (res: any) => {
                    console.log("response: ", res);

                    if (res.success) {
                        console.log("success! safasfcsdfsdfc");
                        setResponseRefetch(responseRefetch + 1);
                        setChatSendCount(chatSendCount + 1);
                    }
                }
            )

        }
        return () => {
            setSendingChat("");
        }

    }, [sendingChat])


    return (
        <div style={{ maxHeight: "70vh", width: "100%", paddingRight: "30px", boxSizing: 'border-box', paddingBottom: "15px", flexWrap: "wrap", overflow: "hidden", marginBottom: "15px" }}>
            <MessageContainer >
                <ChatList >
                    <ChatItem style={{ height: "16%" }}>
                        <Input className={classes.input}
                            onChange={(e) => setSearchText(e.target.value)}
                            disableUnderline
                            endAdornment={<InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>}
                        />
                    </ChatItem>
                    {response?.data?.data && response.data.data.data.filter((item: any) => {
                        if (!searchText) {
                            return item.firstName;
                        }
                        else if (searchText) {
                            return `${item.firstName} ${item.lastName}`.match(searchText);
                        }
                    }).map((item: any) => {
                        return (<ChatItem onClick={() => {
                            setId(item.id);
                            setEnableChat(true);
                        }}>
                            <Flex width="100%" justifyContent="start" alignItems="center">
                                <Avatar src={item.image} style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "14px"
                                }} />
                                <div style={{ marginLeft: "20px", display: "flex", alignItems: 'flex-start', flexDirection: "column", flexWrap: "wrap" }}>
                                    <div>
                                        <Text marginLeft="0px" color="#FFFFFF" fontSize="18" fontWeight={500}>
                                            {`${item.firstName}  ${item.lastName}`}
                                        </Text>

                                    </div>
                                    <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", alignItems: "start", textOverflow: "clip", wordBreak: "break-all" }}>
                                        <Text marginLeft="0px" color="#FFFFFF" fontSize="14px" fontWeight={400}>
                                            {item.lastMsg}
                                        </Text>
                                    </div>
                                </div>

                            </Flex>

                        </ChatItem>)
                    })}

                </ChatList>
                <ChatSpace >
                    {(secondResponse) ? (
                        <>
                            <ChatHeader setProcess={setDeletionProcess} setModalVisible={setModalVisible} fullName={firstResponse?.find((item: any) => item.id === id)?.firstName + " " + firstResponse?.find((item: any) => item.id === id)?.lastName
                            } status="Base 5%" src={firstResponse?.find((item: any) => item.id === id)?.image} />

                            <div style={{ width: "100%", display: "flex", flexDirection: "column", padding: "15px 25px", boxSizing: "border-box" }}>
                                <ChatWrapper style={{ minHeight: secondResponse?.histories[secondResponse.histories.length - 1]?.chatType == 2 ? "370px" : "300px" }}>
                                    <Flex justifyContent="end" width="100%" flexDirection="column-reverse" alignItems="flex-start" margin="0px" >
                                        {secondResponse ? secondResponse.histories.map((item: any) => {
                                            return <ChatMessage chatType={item.chatType}
                                                src={firstResponse?.find((value: any) => item.fromId === value.id)?.image}
                                                message={item.msg} />
                                        })
                                            : <h1>hello2</h1>
                                        }

                                    </Flex>
                                </ChatWrapper>
                                <div style={{ boxSizing: "border-box" }}>
                                    {(secondResponse && secondResponse?.histories[secondResponse.histories.length - 1].chatType == 1) ?
                                        <ChatTextArea setSendingChat={setSendingChat} chatSendCount={chatSendCount} /> :
                                        <div style={{ width: "90%", padding: "23px 40px", borderRadius: "14px", background: "#F5F5F5", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <RedWarning />
                                            <div>
                                                <Text
                                                    fontWeight={400}
                                                    marginLeft="29px"
                                                    color="rgba(143, 143, 143, 1)">Вы сможете написать сообщение после того, как клиент ответит вам</Text>
                                            </div>

                                        </div>
                                    }</div>
                            </div>
                        </>
                    ) : <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={choseChat} alt="" />
                    </div>

                    }

                </ChatSpace>
            </MessageContainer>

            <BlockChatDelete setProcess={setDeletionProcess} process={deletionProcess} setModalVisible={setModalVisible} open={modalVisible} />

        </div>
    );
}

export default MessagesSection;

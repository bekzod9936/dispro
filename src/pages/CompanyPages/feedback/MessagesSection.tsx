import { Avatar } from '@material-ui/core';
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



const MessagesSection = () => {
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
            }
        })
    const socketConnection: any = useAppSelector(state => state.feedback.socket);


    let token = localStorage.getItem("companyToken");
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
                console.log(res);
            })
            socket.on("disconnect", (res: any) => {
                console.log(res);

            })

            dispatch(setSocket(socket));

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

            socketConnection.emit("chat_to_server", {
                langId: 1,
                chatType: 2,
                toId: id,
                fromId: 11,
                companyId: 10,
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
        <div style={{ height: "96%", width: "100%", paddingRight: "30px", boxSizing: 'border-box', paddingBottom: "15px", maxHeight: "100%", flexWrap: "wrap", overflow: "hidden" }}>
            <MessageContainer >
                <ChatList>
                    {response?.data?.data && response.data.data.data.map((item: any) => {
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
                <ChatSpace>
                    {(secondResponse) ? (
                        <>
                            <ChatHeader setProcess={setDeletionProcess} setModalVisible={setModalVisible} fullName={secondResponse.} status="Base 5%" src={firstResponse?.find((item: any) => item.id === id)?.image} />

                            <div style={{ width: "100%", flexGrow: 1, display: "flex", flexDirection: "column", padding: "15px 25px", boxSizing: "border-box" }}>
                                <ChatWrapper>
                                    <Flex justifyContent="start" width="100%" flexDirection="column-reverse" alignItems="flex-start" margin="0px" >
                                        {secondResponse ? secondResponse.histories.map((item: any) => {
                                            return <ChatMessage chatType={item.chatType} src={firstResponse?.find((value: any) => item.fromId === value.id)?.image} message={item.msg} />
                                        })
                                            : <h1>hello2</h1>
                                        }

                                    </Flex>
                                </ChatWrapper>
                                <div style={{ boxSizing: "border-box" }}>
                                    <ChatTextArea setSendingChat={setSendingChat} chatSendCount={chatSendCount} />

                                </div>
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

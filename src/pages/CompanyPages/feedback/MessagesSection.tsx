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

import io from "socket.io-client"
import { useAppSelector } from '../../../services/redux/hooks';



const MessagesSection = () => {
    const [enableChat, setEnableChat] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    let token = localStorage.getItem("companyToken");
    const response = useQuery(["chat"], fetchChatItems);
    const [sendingChat, setSendingChat] = useState<string>("");
    const [commingMessage, setCommingMesssage] = useState<any>();
    const [responseRefetch, setResponseRefetch] = useState<number>(0);
    // const [socket, setSocket] = useState<any>()
    const socket: any = useAppSelector(state => state.feedback.socket);
    const responseChatItem = useQuery(["chatItem", id, responseRefetch], () => fetchSingleChatItem(id),
        {
            enabled: enableChat && response?.data?.data?.data && id >= 0,
            retry: 0,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            onSuccess: (data) => {
                setEnableChat(false);
            }
        })





    useEffect(() => {
        if (socket !== null) {
            socket.on(SOCKET_EVENT.CHAT_CLIENT_TO_PARTNER, (data: any) => {
                setCommingMesssage(data);
                setResponseRefetch(responseRefetch + 1);

            })
        }


    }, [commingMessage])

    useEffect(() => {
        console.log("here useEffect");

        if (socket && sendingChat) {
            console.log('socket here!');

            socket.emit("chat_to_server", {
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
                    if (res.success) {
                        console.log("success! safasfcsdfsdfc");
                        setResponseRefetch(responseRefetch + 1);
                    }
                }
            )

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
                    {(response?.data?.data && responseChatItem?.data?.data) && (
                        <>
                            <ChatHeader fullName="Умрзок Тошкентов" status="Base 5%" src={response?.data?.data?.data.find((item: any) => item.id === id)?.image} />

                            <div style={{ width: "100%", height: "100%", flexGrow: 1, display: "flex", flexDirection: "column", padding: "15px 25px", boxSizing: "border-box" }}>
                                <ChatWrapper>
                                    <Flex justifyContent="start" width="100%" flexDirection="column-reverse" alignItems="flex-start" margin="0px" flexGrow="1">
                                        {responseChatItem?.data?.data ? responseChatItem.data.data.data.histories.map((item: any) => {
                                            return <ChatMessage chatType={item.chatType} src={response.data?.data.data.find((value: any) => item.fromId === value.id)?.image} message={item.msg} />
                                        })
                                            : null
                                        }

                                    </Flex>
                                </ChatWrapper>
                                <div style={{ flexGrow: 1, boxSizing: "border-box" }}>
                                    <ChatTextArea setSendingChat={setSendingChat} />

                                </div>
                            </div>
                        </>
                    )

                    }

                </ChatSpace>
            </MessageContainer>

        </div>
    );
}

export default MessagesSection;

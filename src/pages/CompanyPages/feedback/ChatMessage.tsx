import { Avatar } from '@material-ui/core'
import React from 'react'
import { Flex } from '../../../styles/BuildingBlocks'
import { MessageElement } from '../../../styles/Elements'

interface IChatMessage {
    src?: string,
    message?: string,
    chatType?: any
}



export const ChatMessage: React.FC<IChatMessage> = ({ src, message, chatType }) => {
    return (
        <div>
            <Flex justifyContent="start" alignItems="flex-end" margin="0px 0px 25px 0px">
                <Avatar src={src} style={{ width: "50px", height: "50px", borderRadius: "16px" }} />
                <MessageElement chatType={chatType} >
                    {message}
                </MessageElement>
            </Flex>

        </div>
    )
}

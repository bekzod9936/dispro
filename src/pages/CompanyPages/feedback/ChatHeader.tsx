import { Avatar } from '@material-ui/core'
import React from 'react'
import { Flex } from '../../../styles/BuildingBlocks'
import { Text } from "../../../styles/CustomStyles"
interface IChatHeader {
    src?: string,
    fullName?: string,
    status?: string
}
export const ChatHeader: React.FC<IChatHeader> = ({ src, fullName, status }) => {
    return (
        <div style={{ position: "relative", width: "100%", padding: "15px 20px", boxSizing: "border-box", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)" }}>
            <Flex justifyContent="space-between" margin="0px" width="100%">
                <Flex margin="0px">
                    <Avatar src={src} style={{ width: "60px", height: "60px", borderRadius: "14px" }} />
                    <Flex flexDirection="column" alignItems="flex-start" margin="0 0 0 20px">
                        <div>
                            <Text marginLeft="0px" fontSize="18px" fontWeight={500}>{fullName}</Text>
                        </div>
                        <div>
                            <Text marginLeft="0px" fontSize="16px" fontWeight={400} color="#8F8F8F">{status}</Text>
                        </div>
                    </Flex>
                </Flex>
            </Flex>

        </div>
    )
}

import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import { DotIcon } from '../../../assets/icons/FeedBackIcons.tsx/FeedbackIcons'
import { Flex } from '../../../styles/BuildingBlocks'
import { OptionsList, OptionsListItem, Text } from "../../../styles/CustomStyles"
interface IChatHeader {
    src?: string,
    fullName?: string,
    status?: string,
    setModalVisible: any,
    setProcess: any
}
export const ChatHeader: React.FC<IChatHeader> = ({ src, fullName, status, setModalVisible, setProcess }) => {
    const [openOptions, setOpenOptions] = useState<boolean>(false);

    const handleOptionsClick = () => {
        setOpenOptions(!openOptions);
    }

    const handleShareClick = () => {
        setOpenOptions(false);
        console.log("true");

    }
    const handleDeleteChatClick = () => {
        setProcess("assert");
        setModalVisible(true);

        setOpenOptions(false);

    }

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

                <div onClick={handleOptionsClick} style={{ width: "45px", height: "45px", borderRadius: "14px", background: "rgba(96, 110, 234, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ marginRight: "1px", marginLeft: "1px" }}>
                        <DotIcon />
                    </div>
                    <div style={{ marginRight: "1px", marginLeft: "1px" }}>
                        <DotIcon />
                    </div>
                    <div style={{ marginRight: "1px", marginLeft: "1px" }}>
                        <DotIcon />
                    </div>

                </div>

            </Flex>
            {openOptions && <div style={{ position: 'absolute', top: 80, right: 20, zIndex: 2000 }}>
                <OptionsList>

                    <OptionsListItem onClick={handleShareClick
                    }>
                        <Text marginLeft="0px" marginRight="0px" fontSize="16px" fontWeight={400}>
                            Поделиться ссылкой
                        </Text>
                    </OptionsListItem>
                    <OptionsListItem onClick={handleDeleteChatClick}>
                        <Text marginLeft="0px" marginRight="0px" fontSize="16px" fontWeight={400} color="red">
                            Удалить чат
                        </Text>
                    </OptionsListItem>




                </OptionsList>
            </div>
            }

        </div>
    )
}

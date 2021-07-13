import React from 'react';
import { Flex } from "../../../styles/BuildingBlocks"
import operations from "../../../assets/images/operations.png"
import { Text } from "../../../styles/CustomStyles"

const Operations = () => {
    return (
        <>
            <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%" >
                <div style={{ width: "217px", height: "178px", objectFit: "contain" }}><img src={operations} alt="" /></div>
                <div style={{ marginTop: "20px" }}><Text marginLeft="0px" marginRight="0px" fontSize="17" fontWeight={400}>
                    Тут будут отображаться все операции клиента
                </Text></div>
            </Flex>
        </>
    );
}

export default Operations;

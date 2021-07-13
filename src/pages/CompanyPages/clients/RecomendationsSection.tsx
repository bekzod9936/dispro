import React from 'react';
import { Flex } from '../../../styles/BuildingBlocks';
import { Text } from '../../../styles/CustomStyles';
import recomendations from "../../../assets/images/recomendations.png"
const RecomendationsSection = () => {
    return (
        <div>
            <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%" >
                <div style={{ width: "217px", height: "178px", objectFit: "contain" }}><img src={recomendations} alt="" /></div>
                <div style={{ marginTop: "20px" }}><Text marginLeft="0px" marginRight="0px" fontSize="17" fontWeight={400}>
                    Тут будут отображаться все рекомендации клиента
                </Text>
                </div>
            </Flex>
        </div>
    );
}

export default RecomendationsSection;

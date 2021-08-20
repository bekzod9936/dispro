import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flex } from '../../../styles/BuildingBlocks';
import { Text } from "../../../styles/CustomStyles"
interface ISingleStatisticsItem {
    title: string,
    Icon?: () => JSX.Element,
    quantity?: number,
    percent?: number,
}

const SingleStatisticsItem: React.FC<ISingleStatisticsItem> = ({ title, Icon, quantity, percent }) => {
    const { t } = useTranslation();
    return (
        <>
            <Flex justifyContent="start" width="100%" alignItems="center"   >
                <div style={{ height: "40px", width: "23%" }}>
                    {Icon && <Icon />}
                </div>

                <Flex margin="0px" flexDirection="column" justifyContent="space-evenly" alignItems="flex-start">
                    <Text marginLeft={title !== "ageAvg" ? "0px" : "15px"} fontSize="18px" fontWeight={500}>{t(title)}</Text>
                    <Text fontSize="26px" marginLeft={title !== "ageAvg" ? "0px" : "15px"} fontWeight={700} color="#606EEA" lineHeight="30px">{quantity?.toLocaleString()}</Text>
                    <Text></Text>
                </Flex>

            </Flex>
        </>
    );
}

export default SingleStatisticsItem;

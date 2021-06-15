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
            <Flex justifyContent="space-between" width="100%" alignItems="center"   >
                <div style={{ height: "40px", width: "40px" }}>
                    {Icon && <Icon />}
                </div>

                <Flex flexDirection="column" justifyContent="space-evenly" alignItems="flex-start">
                    <Text fontSize="18px" fontWeight={500}>{t(title)}</Text>
                    <Text fontSize="26px" fontWeight={700} color="#606EEA" lineHeight="30px">{quantity?.toLocaleString()}</Text>
                    <Text></Text>
                </Flex>

            </Flex>
        </>
    );
}

export default SingleStatisticsItem;

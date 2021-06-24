import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { XIcon } from '../../../assets/icons/ClientStatisticsIcons/Filters';
import { Flex } from '../../../styles/BuildingBlocks';
import { InlineFilterWrapper, Text } from "../../../styles/CustomStyles";
interface IProps {
    filterItems: any
    handleClose: any
}
const InlineFilters: React.FC<IProps> = ({ filterItems, handleClose }) => {
    const { t } = useTranslation();
    return (
        <Flex justifyContent="start" margin="0px 0px 15px 0px" >
            {Object.keys(filterItems).filter((item) => {
                return filterItems[item] !== null && filterItems[item] !== "" && typeof filterItems[item] !== "boolean" && filterItems[item] !== 0 && filterItems[item] !== undefined
            }).map((item, index, formedArray) => {
                return <InlineFilterWrapper >
                    <Text marginRight="0px" marginLeft="10px" fontSize="14px" fontWeight={300}>{t(item)}</Text>:<Text marginLeft="0px" marginRight="15px" fontSize="14px" fontWeight={300}>{
                        item.toLocaleLowerCase().includes("date") ? moment(filterItems[item]).format("YYYY-MM-DD") : t(filterItems[item])}</Text>
                    <div onClick={() => { handleClose(item) }}><XIcon /></div>
                </InlineFilterWrapper>
            })}
        </Flex>
    );
}

export default InlineFilters;

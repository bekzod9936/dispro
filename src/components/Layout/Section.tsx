import React from 'react';
import { Flex } from '../../styles/BuildingBlocks';
import { Text } from "../../styles/CustomStyles"
export interface ISectionItem {
    Icon: () => JSX.Element;
    title: string;
    extra: string;
}

const SectionItem: React.FC<ISectionItem> = ({ Icon, title, extra }) => {
    return (

        <Flex justifyContent="space-evenly" alignItems="center" flexDirection="row" flexWrap="wrap" width="100%" height="40px">
            <div><Icon /></div>
            <Flex flexDirection="column" height="inherit" flexWrap="wrap" alignItems="baseline">
                <div>
                    <span style={{ fontFamily: "Roboto", fontWeight: 700, fontSize: "16px" }}>{title}</span></div>
                <div><span style={{ fontFamily: "Roboto", fontWeight: 500, fontSize: "14px" }}>{extra}</span></div>
            </Flex>

        </Flex>


    );
}

export default SectionItem;

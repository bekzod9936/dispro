import { Grid } from '@material-ui/core';
import React from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import { Flex, GridContainer, GridItem } from '../../styles/BuildingBlocks';
import PartnerHeader from './PartnerHeader';
import PartnerSidebar from './PartnerSidebar';
interface IDefaultLayout {
    children: any
}
const DefaultLayoutAdmin: React.FC<IDefaultLayout> = ({ children }) => {
    const history = useHistory();
    return (
        <Flex width="100vw" height="100vh" justifyContent="start" alignItems="flex-start">
            <div style={{ width: "fit-content" }}>
                <PartnerSidebar />
            </div>
            <Flex flexDirection="column" height="100%" flexGrow="1">
                <div style={{ width: "100%" }}>
                    <PartnerHeader />
                </div>
                <div style={{ flexGrow: 1, background: "#F4F4F4", width: "100%" }}>
                    {children}
                </div>
            </Flex>

        </Flex>


    );
}

export default React.memo(DefaultLayoutAdmin);

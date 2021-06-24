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
        <GridContainer gridTemplateColumns="1fr 8fr">
            <GridItem gridRow="1/7">
                <PartnerSidebar />
            </GridItem>
            <GridItem gridRow="1/7" gridCoulumn="2/ span 5">
                <GridContainer gridTemplateRows="90px 100vmax">
                    <GridItem gridCoulumn="1/7" >
                        <PartnerHeader />
                    </GridItem>
                    <GridItem background="#F1F4F6" gridRow="1/7">
                        {children}
                    </GridItem>
                </GridContainer>
            </GridItem>
        </GridContainer>


    );
}

export default React.memo(DefaultLayoutAdmin);

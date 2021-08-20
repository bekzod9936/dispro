import { Grid } from '@material-ui/core';
import React from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import { WarningIcon } from '../../assets/icons/Others/LayoutIcons';
import { Flex, GridContainer, GridItem } from '../../styles/BuildingBlocks';
import PartnerHeader from './PartnerHeader';
import PartnerSidebar from './PartnerSidebar';
import { Text } from '../../styles/CustomStyles'
import { FONT_SIZE } from '../../services/Types/enums';
import { useAppSelector } from '../../services/redux/hooks';
export interface IDefaultLayout {
    children: any
}
const DefaultLayoutAdmin: React.FC<IDefaultLayout> = ({ children }) => {
    const history = useHistory();
    const companyState = useAppSelector(state => state.auth.companyState);
    return (
        <Flex width="100vw" height="100vh" justifyContent="start" alignItems="flex-start">
            <div style={{
                width: "fit-content", pointerEvents: companyState === "new" ? "none" : "auto",
                opacity: companyState === "new" ? 0.4 : 1
            }} >
                <PartnerSidebar />
            </div>
            <Flex flexDirection="column" height="100%" flexGrow="1">
                <div style={{
                    width: "100%", padding: companyState === "new" ? "10px" : "0px",
                    display: "flex", justifyContent: "center", alignItems: "center"
                }}>
                    {companyState === 'new' ? <div style={{
                        padding: "18px 0px",
                        width: "90%",
                        alignSelf: 'center',
                        borderRadius: '14px',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "0px 4px 4px #f4f4f4"
                    }} >
                        <WarningIcon />
                        <Text marginLeft="10px" fontSize={FONT_SIZE.mediumPlus} fontWeight={300} >
                            Для дальнейшего использования нашего сервиса,
                            пожалуйста заполните данные в разделах
                            “О компании” и “Адреса”
                        </Text>
                    </div> :
                        <PartnerHeader />
                    }
                </div>
                <div style={{ flexGrow: 1, background: "#F4F4F4", width: "100%" }}>
                    {children}
                </div>
            </Flex>

        </Flex>


    );
}

export default React.memo(DefaultLayoutAdmin);

import React from 'react';
import { useTranslation } from 'react-i18next';
import HamburgerIcon from '../../assets/icons/HamburgerIcon';
import { useAppDispatch, useAppSelector } from '../../services/redux/hooks';
import { setCurrentPage } from '../../services/redux/Slices/partnerSlice';
import { COLORS } from '../../services/Types/enums';
import { SideBarMenuItem } from '../../styles/CustomStyles';
import { Text } from "../../styles/CustomStyles"
interface ISingleMenuItem {
    Icon: () => JSX.Element,
    text: string,
    lineHeight?: string,
    textSize?: string,
    padding?: string,
    margin?: string,
    handleClick?: any
}

const SingleMenuItem: React.FC<ISingleMenuItem> = ({ Icon, text, lineHeight, textSize, handleClick }) => {
    const currentPage = useAppSelector(state => state.partner.currentPage);
    const { t } = useTranslation();

    return (
        <SideBarMenuItem text={text} onClick={handleClick} style={{ position: "relative", background: currentPage === text ? "rgba(96, 110, 234, 0.1)" : "white" }}>
            <Icon />
            <Text marginLeft="15px" fontSize={textSize} lineHeight={lineHeight}>{t(text)}</Text>
            {currentPage === text && <div style={{
                height: "100%", borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", width: "10px",
                background: COLORS.purple, position: "absolute", right: 0
            }}>
            </div>}
            {text === "DIS - COUNT" && <HamburgerIcon />}
        </SideBarMenuItem>
    );
}

export default SingleMenuItem;

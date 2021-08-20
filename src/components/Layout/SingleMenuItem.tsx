import React from 'react';
import HamburgerIcon from '../../assets/icons/HamburgerIcon';
import { useAppDispatch, useAppSelector } from '../../services/redux/hooks';
import { setCurrentPage } from '../../services/redux/Slices/partnerSlice';
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



    return (
        <SideBarMenuItem text={text} onClick={handleClick}>
            <Icon />
            <Text marginLeft="15px" fontSize={textSize} lineHeight={lineHeight}>{text}</Text>

            {text === "Dis - count" && <HamburgerIcon />}
        </SideBarMenuItem>
    );
}

export default SingleMenuItem;

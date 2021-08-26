import { Drawer } from '@material-ui/core';
import React, { useCallback } from 'react';
import { SideBarConstants } from '../../services/constants/LayoutConstatns';
import CustomSideDrawer from '../Custom/CustomSideDrawer';
import MenuItems from './MenuItems';
import SingleMenuItem from './SingleMenuItem';
import DisIcon from '../../assets/icons/DisIcon';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/redux/hooks';
import { setCurrentPage } from '../../services/redux/Slices/partnerSlice';
const PartnerSidebar = () => {
    const history = useHistory();
    const currentPage = useAppSelector((state) => {
        return state.partner.currentPage
    })
    const dispatch = useAppDispatch();
    const handleMenuClick = (value: string) => {
        history.push(`/${value}`);
        dispatch(setCurrentPage(value));


    }

    return (
        <CustomSideDrawer>
            <SingleMenuItem Icon={DisIcon} text={"DIS - COUNT"} textSize="18px" lineHeight="21px" />
            <MenuItems handleClick={handleMenuClick} />
            <SingleMenuItem handleClick={() => handleMenuClick("settings")} Icon={SettingsIcon} text={"settings"} />
        </CustomSideDrawer>
    );
}

export default React.memo(PartnerSidebar);

import React from 'react';
import StaffIcon from '../../assets/icons/StaffIcon';
import NewsIcon from '../../assets/icons/NewsIcon';
import ClientsIcon from '../../assets/icons/ClientsIcon';
import OrdersIcon from '../../assets/icons/OrdersIcon';
import ServicesIcon from '../../assets/icons/ServicesIcon';
import ProposalsIcon from '../../assets/icons/ProposalsIcon';
import StatisticsIcon from '../../assets/icons/StatisticsIcon';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import NotificationsIcon from '../../assets/icons/Notifications';
import FinancesIcon from '../../assets/icons/FinancesIcon';
import FeedbackIcon from '../../assets/icons/FeedbackIcon';
import DisIcon from '../../assets/icons/DisIcon';
import InfoIcon from '../../assets/icons/InfoIcon';
import { CustomMenu, SideBarMenuItem } from '../../styles/CustomStyles';
import { Typography } from '@material-ui/core';
import SingleMenuItem from "./SingleMenuItem";
import { Link, NavLink } from 'react-router-dom';

interface IMenuItem {
    icon: () => JSX.Element,
    text: string,
    key: string,
}
interface IProps {
    handleClick: (value: string) => void
}

const MenuItems: React.FC<IProps> = ({ handleClick }) => {
    const MenuItemsArray: IMenuItem[] = [
        {
            icon: StatisticsIcon,
            text: "Статистика",
            key: "statistics",

        },
        {
            icon: ClientsIcon,
            text: "Клиенты",
            key: "clients",
        },
        {
            icon: OrdersIcon,
            text: "Заказы",
            key: "orders"
        },
        {
            icon: FeedbackIcon,
            text: "Обратная связь",
            key: "feedback",
        },
        {
            icon: ServicesIcon,
            text: "Товары и услуги",
            key: "services",
        },
        {
            icon: NewsIcon,
            text: "Новости",
            key: "news",
        },
        {
            icon: StaffIcon,
            text: "Сотрудники",
            key: "staff",
        },
        {
            icon: ProposalsIcon,
            text: "Спецпредложения",
            key: "proposals"
        },
        {
            icon: FinancesIcon,
            text: "Финансы",
            key: "finances",
        },
        {
            icon: NotificationsIcon,
            text: "Уведомаления",
            key: "notifications"
        },
        {
            icon: InfoIcon,
            text: "Информация",
            key: "info"
        },

    ]
    //handleClick={() => handleClick(item.key)}
    return (
        <CustomMenu>
            {MenuItemsArray.map((item: IMenuItem) => {
                // return <Link to={{ pathname: "/" + item.key }} style={{ textDecoration: "none", color: "black" }}>
                return <SingleMenuItem Icon={item.icon} text={item.text} handleClick={() => handleClick(item.key)} />
                // </Link>

            })}
        </CustomMenu>
    );
}

export default MenuItems;

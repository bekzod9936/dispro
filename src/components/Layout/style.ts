import styled, { css } from 'styled-components';
import { device } from '../../styles/device';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { SwipeableDrawer } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { ReactComponent as Hamburgermenu } from '../../assets/icons/SideBar/hamburgermenu.svg';
import { ReactComponent as Setting } from '../../assets/icons/SideBar/setting.svg';
import { ReactComponent as Statistics } from '../../assets/icons/SideBar/statistics.svg';
import { ReactComponent as Client } from '../../assets/icons/SideBar/client.svg';
import { ReactComponent as Order } from '../../assets/icons/SideBar/order.svg';
import { ReactComponent as Conversation } from '../../assets/icons/SideBar/conversation.svg';
import { ReactComponent as Basket } from '../../assets/icons/SideBar/basket.svg';
import { ReactComponent as News } from '../../assets/icons/SideBar/news.svg';
import { ReactComponent as Workers } from '../../assets/icons/SideBar/workers.svg';
import { ReactComponent as Prize } from '../../assets/icons/SideBar/prize.svg';
import { ReactComponent as Coin } from '../../assets/icons/SideBar/coin.svg';
import { ReactComponent as Notification } from '../../assets/icons/SideBar/notification.svg';
import { ReactComponent as Information } from '../../assets/icons/SideBar/information.svg';
import { ReactComponent as Warn } from 'assets/icons/SideBar/warning.svg';

const commonMedia = css`
  width: 29px;
  height: 29px;
  margin-right: 40px;
  @media (max-width: ${device.mobile}) {
    width: 22px;
    height: 22px;
    margin-right: 15px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    width: 24px;
    height: 24px;
  }
`;

const ListBorder = css`
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 10px;
    height: 100%;
    background: #606eea;
    border-radius: 6px 0px 0px 6px;
  }
`;

export const StatisticsIcon = styled(Statistics)`
  ${commonMedia}
`;
export const ClientIcon = styled(Client)`
  ${commonMedia}
`;
export const OrderIcon = styled(Order)`
  ${commonMedia}
`;
export const ConversationIcon = styled(Conversation)`
  ${commonMedia}
`;
export const BasketIcon = styled(Basket)`
  ${commonMedia}
`;
export const NewsIcon = styled(News)`
  ${commonMedia}
`;
export const WorkersIcon = styled(Workers)`
  ${commonMedia}
`;
export const PrizeIcon = styled(Prize)`
  ${commonMedia}
`;
export const CoinIcon = styled(Coin)`
  ${commonMedia}
`;
export const NotificationIcon = styled(Notification)`
  ${commonMedia}
`;
export const InformationIcon = styled(Information)`
  ${commonMedia}
`;
export const SettingIcon = styled(Setting)`
  ${commonMedia}
`;

export const MenuIcon = styled(Hamburgermenu)`
  width: 46px;
  height: 46px;
  @media (max-width: ${device.laptop}) {
    width: 40px;
    height: 40px;
  }
`;

export const LogoIcon = styled.img`
  width: 60px;
  height: 33px;
  min-width: 60px;
  min-height: 33px;
  max-width: 60px;
  max-height: 33px;
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  color: #223367;
  margin-left: 20px;
  @media (max-width: ${device.mobile}) {
    font-size: 12px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    font-size: 15px;
  }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  .makeStyles-toolbar-9 {
    min-height: 65px !important;
  }
  @media (min-width: ${device.laptop}) {
    .makeStyles-toolbar-9 {
      min-height: 90px !important;
    }
  }
  .MuiToolbar-gutters {
    padding: 0 !important;
  }
`;

export const Content = styled.div`
  overflow: hidden;
  height: calc(100% - 65px);
  @media (min-width: ${device.laptop}) {
    height: calc(100% - 90px);
  }
`;

export const WrapperPage = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-color: #f1f4f6;
  .makeStyles-toolbar-9 {
    min-height: 65px !important;
  }

  @media (min-width: ${device.laptop}) {
    .makeStyles-toolbar-9 {
      min-height: 90px !important;
    }
  }
`;

export const WrapLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WrapList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .MuiButtonBase-root {
    padding: 10px 0 10px 37px !important;
  }
  & > ul:first-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  @media (min-height: 800px) {
    & > ul:first-child {
      margin-top: 50px;
    }
  }
`;

export const ListText = styled(ListItemText)`
  .MuiTypography-root {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    color: #223367;
  }
`;

export const ListI = styled(ListItem)`
  background-color: ${({ selected }: any) =>
    selected ? 'rgba(96, 110, 234, 0.1)' : 'white'} !important;
  ${({ selected }: any) => (selected ? ListBorder : null)};
`;

export const DesktopDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    &::-webkit-scrollbar {
      appearance: none;
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      appearance: none;
      display: none;
    }

    &::-webkit-scrollbar-track {
      appearance: none;
      display: none;
    }
  }
  .css-cveggr-MuiListItemIcon-root {
    min-width: fit-content !important;
    width: fit-content !important;
  }
  .MuiDrawer-paperAnchorDockedLeft {
    border-right: none !important;
  }

  & > div.MuiPaper-root {
    box-shadow: 5px 0px 20px rgba(0, 0, 0, 0.06);
  }
  .makeStyles-toolbar-9 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 15px 0 20px;
  }
  @media (max-width: ${device.mobile}) {
    display: none;
  }
`;

export const MobileDrawer = styled(SwipeableDrawer)`
  & > div.MuiPaper-root {
    &::-webkit-scrollbar {
      appearance: none;
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      appearance: none;
      display: none;
    }

    &::-webkit-scrollbar-track {
      appearance: none;
      display: none;
    }
  }
  @media (min-width: ${device.mobile}) {
    display: none;
  }
  & > div > div {
    width: 260px !important;
  }
`;

export const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 15px 0 20px;
`;

export const WrapMenu = styled.div``;

export const Wrarning = styled.div`
  width: 100%;
  height: 80%;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  color: #223367;
  background: #ffffff;
  font-size: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media (min-width: ${device.planshet}) {
    padding: 0 15px;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: 16px;
  }
  @media (max-width: ${device.planshet}) and (min-width: ${device.mobile}) {
    font-size: 15px;
    height: 100%;
    text-align: center;
    box-shadow: none;
    flex-direction: column;
    margin-top: 20px;
  }
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
    flex-direction: column;
    height: 100%;
    text-align: center;
    box-shadow: none;
    flex-direction: column;
    margin-top: 20px;
  }
`;

export const WranningIcon = styled(Warn)`
  min-width: 32px;
  min-height: 30px;
  @media (min-width: ${device.planshet}) {
    margin-right: 20px;
  }
`;

import styled from 'styled-components';
import { Map } from 'react-yandex-maps';
import { device } from '../../../../styles/device';
import { ReactComponent as Save } from '../../../../assets/icons/IconsInfo/save.svg';
import { ReactComponent as Plus } from '../../../../assets/icons/IconsInfo/plus.svg';
import { ReactComponent as Search } from '../../../../assets/icons/SideBar/search.svg';
import { ReactComponent as Close } from '../../../../assets/icons/IconsInfo/close.svg';

export const MapYandex = styled(Map)`
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.04));
  border-radius: 14px !important;
  background-color: white;
`;

export const SaveIcon = styled(Save)`
  margin-right: 15px;
`;

export const PlusIcon = styled(Plus)`
  margin-right: 15px;
`;

export const CloseIcon = styled(Close)`
  margin: 5px;
`;

export const SearchIcon = styled(Search)`
  width: 24px;
  height: 24px;
  margin-left: 20px;
  @media (min-width: ${device.laptop}) {
    width: 28px;
    height: 28px;
    margin-left: 30px;
  }
`;

export const Container = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Form = styled.form`
  width: 48%;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px 14px 0 0;
  padding: 30px 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  @media (max-width: ${device.mobile}) {
    width: 100%;
    padding: 0;
  }
`;

export const WrapHeader = styled.div`
  display: flex;
  white-space: nowrap;
`;

export const LeftSide = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 10% 30px;
  width: 100%;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
  @media (max-width: ${device.mobile}) {
    padding: 0 15px 30px;
  }
`;

export const Rightside = styled.div`
  width: 48%;
  height: 95%;
  border-radius: 14px !important;
  background-color: white;
  @media (max-width: ${device.mobile}) {
    display: none;
  }
`;

export const Label = styled.label`
  font-weight: 300;
  font-size: 16px;
  user-select: none;
  color: #223367;
  cursor: pointer;
`;

export const YandexContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 14px;
  border: 1px solid #c4c4c4;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.04));
  overflow: hidden;
  position: relative;
`;

export const MobileMap = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 14px;
  border: 1px solid #c4c4c4;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.04));
  overflow: hidden;
  margin-bottom: 20px;
  @media (min-width: ${device.mobile}) {
    display: none;
  }
`;

export const WrapClose = styled.div`
  padding: 0 10% 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WrapContent = styled.div`
  margin-top: 25px;
  overflow-y: auto;
  width: 100%;
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
`;

export const AddressInfo = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin: 20px 0;
  width: 100%;
`;

export const Text1 = styled.div`
  font-weight: normal;
  font-size: 16px;
  color: #223367;
  @media (max-width: ${device.mobile}) {
    font-size: 16px;
  }
`;

export const Left = styled.div``;

export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Number = styled.div`
  font-weight: normal;
  font-size: 14px;
  color: #223367;
`;

export const AddWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  overflow: hidden;
  @media (max-width: ${device.mobile}) {
    width: 100%;
  }
`;

export const Img = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  z-index: 1000;
`;

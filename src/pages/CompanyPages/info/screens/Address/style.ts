import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Plus } from 'assets/icons/IconsInfo/plus.svg';
import { ReactComponent as Search } from 'assets/icons/SideBar/search.svg';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';
import { ReactComponent as Delete } from 'assets/icons/IconsInfo/deleteword.svg';

interface Props {
  visable?: boolean;
}

export const Ul = styled.ul`
  background-color: white;
  position: absolute;
  top: 100%;
  z-index: 99;
  width: 100%;
  border-radius: 10px;
  border: 1px solid lightgray;
  display: ${({ visable }: Props) => (visable ? 'block' : 'none')};
`;

export const Li = styled.li`
  list-style: none;
  cursor: pointer;
  font-weight: normal;
  font-size: 16px;
  color: #223367;
  padding: 5px 0 5px 20px;

  :hover {
    background-color: rgba(96, 110, 234, 0.1);
  }
`;

export const DeleteIcon = styled(Delete)``;

export const PlusIcon = styled(Plus)`
  margin-right: 15px;
  width: 22px;
  height: 22px;
  @media (max-width: ${device.mobile}) {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
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
  @media (max-width: ${device.mobile}) {
    width: 18px;
    height: 18px;
    margin-left: 15px;
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
    border-radius: 0;
  }
`;

export const WrapHeader = styled.div`
  display: flex;
  white-space: nowrap;
  @media (max-width: ${device.mobile}) {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
  }
`;

export const WrapInput = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: ${device.mobile}) {
    grid-row: 1/1;
  }
`;

export const WrapAddress = styled.div`
  width: 100%;
`;

export const WrapSearch = styled.div`
  position: relative;
  width: 100%;
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

  &::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }

  @media (max-width: ${device.mobile}) {
    padding: 0 15px 10px;
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

interface YProps {
  bcolor?: boolean;
}

export const YandexContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 14px;
  border: ${({ bcolor }: YProps) =>
    bcolor ? '2px solid #FF5E68' : '1px solid #c4c4c4'};
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
  @media (max-width: ${device.mobile}) {
    height: 300px;
  }
`;

export const WrapClose = styled.div`
  padding: 0 10% 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${device.mobile}) {
    display: none;
  }
`;

export const WrapContent = styled.div`
  margin-top: 25px;
  width: 100%;

  @media (max-width: ${device.mobile}) {
    margin-top: 15px;
    padding: 0 20px;
    overflow-y: hidden;
  }
  @media (min-width: ${device.mobile}) {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    scroll-behavior: auto;
    :hover {
      ::-webkit-scrollbar-thumb {
        background: #606eea;
      }
    }
    ::-webkit-scrollbar {
      width: 7px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 14px;
      background: transparent;
    }
  }
`;

export const AddressInfo = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px;
  margin: 0 0 20px;
  width: 100%;
  cursor: pointer;
  @media (max-width: ${device.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

export const Text1 = styled.div`
  font-weight: normal;
  font-size: 16px;
  color: #223367;

  @media (max-width: ${device.mobile}) {
    font-size: 16px;
  }
`;

export const Left = styled.div`
  width: 60%;
  @media (max-width: ${device.mobile}) {
    width: 100%;
  }
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-row-gap: 7px;
  flex: 1;
  height: 100%;
  @media (max-width: ${device.mobile}) {
    flex-direction: row;
    grid-column-gap: 15px;
    flex-wrap: wrap;
    margin-top: 15px;
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const Number = styled.div`
  font-weight: normal;
  font-size: 14px;
  color: #223367;
  align-self: center;
  width: 100%;
  text-align: end;
  @media (max-width: ${device.mobile}) {
    width: fit-content;
    align-self: flex-start;
  }
`;

export const AddWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  overflow: hidden;

  @media (min-width: ${device.mobile}) {
    flex: 1;
    width: 48%;
    margin-right: 20px;
    & > div {
      overflow: hidden;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }
  @media (max-width: ${device.mobile}) {
    width: 100%;
    & > div {
      overflow-y: auto;
      scroll-behavior: auto;
      &:hover {
        ::-webkit-scrollbar-thumb {
          background: #606eea;
        }
      }
      ::-webkit-scrollbar {
        width: 7px;
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: transparent;
        border-radius: 14px 0 0 14px;
      }
    }
  }
`;

export const ButtonsWrap = styled.div`
  display: flex;

  background-color: white;
  @media (max-width: ${device.mobile}) {
    align-items: center;
    justify-content: center;
    border-top: 1px solid rgba(96, 110, 234, 0.3);
    margin-top: 20px;
    max-height: 65px;
    display: none;
  }
`;

export const WrapLocationAddress = styled.div`
  & > span {
    color: black;
    font-weight: bold;
    font-size: 16px;
    margin: 5px 0;
  }
`;

export const NoResult = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-weight: normal;
  font-size: 16px;
  color: #223367;
`;

export const Message = styled.div`
  font-weight: 300;
  color: #ff5e68;
  overflow-wrap: normal;
  margin-top: 5px;
  font-size: 14px;

  @media (max-width: ${device.mobile}) {
    font-size: 14px;
    margin-top: 3px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: 14px;
    margin-top: 3px;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: 14px;

    margin-top: 3px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
    margin-top: 5px;
  }
`;

export const DownSide = styled.div`
  display: none;
  @media (max-width: ${device.mobile}) {
    display: flex;
    background-color: white;
    min-height: 65px;
    border-top: 1px solid rgba(96, 110, 234, 0.3);
    & > div {
      display: flex;
      width: 100%;
      align-items: center;
      height: 100%;
      justify-content: center;
      grid-gap: 10px;
      overflow: hidden !important;
      min-height: 65px;
      padding: 0 15px;
    }
  }
`;

import styled from 'styled-components';
import { device } from '../../../styles/device';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';

export const CloseIcon = styled(Close)``;

export const WrapIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 5px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  :hover {
    background-color: #ddd;
  }
`;

export const Container = styled.div`
  padding: 25px 0 0 25px;
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
`;

export const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  height: 300px;
  min-width: 300px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const CardImg = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 14px;
`;

export const TitleCard = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #223367;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const Text = styled.p`
  font-weight: normal;
  font-size: 12px;
  color: #223367;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  @media (min-width: ${device.laptop}) {
    font-size: 14px;
  }
`;

export const Date = styled.div`
  font-weight: normal;
  font-size: 11px;
  color: #8f8f8f;
  @media (min-width: ${device.laptop}) {
    font-size: 12px;
  }
`;

export const CardBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  padding: 0 20px;
  background-color: ${({ open }: Props) => (open ? '#eff0fd' : 'white')};

  border-radius: 0 0 14px 14px;
`;

export const WrapTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const WrapPag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

export const Info = styled.div`
  color: #223367;
  font-size: 18px;
  span {
    font-weight: 900;
    margin: 0px 5px;
    font-size: 18px;
  }
`;

export const WrapperCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  grid-gap: 20px;
  @media (min-width: ${device.laptop}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 30px;
  }
  & > :hover {
    box-shadow: 4px 4px 10px grey;
  }
  border-radius: 14px;
`;

export const Wrap = styled.div`
  overflow-y: auto;
  margin-top: 25px;
  padding-right: 25px;
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
`;

export const SideImgWrap = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  @media (min-width: ${device.laptop}) {
    height: 300px;
  }
`;

export const SideText = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const WrapScroll = styled.div`
  overflow-y: auto;
  padding-right: 25px;
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
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px 25px;
  justify-content: space-between;
`;
interface Props {
  open?: boolean;
}

export const SideDrawer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  width: ${({ open }: Props) => (open ? '30%' : '0')};
  background: white;
  box-shadow: -5px 2px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  -webkit-transition: width 0.3s;
  transition: width 0.3s;
`;

export const WrapButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 30px 0;
`;

export const WrapInfoBox = styled.div``;

export const WrapDefault = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  height: 100%;
  width: 100%;
  & > img {
    width: 30%;
    height: 50%;
  }
  & > span {
    margin-top: 30px;
    font-size: 18px;
    color: #223367;
  }
`;

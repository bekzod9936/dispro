import styled from 'styled-components';
import { device } from '../../../styles/device';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';
import { ReactComponent as Message } from 'assets/icons/message.svg';

export const MessageIcon = styled(Message)`
  width: 24px;
  height: 24px;
  @media (max-width: ${device.mobile}) {
    width: 18px;
    height: 18px;
  }
`;

export const CloseIcon = styled(Close)`
  width: 18px;
  height: 18px;
  @media (max-width: ${device.mobile}) {
    width: 15px;
    height: 15px;
  }
`;

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
  @media (max-width: ${device.mobile}) {
    width: 33px;
    height: 33px;
    top: 10px;
  }
`;

export const Container = styled.div`
  padding: 25px 0 0 25px;
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
  @media (max-width: ${device.mobile}) {
    padding: 15px 0 0 15px;
  }
`;

export const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  height: 300px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  &:hover {
    box-shadow: 0px 10px 14px rgba(0, 0, 0, 0.08);
  }
`;

export const CardImg = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

export const TitleCard = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: #223367;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

export const Date1 = styled.div`
  font-weight: normal;
  font-size: 11px;
  color: #8f8f8f;
  white-space: nowrap;
  margin-left: 10px;
  @media (min-width: ${device.laptop}) {
    font-size: 12px;
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px 20px;
  background-color: ${({ open }: Props) => (open ? '#eff0fd' : 'white')};
  border-radius: 0 0 14px 14px;
  @media (max-width: ${device.mobile}) {
    padding: 10px;
  }
`;

export const WrapTitle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  grid-column-gap: 10px;
`;

export const Titletext = styled.div`
  width: 80%;
  font-weight: bold;
  font-size: 14px;
  color: #223367;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const WrapPag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  @media (max-width: ${device.mobile}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const Info = styled.div`
  color: #223367;
  font-size: 18px;
  span {
    font-weight: 900;
    margin: 0px 5px;
    font-size: 18px;
  }
  @media (max-width: ${device.mobile}) {
    margin-bottom: 15px;
  }
`;

export const WrapperCard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(30%, 1fr));
  grid-gap: 20px;
  padding-right: 25px;

  border-radius: 14px;
  @media (max-width: ${device.mobile}) {
    grid-template-columns: minmax(100%, 1fr);
    padding-right: 15px;
    grid-gap: 25px;
  }
`;

export const Wrap = styled.div`
  overflow-y: auto;
  margin-top: 25px;
  overflow-x: hidden;

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
    margin-top: 15px;
  }
`;

export const SideImgWrap = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;
  @media (min-width: ${device.laptop}) {
    height: 300px;
  }
  @media (max-width: ${device.mobile}) {
    height: 180px;
  }
`;

export const SideText = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const WrapScroll = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
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
  padding: 15px 25px 0 25px;
  justify-content: space-between;
`;
interface Props {
  open?: boolean;
}

export const SideDrawer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 40%;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 20;
  transition: 500ms all;
  box-shadow: -5px 2px 20px rgba(0, 0, 0, 0.06);
  transform: ${(props: Props) =>
    props.open ? 'translateX(0)' : 'translateX(100%)'};
`;

export const WrapButton = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  margin: 35px 0;
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
    width: 25%;
    height: 50%;
    min-width: 200px;
    min-height: 200px;
    max-width: 360px;
    max-height: 320px;
  }
  & > span {
    margin-top: 30px;
    font-size: 18px;
    color: #223367;
    text-align: center;
  }
  @media (max-width: ${device.mobile}) {
    & > img {
      width: 50%;
      height: 50%;
    }
    & > span {
      margin-top: 40px;
      font-size: 16px;
    }
  }
`;

import styled from "styled-components";
import { device } from "styles/device";
import { ReactComponent as Close } from "assets/icons/IconsInfo/close.svg";
import { ReactComponent as Message } from "assets/icons/message.svg";

export const CloseIcon = styled(Close)`
  width: 18px;
  height: 18px;
  @media (max-width: ${device.mobile}) {
    width: 15px;
    height: 15px;
  }
`;

export const MessageIcon = styled(Message)`
  width: 24px;
  height: 24px;
  @media (max-width: ${device.mobile}) {
    width: 18px;
    height: 18px;
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
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    height: 400px;
  }
  @media (max-width: ${device.mobile}) {
    height: 180px;
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

export const WrapButton = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  margin: 35px 0;
`;

export const SideText = styled.div`
  display: flex;
  align-items: flex-start;
  word-break: break-word;
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

import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Search } from 'assets/icons/FeedBack/search.svg';
import { ReactComponent as Dots } from 'assets/icons/FeedBack/dots.svg';
import { ReactComponent as Script } from 'assets/icons/FeedBack/script.svg';
import { ReactComponent as Smile } from 'assets/icons/FeedBack/smile.svg';
import { ReactComponent as Send } from 'assets/icons/FeedBack/send.svg';
import { ReactComponent as Down } from 'assets/icons/FeedBack/down.svg';

interface Props {
  right?: boolean;
}

export const SearchIcon = styled(Search)`
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

export const DotsIcon = styled(Dots)``;

export const DownIcon = styled(Down)`
  width: 18px;
  height: 18px;
  @media (min-width: ${device.laptop}) {
    width: 24px;
    height: 24px;
  }
`;

export const ScriptIcon = styled(Script)`
  margin: 0 30px;
`;

export const SmileIcon = styled(Smile)``;

export const SendIcon = styled(Send)``;

export const WrapDown = styled.div`
  background: rgba(96, 110, 234, 0.45);
  border-radius: 14px;
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  max-width: 50px;
  max-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
  @media (min-width: ${device.laptop}) {
    width: 60px;
    height: 60px;
    min-width: 60px;
    min-height: 60px;
    max-width: 60px;
    max-height: 60px;
  }
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  border-radius: 14px;
  margin-bottom: 10px;
  padding-right: 25px;
  overflow: hidden;
`;

export const LeftSide = styled.div`
  background-color: #abb2eb;
  border-radius: 14px 0 0 14px;
  width: 25%;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 260px;
`;

export const RightSide = styled.div`
  border-radius: 0 14px 14px 0;
  background-color: white;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const Header = styled.div`
  max-height: 75px;
  min-height: 75px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0 15px;
  background-color: ${({ right }: Props) => (right ? 'white' : 'transparent')};
  box-shadow: ${({ right }: Props) =>
    right ? '0px 4px 8px rgba(0, 0, 0, 0.12)' : null};
  border-radius: 0px 14px 0px 0px;
  @media (min-width: ${device.laptop}) {
    max-height: 90px;
    min-height: 90px;
    height: 90px;
  }
`;

export const WrapChatUsers = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex: 1;
  overflow-x: hidden;
  direction: rtl;

  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #223367;
    border-radius: 0px 14px 14px 0px;
  }
`;

export const WrapUserInfo = styled.div`
  display: flex;
`;

export const UserName = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #223367;
  @media (min-width: ${device.laptop}) {
    font-size: 18px;
  }
`;
export const Status = styled.div`
  font-weight: normal;
  font-size: 15px;
  color: #8f8f8f;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const WrapInfo = styled.div``;

export const WrapInput = styled.div`
  background: #ffffff;
  border: 2px solid #c2c2c2;
  border-radius: 14px;
  width: 100%;
  overflow: hidden;
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 15px;
`;

export const InputDown = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  background: #f5f5f5;
  border-radius: 0px 0px 14px 14px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  @media (min-width: ${device.laptop}) {
    padding: 15px;
  }
`;

export const InputWarn = styled.div`
  font-weight: normal;
  font-size: 15px;
  color: #8f8f8f;
  margin-left: 25px;
  @media (min-width: ${device.laptop}) {
    font-size: 16px;
  }
`;

export const WrapIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ChatPlace = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  margin-bottom: 15px;
  position: relative;
`;

export const Messages = styled.div`
  overflow-y: auto;
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

export const Img = styled.img`
  width: 25%;
  height: 45%;
`;

export const WrapImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  flex-direction: column;
`;

export const WrapChoose = styled.div`
  color: #223367;
  font-weight: normal;
  font-size: 16px;
  margin-top: 25px;
  @media (min-width: ${device.laptop}) {
    font-size: 18px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  width: 100%;
`;

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

export const DotsIcon = styled(Dots)`
  margin: 10px;
`;

export const DotsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const DownIcon = styled(Down)`
  width: 18px;
  height: 18px;
  @media (min-width: ${device.laptop}) {
    width: 24px;
    height: 24px;
  }
`;

export const ScriptIcon = styled(Script)``;

export const WrapScript = styled.div`
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
  cursor: pointer;
  @media (min-width: ${device.laptop}) {
    width: 60px;
    height: 60px;
    min-width: 60px;
    min-height: 60px;
    max-width: 60px;
    max-height: 60px;
  }
`;

export const WrapDownIcon = styled.div`
  position: absolute;
  right: 20px;
  bottom: 0;
  z-index: 3;
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
  max-height: 85px;
  min-height: 85px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  background-color: ${({ right }: Props) => (right ? 'white' : 'transparent')};
  padding: ${({ right }: Props) => (right ? '0 30px 0 15px' : '0 15px')};
  box-shadow: ${({ right }: Props) =>
    right ? '0px 4px 8px rgba(0, 0, 0, 0.12)' : null};
  border-radius: 0px 14px 0px 0px;
  @media (min-width: ${device.laptop}) {
    max-height: 90px;
    min-height: 90px;
    height: 90px;
  }
  position: relative;
`;

export const Fetching = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
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

export const Form = styled.form`
  background: #ffffff;
  border: 2px solid #c2c2c2;
  border-radius: 14px;
  width: 100%;
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
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  overflow-x: hidden;
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
  @media (min-width: ${device.laptop}) {
    width: 20%;
    height: 35%;
  }
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
  position: relative;
`;

interface MProps {
  bgcolor?: string;
}

export const Message = styled.div`
  background: ${({ bgcolor }: MProps) => bgcolor};
  border-radius: 16px 16px 16px 0;
  margin-left: 10px;
  position: relative;
  padding: 15px;
  max-width: 450px;
  word-wrap: break-word;
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: ${({ bgcolor }: MProps) => `20px solid ${bgcolor}`};
    left: -15px;
    bottom: 0;
  }
`;

export const MessageText = styled.pre`
  font-weight: normal;
  font-size: 14px;
  color: ${({ bgcolor }: MProps) => bgcolor};
  margin-top: 5px;

  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word;
`;

export const MessageDate = styled.div`
  font-weight: normal;
  font-size: 12px;
  color: ${({ bgcolor }: MProps) => bgcolor};
`;

export const MessageWrap = styled.div`
  display: flex;
  margin: 20px 0 0 20px;
  align-items: flex-end;
  width: 100%;
`;

export const Delete = styled.div``;

export const Link = styled.div``;

export const SelectWrap = styled.div`
  padding: 15px 0;
  & > div {
    font-weight: normal;
    font-size: 16px;
    padding: 15px 25px;
    cursor: pointer;
  }
  & > div:first-child {
    color: #223367;
    background-color: #eff0fd;
  }
  & > div:last-child {
    color: #ff5e68;
  }
`;

export const Loading = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EPicker = styled.div`
  position: absolute;
  bottom: 15%;
  right: 0;
  .emoji-mart-scroll {
    ::-webkit-scrollbar {
      width: 7px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #606eea;
      border-radius: 14px 0px 0px 14px;
      min-height: 80px;
    }
  }
`;

export const NoResult = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  height: 200px;
  font-weight: normal;
  font-size: 16px;
  color: #223367;
  word-break: break-word;
  width: 100%;
  text-align: center;
`;

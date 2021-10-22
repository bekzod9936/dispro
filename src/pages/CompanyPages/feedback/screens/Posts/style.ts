import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Search } from 'assets/icons/FeedBack/search.svg';
import { ReactComponent as Dots } from 'assets/icons/FeedBack/dots.svg';
import { ReactComponent as Script } from 'assets/icons/FeedBack/script.svg';
import { ReactComponent as Smile } from 'assets/icons/FeedBack/smile.svg';
import { ReactComponent as Send } from 'assets/icons/FeedBack/send.svg';

interface Props {
  right?: boolean;
}

export const SearchIcon = styled(Search)`
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

export const DotsIcon = styled(Dots)``;
export const ScriptIcon = styled(Script)`
  margin: 0 30px;
`;
export const SmileIcon = styled(Smile)``;
export const SendIcon = styled(Send)``;

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
  height: fit-content;
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
`;

export const InputDown = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  background: #f5f5f5;
  border-radius: 0px 0px 14px 14px;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
`;

export const InputWarn = styled.div`
  font-weight: normal;
  font-size: 15px;
  color: #8f8f8f;
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
  flex-shrink: 1;
  display: flex;
  flex-basis: 1;
`;

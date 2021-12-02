import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Search } from 'assets/icons/FeedBack/search.svg';

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
  @media (max-width: ${device.mobile}) {
    width: 16px;
    height: 16px;
    margin-right: 0;
    & path {
      fill: #606eea;
    }
  }
`;

export const ScriptIcon = styled(Script)`
  @media (max-width: ${device.mobile}) {
    width: 20px;
    height: 20px;
  }
`;

export const WrapScript = styled.div`
  margin: 0 30px;
`;

export const SmileIcon = styled(Smile)``;

export const SendIcon = styled(Send)`
  @media (max-width: ${device.mobile}) {
    width: 20px;
    height: 20px;
    & path {
      fill: #606eea;
    }
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
  width: 30%;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 300px;
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
  @media (max-width: ${device.mobile}) {
    flex: 1;
    justify-content: space-between;
  }
`;

export const UserName = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #223367;
  @media (min-width: ${device.laptop}) {
    font-size: 18px;
  }
`;

export const WrapInfo = styled.div``;

export const Form = styled.form`
  background: #ffffff;
  border: 2px solid #c2c2c2;
  border-radius: 14px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${device.mobile}) {
    border: none;
    border-radius: 0;
  }
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

export const Loading = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${device.mobile}) {
    color: #223367;
    font-weight: 500;
    margin-top: 15px;
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
  @media (max-width: ${device.mobile}) {
    margin-top: 10px;
  }
`;

export const MobileMessages = styled.div`
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  margin-top: 13px;
`;

export const MobileContainer = styled.div``;

export const WrapModal = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const HeaderModal = styled.div`
  display: flex;
  padding: 10px 15px;
  align-items: center;
`;
export const BodyModal = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;
export const FooterModal = styled.div`
  border-top: 1px solid #c2c2c2;
  height: fit-content;
`;

export const Wranning = styled.div`
  background: #f5f5f5;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  font-size: 14px;
  color: #8f8f8f;
  display: flex;
  align-items: center;
  padding-left: 15px;
`;

export const WrapTextArea = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 15px 0;
  position: relative;
  & > textarea::-webkit-resizer {
    display: none;
  }
  & > textarea::placeholder {
    font-size: 14px;
    color: #c2c2c2;
    font-family: var(--fontFamily);
  }
  & > textarea {
    resize: none;
    overflow: hidden !important;
    border: none !important;
    padding: 0 90px 0 15px !important;
    align-self: center;
    font-family: var(--fontFamily);
  }
  & > textarea:focus {
    outline: 0;
  }
`;

export const WrapButtons = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

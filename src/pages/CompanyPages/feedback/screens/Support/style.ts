import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Down } from 'assets/icons/FeedBack/down.svg';
import { ReactComponent as Dis } from 'assets/icons/disicon.svg';

export const Container = styled.div`
  padding: 25px 0 0 25px;
  display: flex;
  height: 100%;
  flex-direction: column;
`;

export const MessageContainer = styled.div`
  max-width: 1000px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  margin: 20px 0;
  overflow: hidden;
`;

export const Header = styled.div`
  height: 90px;
  width: 100%;
  padding: 15px 20px;

  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
  border-radius: 14px 14px 0px 0px;

  max-height: 75px;
  min-height: 75px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  @media (min-width: ${device.laptop}) {
    max-height: 90px;
    min-height: 90px;
    height: 90px;
  }
`;

export const HTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #223367;
`;

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  flex-direction: column;
  position: relative;
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

export const Form = styled.form`
  background: #ffffff;
  border: 2px solid #c2c2c2;
  border-radius: 14px;
  width: 100%;
`;

export const Link = styled.a`
  font-weight: 300;
  font-size: 16px;
  color: #3492ff;
  text-decoration: none;
  margin-right: 20px;
`;

export const WorkingTime = styled.div`
  font-weight: normal;
  font-size: 16px;
  color: #aaaaaa;
  text-align: right;
`;

export const TimeWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const LinkWrap = styled.div`
  margin-top: 7px;
`;

export const WrapTitile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const WrapImg = styled.div`
  display: flex;
  align-items: center;
`;

export const Messages = styled.div`
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;

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

export const ChatPlace = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  margin-bottom: 15px;
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

export const MessageText = styled.div`
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

export const DownIcon = styled(Down)`
  width: 18px;
  height: 18px;
  @media (min-width: ${device.laptop}) {
    width: 24px;
    height: 24px;
  }
`;

export const DisIcon = styled(Dis)`
  width: 80%;
`;

export const WrapDownIcon = styled.div`
  position: absolute;
  right: 20px;
  bottom: 0;
  z-index: 9999;
`;

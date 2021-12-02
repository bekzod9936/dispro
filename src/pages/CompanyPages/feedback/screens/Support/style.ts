import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Down } from 'assets/icons/FeedBack/down.svg';
import { ReactComponent as Dis } from 'assets/icons/disicon.svg';

interface JProps {
  type?: any;
}

const getType = ({ type }: JProps) => {
  switch (type) {
    case 5:
      return {
        justify: 'flex-end',
        bg: '#606eea',
        date: '#fff',
        color: '#fff',
        right: '-15px',
        radius: '16px 16px 0 16px',
      };
    case 6:
      return {
        justify: 'flex-start',
        bg: '#E5E9FF',
        date: '#A5A5A5',
        color: '#223367',
        left: '-15px',
        radius: '16px 16px 16px 0',
      };
    default:
      return {
        justify: 'flex-start',
        bg: '#E5E9FF',
        date: '#fff',
        color: '#223367',
        left: '-15px',
        radius: '16px 16px 0 16px',
      };
  }
};

export const Container = styled.div`
  padding: 25px 0 0 25px;
  display: flex;
  height: 100%;
  flex-direction: column;
`;

export const Divider = styled.div`
  text-align: center;
  width: 100%;
  position: relative;
  & > div {
    font-weight: 500;
    font-size: 14px;
    color: #223367;
    display: flex;
    align-items: center;
    text-align: center;
  }

  & > div::before,
  & > div::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid rgba(96, 110, 234, 0.1);
  }

  & > div:not(:empty)::before {
    margin-right: 30px;
  }

  & > div:not(:empty)::after {
    margin-left: 30px;
  }
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
  @media (max-width: ${device.mobile}) {
    font-size: 16px;
  }
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
  display: flex;
  flex-direction: column;

  @media (max-width: ${device.mobile}) {
    border: none;
    border-radius: 0;
  }
`;

export const Link = styled.a`
  font-weight: 300;
  font-size: 16px;
  color: #3492ff;
  text-decoration: none;
  margin-right: 20px;
  @media (max-width: ${device.mobile}) {
    font-size: 14px;
  }
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

  @media (max-width: ${device.mobile}) {
    div.infinite-scroll-component {
      grid-row-gap: 15px;
      padding: 10px 20px 0 10px;
    }
  }
`;

export const ChatPlace = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  margin-bottom: 15px;
  position: relative;
  @media (max-width: ${device.mobile}) {
    margin-bottom: 0;
  }
`;

export const Message = styled.div`
  background: ${({ type }: JProps) => {
    const ss: any = getType({ type });
    return ss?.bg;
  }};
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
    border-bottom: ${({ type }: JProps) => {
      const ss: any = getType({ type });
      return `20px solid ${ss?.bg}`;
    }};
    left: -15px;
    bottom: 0;
    border-radius: 7px;
  }
  @media (max-width: ${device.mobile}) {
    max-width: 250px;
    border-radius: ${({ type }: JProps) => {
      const ss: any = getType({ type });
      return ss?.radius;
    }};
    padding: 13px;
    &::before {
      right: ${({ type }: JProps) => {
        const ss: any = getType({ type });
        return ss?.right ? ss?.right : 'unset';
      }};
      left: ${({ type }: JProps) => {
        const ss: any = getType({ type });
        return ss?.left ? ss?.left : 'unset';
      }};
    }
  }
`;

export const MessageText = styled.div`
  font-weight: normal;
  font-size: 14px;
  color: ${({ type }: JProps) => {
    const ss: any = getType({ type });
    return ss?.color;
  }};
  margin-top: 5px;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
`;

export const MessageDate = styled.div`
  font-weight: normal;
  font-size: 12px;
  color: ${({ type }: JProps) => {
    const ss: any = getType({ type });
    return ss?.date;
  }};
`;

export const MessageWrap = styled.div`
  display: flex;
  margin: 20px 0 0 20px;
  align-items: flex-end;
  width: 100%;
  @media (max-width: ${device.mobile}) {
    justify-content: ${({ type }: JProps) => {
      const ss: any = getType({ type });
      return ss?.justify;
    }};
    margin: 0;
  }
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
  z-index: 3;
`;

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

export const WrapPhone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

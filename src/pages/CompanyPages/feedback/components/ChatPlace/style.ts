import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Down } from 'assets/icons/FeedBack/down.svg';

interface JProps {
  type?: any;
}

const getType = ({ type }: JProps) => {
  switch (type) {
    case 2:
      return {
        justify: 'flex-end',
        bg: '#606eea',
        date: '#fff',
        color: '#fff',
        right: '-15px',
        radius: '16px 16px 0 16px',
      };
    case 1:
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

export const WrapDateMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const WrapDownIcon = styled.div`
  position: absolute;
  right: 20px;
  bottom: 0;
  z-index: 3;
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

export const MessageDate = styled.div`
  font-weight: normal;
  font-size: 12px;
  color: ${({ type }: JProps) => {
    const ss: any = getType({ type });
    return ss?.date;
  }};
`;

export const MessageText = styled.pre`
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
    & > div > div {
      grid-row-gap: 15px;
      padding: 10px 20px 0 10px;
    }
  }
`;

export const ChatPlace1 = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;

  @media (max-width: ${device.mobile}) {
    margin-bottom: 0;
  }
`;

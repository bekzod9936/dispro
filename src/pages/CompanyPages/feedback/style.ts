import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as OneCheck } from 'assets/icons/FeedBack/onecheck.svg';
import { ReactComponent as DoubleCheck } from 'assets/icons/FeedBack/doublecheck.svg';
import { ReactComponent as Unread } from 'assets/icons/FeedBack/unread.svg';
import { ReactComponent as Smile } from 'assets/icons/FeedBack/smile.svg';
import { ReactComponent as Send } from 'assets/icons/FeedBack/send.svg';
interface Props {
  checked?: boolean;
  margin?: string;
  isPosts?: boolean;
  big?: boolean;
  main?: boolean;
  bgcolor?: string;
}

interface RProps {
  reviews?: boolean;
}

export const OneCheckIcon = styled(OneCheck)`
  width: 15px;
  height: 15px;
  min-width: 15px;
  min-height: 15px;
  max-width: 15px;
  max-height: 15px;
  margin-left: 15px;
`;

export const DoubleCheckIcoon = styled(DoubleCheck)`
  width: 15px;
  height: 15px;
  min-width: 15px;
  min-height: 15px;
  max-width: 15px;
  max-height: 15px;
  margin-left: 15px;
`;

export const UnreadIcon = styled(Unread)`
  margin-left: 15px;
`;

export const Avatar = styled.div`
  border-radius: 14px;
  width: ${({ big }: Props) => (big ? '45px' : '40px')};
  height: ${({ big }: Props) => (big ? '45px' : '40px')};
  min-width: ${({ big }: Props) => (big ? '45px' : '40px')};
  min-height: ${({ big }: Props) => (big ? '45px' : '40px')};
  background-color: ${({ bgcolor }: Props) =>
    bgcolor ? bgcolor : 'transparent'};
  margin-right: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  @media (max-width: ${device.mobile}) {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    min-width: 50px;
    max-height: 50px;
  }
  @media (min-width: ${device.laptop}) {
    width: ${({ big }: Props) => (big ? '55px' : '40px')};
    height: ${({ big }: Props) => (big ? '55px' : '40px')};
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  height: 100%;
  overflow: auto;
  flex-direction: ${({ reviews }: RProps) => (reviews ? 'row' : 'column')};
  padding: ${({ reviews }: RProps) => (reviews ? '0' : '25px 0 0 25px')};
  position: relative;
  &::after {
    content: '';
    width: 1px;
    background-color: rgba(96, 110, 234, 0.3);
    height: ${({ reviews }: RProps) => (reviews ? 'calc(100% - 30px)' : 0)};
    position: absolute;
    top: 15px;
    bottom: 15px;
    right: 26%;
  }

  div.review {
    overflow-y: ${({ reviews }: RProps) => (reviews ? 'auto' : 'hidden')};
    overflow-x: hidden;
    padding: 25px 0 0 25px;
    display: flex;
    height: 100%;
    width: 100%;
    flex: 1;
    justify-content: space-between;
    ::-webkit-scrollbar {
      width: 7px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #606eea;
      border-radius: 14px 0px 0px 14px;
    }
  }
  @media (max-width: ${device.mobile}) {
    padding: ${({ reviews }: RProps) => (reviews ? '0' : '15px 15px 0 15px')};
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 25px;
    ::-webkit-scrollbar {
      width: 7px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #606eea;
      border-radius: 14px 0px 0px 14px;
    }
    div.review {
      padding: 15px 15px 0 15px;
    }
    &::after {
      content: '';
      width: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }
  }
`;

export const Wrapper = styled.div`
  width: ${({ reviews }: RProps) => (reviews ? '72%' : '100%')};
  @media (max-width: ${device.mobile}) {
    width: 100%;
  }
`;

export const WrapReview = styled.div`
  height: fit-content;
`;

export const Status = styled.div`
  font-weight: ${({ main }: Props) => (main ? 'normal' : '300')};
  font-size: ${({ main }: Props) => (main ? '16px' : '13px')};
  color: ${({ main }: Props) => (main ? '#8F8F8F' : '#223367')};
  @media (min-width: ${device.laptop}) {
    font-size: 14px;
  }
  @media (max-width: ${device.mobile}) {
    font-size: 12px;
    font-weight: 300;
    color: #223367;
  }
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

export const Divider = styled.div`
  text-align: center;
  width: 100%;
  position: relative;
  padding: 10px 0;
  & > div {
    font-weight: 500;
    font-size: 14px;
    color: #223367;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 0 10px;
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

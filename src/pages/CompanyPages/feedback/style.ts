import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as OneCheck } from 'assets/icons/FeedBack/onecheck.svg';
import { ReactComponent as DoubleCheck } from 'assets/icons/FeedBack/doublecheck.svg';
import { ReactComponent as Unread } from 'assets/icons/FeedBack/unread.svg';

interface Props {
  checked?: boolean;
  margin?: string;
  isPosts?: boolean;
  big?: boolean;
  main?: boolean;
}

interface RProps {
  reviews?: boolean;
}

export const OneCheckIcon = styled(OneCheck)`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  max-width: 20px;
  max-height: 20px;
`;

export const DoubleCheckIcoon = styled(DoubleCheck)`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  max-width: 20px;
  max-height: 20px;
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
  background-color: transparent;
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
    right: 25%;
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
  width: ${({ reviews }: RProps) => (reviews ? '74%' : '100%')};
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

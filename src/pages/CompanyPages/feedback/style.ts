import styled from 'styled-components';
import { device } from 'styles/device';

interface Props {
  checked?: boolean;
  margin?: string;
  isPosts?: boolean;
  big?: boolean;
}

interface RProps {
  reviews?: boolean;
}

export const Avatar = styled.div`
  border-radius: 14px;
  width: ${({ big }: Props) => (big ? '45px' : '40px')};
  height: ${({ big }: Props) => (big ? '45px' : '40px')};
  min-width: ${({ big }: Props) => (big ? '45px' : '40px')};
  min-height: ${({ big }: Props) => (big ? '45px' : '40px')};
  background-color: lightgray;
  margin-right: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: ${device.laptop}) {
    width: ${({ big }: Props) => (big ? '55px' : '40px')};
    height: ${({ big }: Props) => (big ? '55px' : '40px')};
  }
  & > img {
    width: 100%;
    height: 100%;
    object-fit: fill;
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
`;

export const Wrapper = styled.div`
  width: ${({ reviews }: RProps) => (reviews ? '74%' : '100%')};
`;

export const WrapReview = styled.div`
  height: fit-content;
`;

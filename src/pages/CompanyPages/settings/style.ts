import styled from 'styled-components';
import { device } from 'styles/device';

export const PageWrapperFlex = styled.div`
  padding: 20px 0 0 30px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${device.planshet}) {
    padding-left: 0;
    padding-right: 0;
  }
`;
export const WrapperTitle = styled.div`
  @media (max-width: ${device.mobile}) {
    padding-left: 15px;
  }
`;

export const SpinnerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WrapperNav = styled.div`
  height: fit-content;
  @media (max-width: ${device.mobile}) {
    padding-left: 15px;
  }
`;




export const BottomBtnContainer = styled.div`
  padding-top: 25px;
  padding-bottom: 20px;
  width: 100%;
  background-color: #f1f4f6;
`;

interface Props {
  height: number;
}

interface WProps {
  width: number;
}

export const Break = styled.div`
  height: ${({ height }: Props) => `${height}px`};
`;

export const HBreak = styled.div`
  width: ${({ width }: WProps) => `${width}px`};
`;

export const SmallPanel = styled.div`
  width: 85%;
  box-sizing: border-box;
  padding: 15px 20px;
  background-color: white;
  border-radius: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ReferalScroll = styled.div`
  overflow-y: scroll;
  height: 100%;
  border-right: 1px solid rgba(96, 110, 234, 0.3);
  scroll-behavior: auto;

  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 2px 0px 0px 2px;
  }
`;
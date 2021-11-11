import styled from "styled-components";
import { device } from "styles/device";

export const SpinnerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BottomBtnContainer = styled.div`
  position: absolute;
  padding-top: 25px;
  padding-bottom: 20px;
  bottom: 0;
  left: 10px;
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

export const Wrapper = styled.div`
  padding-left: 30px;
  padding-right: 20px;
`;

export const WrapperNav = styled.div`
  padding-left: 30px;
  padding-right: 20px;

  @media (max-width: ${device.planshet}) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const WrapperTitle = styled.div`
  padding-left: 50px;

  @media (max-width: ${device.planshet}) {
    padding-left: 20px;
  }
`;

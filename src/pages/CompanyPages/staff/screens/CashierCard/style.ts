import styled from "styled-components";
import { device } from "styles/device";

export const CardContainer = styled.div`
  margin-top: 25px;
  padding-right: 40px;
  padding-left: 45px;
  position: relative !important;
  overflow: auto;
`;

export const StaticDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  overflow: scroll;
  grid-auto-rows: minmax(90px, 110px);
  padding-top: 20px;

  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
  @media (max-width: ${device.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatisticCol = styled.div`
  display: flex;
`;

export const StaticIcon = styled.div``;

export const Content = styled.div`
  margin-left: 15px;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 15px;
  color: #223367;
  @media (max-width: ${device.mobile}) {
    font-size: 13px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: 18px;
  }
`;

export const Value = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #606eea;
  @media (max-width: ${device.mobile}) {
    font-size: 16px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: 28px;
  }
`;

export const CashierInfo = styled.div`
  position: relative;
  background: #ffffff;
  padding: 22px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  grid-auto-rows: minmax(90px, 110px);

  @media (max-width: ${device.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StaffCol = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const StaffImg = styled.div`
  display: flex;
  border-radius: 14px;
  height: 100px;
  width: 100px;
  align-items: center;
  justify-content: center;
`;

export const StaffName = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  color: #223367;
`;

export const StaffText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  color: #223367;
`;

export const StaffSecondText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 1px;
  color: #c7c7c7;
`;

interface IBreak {
  width?: number;
  height?: number;
}

export const Break = styled.div`
  width: ${({ width }: IBreak) => width + "px"};
  height: ${({ height }: IBreak) => height + "px"};
`;

export const StaffAction = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

export const Side = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

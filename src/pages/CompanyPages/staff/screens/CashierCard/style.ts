import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as QRStaff } from 'assets/icons/qr_staff.svg';
import { ReactComponent as Dots } from 'assets/icons/verticalDots.svg';

export const QRIcon = styled(QRStaff)`
  margin-left: 10px;
`;

export const CardContainer = styled.div`
  padding-top: 25px;
  padding-left: 30px;
  position: relative !important;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`;

export const Wrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  padding-right: 30px;

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
  width: ${({ width }: IBreak) => width + 'px'};
  height: ${({ height }: IBreak) => height + 'px'};
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
  align-items: flex-start;
`;

export const ContentTable = styled.div`
  padding-top: 30px;
`;

export const DotsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const DotsIcon = styled(Dots)`
  margin: 10px;
`;

export const SelectWrap = styled.div`
  min-width: 247px;
  padding: 15px 0;
  & > div {
    font-weight: normal;
    font-size: 16px;
    padding: 15px 25px;
  }
  & > div:first-child {
    color: #223367;
    background-color: #eff0fd;
  }
  & > div:last-child {
    color: #ff5e68;
  }
`;
export const Edit = styled.div``;

export const Delete = styled.div``;

export const ModalContent = styled.div`
  padding: 30px 40px;
  overflow-y: auto;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

interface IMAction {
	justifyContent?:
	  | "space-between"
	  | "center"
	  | "flex-end"
	  | "flex-start"
	  | "space-around";
	mTop?: number;
  }

export const ModalAction = styled.div`
  display: flex;
  justify-content: ${({ justifyContent = "flex-end" }: IMAction) =>
    justifyContent};
  align-items: center;
  margin-top: ${({ mTop = 1 }: IMAction) => mTop + "px"};
`;

export const BarTitle = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 26px;
  color: #223367;
`;

export const ButtonKeyWord = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c4c4c4;
  border-radius: 46px;
  font-weight: 300;
  font-size: 14px;
  color: #223367;
  padding: 0 5px 0 15px;
  margin: 10px 10px 0 0;
  height: 35px;
  .MuiIconButton-root {
    padding: 6px !important;
    margin-left: 5px;
  }
  @media (max-width: ${device.mobile}) {
    height: 25px;
    font-weight: 300;
    font-size: 12px;
    color: #223367;
  }
`;


interface ButtonProps {
	mobile?: boolean;
	color?: string;
  }

export const DeleteIc = styled(Delete)`
  & > path {
    fill: ${({ color }: ButtonProps) => (color ? color : null)};
  }
`;

export const BarText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  color: #223367;
`;
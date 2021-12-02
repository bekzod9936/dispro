import styled from "styled-components";
import { device } from "styles/device";
import { ReactComponent as Delete } from "assets/icons/IconsInfo/delete.svg";

export const CashierDiv = styled.div`
display: flex;
flex-direction: column;
height: 100%;
  width: 100%;
  margin-top: 30px;
  padding-right: 40px;
  position: relative !important;
  overflow: hidden;
  
`;

export const Text = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  width: 480px;
`;

export const Break = styled.div`
  height: 20px;
`;

export const ModalContent = styled.div`
  padding: 30px 40px;
  overflow-y: auto;
`;

export const ModalMain = styled.div`
  padding: 30px 40px;
  overflow-y: auto;
  width: 580px;

  scroll-behavior: auto;

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

export const ModalHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ModalTitle = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  /* identical to box height */

  color: #223367;
`;

export const CashierFilterWrap = styled.p`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-top: 15px;
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
import styled from "styled-components";
import { device } from "styles/device";
import { ITRow } from "./types";
import { ReactComponent as Up } from "assets/icons/up.svg";
import { Radio } from "@material-ui/core";

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  overflow-x: auto;
	max-width: 580px;
  width: 100%;
	
  &:hover {
    ::-webkit-scrollbar-thumb {
      background: #606eea;
    }
  }
  ::-webkit-scrollbar {
    height: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 0 0 14px 14px;
  }
	
    
`;

//Table styles
export const Table = styled.table`
	font-family: arial, sans-serif;
	border-collapse: collapse;
	width: 100%;
`;

export const TableTd = styled.td`
	border: 1px solid #D0D4F9;
	padding: 6px 0 6px 0;
	text-align: center;
	color: #223367;
	font-family: Roboto;
	font-style: normal;
	font-weight: bold;
	font-size: 15px;
	line-height: 19px;
	vertical-align: middle;
`;

export const TableTr = styled.tr`
	${TableTd}:nth-child(1){
		width: 183px;
	}
`;

export const TableTh = styled.th`
	white-space: nowrap;
	border: 1px solid #D0D4F9;
	padding: 3px 10px 5px 10px;
	font-family: Roboto;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 19px;
	text-align: center;
	vertical-align: middle;
	vertical-align: top;
`;

export const WrapRadio = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

//for buttons

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
  width: 100%;
  display: flex;
  justify-content: ${({ justifyContent = "flex-end" }: IMAction) =>
    justifyContent};
  align-items: center;
  margin-top: ${({ mTop = 1 }: IMAction) => mTop + "px"};
`;


export const MRadio = styled(Radio)`
color: #A5A5A5;
  &.Mui-checked {
    color: #3492FF;
  }
`
export const DisabledText = styled.span`
	font-family: Roboto;
	font-style: normal;
	font-weight: 300;
	font-size: 16px;
	line-height: 19px;
	margin-left: 25px;
`

export const DisabledWrap = styled.span`
	display: flex;
	justify-content: center;
    width: 100%;
    align-items: center;
    height: 34px;
	margin-bottom: 15px;
`

export const SelectedUser = styled.h3`
	font-family: Roboto;
	font-style: normal;
	font-weight: 300;
	font-size: 14px;
	line-height: 16px;
	margin-bottom: 20px;
`
export const WrapperScroll = styled.div`
	width: 100%;
	height: 500px;
	overflow-y: auto;
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

@media (max-width: 1600px ) and (max-height: 700px) {
	height: 380px;
} 
`
import styled from "styled-components";
import { device } from "styles/device";

export const ManagerDiv = styled.div``;

interface IBreak {
  width?: number;
  height?: number;
}

export const Form = styled.form``;

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const FormCol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Break = styled.div`
  height: ${({ height }: IBreak) => height + "px"};
  width: ${({ width }: IBreak) => width + "px"};
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

export const UploadButton = styled.div`
    background: rgba(96, 110, 234, 0.1);
    input {
        display: none;
    }
    padding: 14px 25px;
    cursor: pointer;
    width: max-content;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 14px;
    margin-bottom: 10px;
    label {
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
        margin-right: 10px;
        color: #606EEA;

    }`

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

export const Header = styled.div`
    margin-top: 15px;
    p {
		width: 420px;
        font-size: 14px;
        color: #C4C4C4;
        margin-bottom: 20px;
    }
`
export const ErrorMessage = styled.span`
  font-weight: 300;
  color: #ff5e68;
  overflow-wrap: normal;
  display: flex;
  margin-top: 5px;

  font-size: ${({ labelStyle }: any) =>
    labelStyle?.fontSize?.laptop
      ? `${labelStyle?.fontSize?.laptop}px`
      : '14px'} !important;

  @media (max-width: ${device.mobile}) {
    font-size: ${({ labelStyle }: any) =>
    labelStyle?.fontSize?.mobile
      ? `${labelStyle?.fontSize?.mobile}px`
      : '14px'} !important;
    margin-top: 3px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: ${({ labelStyle }: any) =>
    labelStyle?.fontSize?.planshet
      ? `${labelStyle?.fontSize?.planshet}px`
      : '14px'} !important;
    margin-top: 3px;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: any) =>
    labelStyle?.fontSize?.laptop
      ? `${labelStyle?.fontSize?.laptop}px`
      : '14px'} !important;
    flex-direction: column;
    margin-top: 3px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: any) =>
    labelStyle?.fontSize?.desktop
      ? `${labelStyle?.fontSize?.desktop}px`
      : '16px'} !important;
    margin-top: 5px;
  }
`;

export const ImageBlock = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
width: max-content;
img {
    border-radius: 14px;
    width: 100px;
    margin-top: 15px;
}
svg {
    position: absolute;
    cursor: pointer;
    z-index: 20;
    opacity: 0;
   
}
&:hover{
    svg {
        opacity: 1;
    }
    &::before{
        opacity: 0.25;
    }
}
&::before{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    opacity: 0;
    transition: 200ms all;
}`
 

export const Container = styled.div`
   box-sizing: border-box;
   flex-direction: column;
   display: flex;
   justify-content: flex-start;
   padding: 20px 60px 0 0;
   @media (max-width: ${device.laptop}) {
	 padding-right: 20px;
   }
 `

export const Text = styled.h3`
	color: #223367;
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	font-style: normal;
 `
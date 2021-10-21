import styled from "styled-components"
import { device } from "styles/device"

export const AgeWrapper = styled.div`
    width: 100%;
    margin-bottom: 25px;
`
export const Header = styled.div`
    margin-top: 15px;
    p {
        font-size: 14px;
        color: #C4C4C4;
        margin-bottom: 20px;
    }
`

export const AgeBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    h6 {
        font-size: 16px;
        color: #223367;
        font-weight: 500;
    }
`
export const LeftSide = styled.div`
    width: 45%;
   
`
export const RightSide = styled.div`
    width: 40%;
   
`
export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 100%;

    padding: 20px 60px 20px 0;
`

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`

export const UpSide = styled.div`
    height: 75%;
    scroll-behavior: auto;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
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
`

export const DownSide = styled.div`
    border-top: 1px solid #606EEA;
    padding: 25px 0;
    background-color: white;
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    display: flex;
    justify-content: flex-start;
    height: 20%;
`
export const Form = styled.form`
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    border-radius: 14px;
    padding: 35px 110px 0 110px;
    overflow: hidden;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

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
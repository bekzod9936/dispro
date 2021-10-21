import styled from "styled-components";
import { MProps } from "./types";
import { device } from "../../../styles/device";

import { TextField, InputLabel, InputAdornment } from "@material-ui/core";
import dateicon from "assets/icons/date.png";

export const Container = styled.div`
  width: ${({ width }: MProps) =>
    width?.width ? width?.width : "100%"} !important;
  min-width: ${({ width }: MProps) => `${width?.minwidth}px`} !important;
  max-width: ${({ width }: MProps) => `${width?.maxwidth}px`} !important;
  position: relative;
  margin: ${({ margin }: MProps) => margin?.laptop} !important;
  @media (max-width: ${device.mobile}) {
    margin: ${({ margin }: MProps) => margin?.mobile} !important;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    margin: ${({ margin }: MProps) => margin?.planshet} !important;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    margin: ${({ margin }: MProps) => margin?.laptop} !important;
  }
  @media (min-width: ${device.laptop}) {
    margin: ${({ margin }: MProps) => margin?.desktop} !important;
  }
  .MuiInputLabel-formControl {
    position: static !important;
    transform: none !important;
  }
  input[type="date"]::-webkit-calendar-picker-indicator {
    background: url(${dateicon}) no-repeat;
    width: 20px;
    height: 20px;
  }
`;

export const MoneyInput = styled(TextField)`
  .MuiInput-underline:before,
  .MuiInput-underline:after {
    border: none !important;
  }
  background-color: ${({ inputStyle, disabled }: MProps) =>
    disabled
      ? "lightgray"
      : inputStyle?.bgcolor
      ? inputStyle?.bgcolor
      : "white"} !important;
  border-radius: ${({ inputStyle }: MProps) =>
    inputStyle?.radius === 0
      ? 0
      : inputStyle?.radius
      ? `${inputStyle?.radius}px`
      : "14px"} !important;
  border: ${({ inputStyle, error }: MProps) =>
    error
      ? "1px solid #FF5E68"
      : inputStyle?.border
      ? inputStyle?.border
      : "1px solid #C2C2C2"} !important;
  border-bottom: ${({ inputStyle, error }: MProps) =>
    error
      ? "1px solid #FF5E68"
      : inputStyle?.borderbottom
      ? inputStyle?.borderbottom
      : null} !important;
  margin: ${({ inputStyle }: MProps) =>
    inputStyle?.margin ? inputStyle?.margin : 0} !important;
  padding: ${({ inputStyle }: MProps) =>
    inputStyle?.outpadding ? inputStyle?.outpadding : 0} !important;
  input::placeholder {
    color: ${({ inputStyle }: MProps) =>
      inputStyle?.placeholdercolor} !important;
  }
  textarea::placeholder {
    color: ${({ inputStyle }: MProps) =>
      inputStyle?.placeholdercolor} !important;
  }
  .MuiInputBase-input {
    border-radius: ${({ inputStyle }: MProps) =>
      inputStyle?.radius ? `${inputStyle?.radius}px` : "14px"} !important;
    height: ${({ inputStyle }: MProps) =>
      inputStyle?.fitheight
        ? "fit-content"
        : inputStyle?.height?.laptop
        ? `${inputStyle?.height?.laptop}px`
        : "50px"} !important;

    font-size: ${({ inputStyle }: MProps) =>
      inputStyle?.fontSize?.laptop
        ? `${inputStyle?.fontSize?.laptop}px`
        : "16px"} !important;
    font-weight: ${({ inputStyle }: MProps) =>
      inputStyle?.weight ? inputStyle?.weight : "500"} !important;
    color: ${({ inputStyle }: MProps) =>
      inputStyle?.color ? inputStyle?.color : "#223367"} !important;
    padding: ${({ inputStyle }: MProps) =>
      inputStyle?.inpadding ? inputStyle?.inpadding : "0 20px"} !important;

    @media (max-width: ${device.mobile}) {
      font-size: ${({ inputStyle }: MProps) =>
        inputStyle?.fontSize?.mobile
          ? `${inputStyle?.fontSize?.mobile}px`
          : "14px"} !important;
      height: ${({ inputStyle }: MProps) =>
        inputStyle?.fitheight
          ? "fit-content"
          : inputStyle?.height?.mobile
          ? `${inputStyle?.height?.mobile}px`
          : "45px"} !important;
    }
    @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
      font-size: ${({ inputStyle }: MProps) =>
        inputStyle?.fontSize?.planshet
          ? `${inputStyle?.fontSize?.planshet}px`
          : "14px"} !important;
      height: ${({ inputStyle }: MProps) =>
        inputStyle?.fitheight
          ? "fit-content"
          : inputStyle?.height?.planshet
          ? `${inputStyle?.height?.planshet}px`
          : "45px"} !important;
    }
    @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
      font-size: ${({ inputStyle }: MProps) =>
        inputStyle?.fontSize?.laptop
          ? `${inputStyle?.fontSize?.laptop}px`
          : "15px"} !important;
      height: ${({ inputStyle }: MProps) =>
        inputStyle?.fitheight
          ? "fit-content"
          : inputStyle?.height?.laptop
          ? `${inputStyle?.height?.laptop}px`
          : "50px"} !important;
    }
    @media (min-width: ${device.laptop}) {
      font-size: ${({ inputStyle }: MProps) =>
        inputStyle?.fontSize?.desktop
          ? `${inputStyle?.fontSize?.desktop}px`
          : "16px"} !important;
      height: ${({ inputStyle }: MProps) =>
        inputStyle?.fitheight
          ? "fit-content"
          : inputStyle?.height?.desktop
          ? `${inputStyle?.height?.desktop}px`
          : "60px"} !important;
    }
  }
`;

export const Label = styled(InputLabel)`
  width: fit-content;
  user-select: none;

  color: ${({ labelStyle }: MProps) =>
    labelStyle?.color ? labelStyle?.color : "#C7C7C7"} !important;
  font-weight: ${({ labelStyle }: MProps) =>
    labelStyle?.weight ? labelStyle?.weight : "bold"} !important;
  font-size: ${({ labelStyle }: MProps) =>
    labelStyle?.fontSize?.laptop
      ? `${labelStyle?.fontSize?.laptop}px`
      : "15px"} !important;
  margin-bottom: ${({ lmargin }: MProps) =>
    lmargin?.laptop ? `${lmargin?.laptop}px` : "7px"}!important;
  @media (max-width: ${device.mobile}) {
    font-size: ${({ labelStyle }: MProps) =>
      labelStyle?.fontSize?.mobile
        ? `${labelStyle?.fontSize?.mobile}px`
        : "14px"} !important;
    margin-bottom: ${({ lmargin }: MProps) =>
      lmargin?.mobile ? `${lmargin?.mobile}px` : "5px"}!important;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: ${({ labelStyle }: MProps) =>
      labelStyle?.fontSize?.planshet
        ? `${labelStyle?.fontSize?.planshet}px`
        : "14px"} !important;
    margin-bottom: ${({ lmargin }: MProps) =>
      lmargin?.planshet ? `${lmargin?.planshet}px` : "6px"}!important;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: MProps) =>
      labelStyle?.fontSize?.laptop
        ? `${labelStyle?.fontSize?.laptop}px`
        : "15px"} !important;
    margin-bottom: ${({ lmargin }: MProps) =>
      lmargin?.laptop ? `${lmargin?.laptop}px` : "7px"}!important;
  }
  @media (min-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: MProps) =>
      labelStyle?.fontSize?.desktop
        ? `${labelStyle?.fontSize?.desktop}px`
        : "16px"} !important;
    margin-bottom: ${({ lmargin }: MProps) =>
      lmargin?.desktop ? `${lmargin?.desktop}px` : "10px"}!important;
  }
`;

export const Adornment = styled(InputAdornment)`
  color: #606eea !important;
`;

export const Message = styled.div`
  position: absolute;
  top: 100%;
  font-weight: 300;
  color: #ff5e68;
  overflow-wrap: normal;
  display: flex;
  margin-top: 5px;

  font-size: ${({ labelStyle }: MProps) =>
    labelStyle?.fontSize?.laptop
      ? `${labelStyle?.fontSize?.laptop}px`
      : "14px"} !important;

  @media (max-width: ${device.mobile}) {
    font-size: ${({ labelStyle }: MProps) =>
      labelStyle?.fontSize?.mobile
        ? `${labelStyle?.fontSize?.mobile}px`
        : "14px"} !important;
    margin-top: 3px;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: ${({ labelStyle }: MProps) =>
      labelStyle?.fontSize?.planshet
        ? `${labelStyle?.fontSize?.planshet}px`
        : "14px"} !important;
    margin-top: 3px;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: MProps) =>
      labelStyle?.fontSize?.laptop
        ? `${labelStyle?.fontSize?.laptop}px`
        : "14px"} !important;
    flex-direction: column;
    margin-top: 3px;
  }
  @media (min-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: MProps) =>
      labelStyle?.fontSize?.desktop
        ? `${labelStyle?.fontSize?.desktop}px`
        : "16px"} !important;
    margin-top: 5px;
  }
`;

import styled from 'styled-components';
import { Props } from './index';
import { device } from '../../../styles/device';
import { TextField, InputLabel, InputAdornment } from '@material-ui/core';

export const Container = styled.div`
  width: ${({ width }: Props) =>
    width?.width ? width?.width : '100%'} !important;
  min-width: ${({ width }: Props) => `${width?.minwidth}px`} !important;
  max-width: ${({ width }: Props) => `${width?.maxwidth}px`} !important;
  position: relative;
  margin: ${({ margin }: Props) => margin?.laptop} !important;
  @media (max-width: ${device.mobile}) {
    margin: ${({ margin }: Props) => margin?.mobile} !important;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    margin: ${({ margin }: Props) => margin?.planshet} !important;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    margin: ${({ margin }: Props) => margin?.laptop} !important;
  }
  @media (min-width: ${device.laptop}) {
    margin: ${({ margin }: Props) => margin?.desktop} !important;
  }
  .MuiInputLabel-formControl {
    position: static !important;
    transform: none !important;
  }
`;

export const MInput = styled(TextField)`
  .MuiInput-underline:before,
  .MuiInput-underline:after {
    border: none !important;
  }
  background-color: ${({ inputStyle }: Props) =>
    inputStyle?.bgcolor ? inputStyle?.bgcolor : 'white'} !important;
  border-radius: ${({ inputStyle }: Props) =>
    inputStyle?.radius ? `${inputStyle?.radius}px` : '14px'} !important;
  border: ${({ inputStyle, error }: Props) =>
    error
      ? '1px solid #FF5E68'
      : inputStyle?.border
      ? inputStyle?.border
      : '1px solid #C2C2C2'} !important;
  margin: ${({ inputStyle }: Props) =>
    inputStyle?.margin ? inputStyle?.margin : 0} !important;
  padding: ${({ inputStyle }: Props) =>
    inputStyle?.outpadding ? inputStyle?.outpadding : 0} !important;
  input::placeholder {
    color: ${({ inputStyle }: Props) =>
      inputStyle?.placeholdercolor} !important;
  }
  textarea::placeholder {
    color: ${({ inputStyle }: Props) =>
      inputStyle?.placeholdercolor} !important;
  }
  .MuiInputBase-input {
    border-radius: ${({ inputStyle }: Props) =>
      inputStyle?.radius ? `${inputStyle?.radius}px` : '14px'} !important;
    height: ${({ inputStyle }: Props) =>
      inputStyle?.height?.laptop
        ? `${inputStyle?.height?.laptop}px`
        : '50px'} !important;
    font-size: ${({ inputStyle }: Props) =>
      inputStyle?.fontSize?.laptop
        ? `${inputStyle?.fontSize?.laptop}px`
        : '16px'} !important;
    font-weight: ${({ inputStyle }: Props) =>
      inputStyle?.weight ? inputStyle?.weight : '500'} !important;
    color: ${({ inputStyle }: Props) =>
      inputStyle?.color ? inputStyle?.color : '#223367'} !important;
    padding: ${({ inputStyle }: Props) =>
      inputStyle?.inpadding ? inputStyle?.inpadding : '0 20px'} !important;

    @media (max-width: ${device.mobile}) {
      font-size: ${({ inputStyle }: Props) =>
        inputStyle?.fontSize?.mobile
          ? `${inputStyle?.fontSize?.mobile}px`
          : '14px'} !important;
      height: ${({ inputStyle }: Props) =>
        inputStyle?.height?.mobile
          ? `${inputStyle?.height?.mobile}px`
          : '45px'} !important;
    }
    @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
      font-size: ${({ inputStyle }: Props) =>
        inputStyle?.fontSize?.planshet
          ? `${inputStyle?.fontSize?.planshet}px`
          : '14px'} !important;
      height: ${({ inputStyle }: Props) =>
        inputStyle?.height?.planshet
          ? `${inputStyle?.height?.planshet}px`
          : '45px'} !important;
    }
    @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
      font-size: ${({ inputStyle }: Props) =>
        inputStyle?.fontSize?.laptop
          ? `${inputStyle?.fontSize?.laptop}px`
          : '15px'} !important;
      height: ${({ inputStyle }: Props) =>
        inputStyle?.height?.laptop
          ? `${inputStyle?.height?.laptop}px`
          : '50px'} !important;
    }
    @media (min-width: ${device.laptop}) {
      font-size: ${({ inputStyle }: Props) =>
        inputStyle?.fontSize?.desktop
          ? `${inputStyle?.fontSize?.desktop}px`
          : '16px'} !important;
      height: ${({ inputStyle }: Props) =>
        inputStyle?.height?.desktop
          ? `${inputStyle?.height?.desktop}px`
          : '60px'} !important;
    }
  }
`;

export const Label = styled(InputLabel)`
  width: fit-content;
  user-select: none;

  color: ${({ labelStyle }: Props) =>
    labelStyle?.color ? labelStyle?.color : '#C7C7C7'} !important;
  font-weight: ${({ labelStyle }: Props) =>
    labelStyle?.weight ? labelStyle?.weight : 'bold'} !important;
  font-size: ${({ labelStyle }: Props) =>
    labelStyle?.fontSize?.laptop
      ? `${labelStyle?.fontSize?.laptop}px`
      : '15px'} !important;
  margin-bottom: ${({ lmargin }: Props) =>
    lmargin?.laptop ? `${lmargin?.laptop}px` : '7px'}!important;
  @media (max-width: ${device.mobile}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.mobile
        ? `${labelStyle?.fontSize?.mobile}px`
        : '14px'} !important;
    margin-bottom: ${({ lmargin }: Props) =>
      lmargin?.mobile ? `${lmargin?.mobile}px` : '5px'}!important;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.planshet
        ? `${labelStyle?.fontSize?.planshet}px`
        : '14px'} !important;
    margin-bottom: ${({ lmargin }: Props) =>
      lmargin?.planshet ? `${lmargin?.planshet}px` : '6px'}!important;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.laptop
        ? `${labelStyle?.fontSize?.laptop}px`
        : '15px'} !important;
    margin-bottom: ${({ lmargin }: Props) =>
      lmargin?.laptop ? `${lmargin?.laptop}px` : '7px'}!important;
  }
  @media (min-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.desktop
        ? `${labelStyle?.fontSize?.desktop}px`
        : '16px'} !important;
    margin-bottom: ${({ lmargin }: Props) =>
      lmargin?.desktop ? `${lmargin?.desktop}px` : '10px'}!important;
  }
`;

export const Adornment = styled(InputAdornment)``;

export const Message = styled.div`
  position: absolute;
  top: 100%;
  font-weight: 300;
  color: #ff5e68;
  overflow-wrap: normal;
  display: flex;
  margin-top: 5px;

  font-size: ${({ labelStyle }: Props) =>
    labelStyle?.fontSize?.laptop
      ? `${labelStyle?.fontSize?.laptop}px`
      : '16px'} !important;

  @media (max-width: ${device.mobile}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.mobile
        ? `${labelStyle?.fontSize?.mobile}px`
        : '16px'} !important;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.planshet
        ? `${labelStyle?.fontSize?.planshet}px`
        : '16px'} !important;
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.laptop
        ? `${labelStyle?.fontSize?.laptop}px`
        : '16px'} !important;
    flex-direction: column;
  }
  @media (min-width: ${device.laptop}) {
    font-size: ${({ labelStyle }: Props) =>
      labelStyle?.fontSize?.desktop
        ? `${labelStyle?.fontSize?.desktop}px`
        : '16px'} !important;
  }
`;

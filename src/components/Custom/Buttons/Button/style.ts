import styled from 'styled-components';
import { Props } from '../type';
import { Button } from '@material-ui/core';
import { device } from '../../../../styles/device';

export const Container = styled.div`
  width: ${({ width, fullWidth }: Props) =>
    width?.width
      ? width?.width
      : fullWidth
      ? '100%'
      : 'fit-content'} !important;
  min-width: ${({ width }: Props) =>
    width?.minwidth ? `${width?.minwidth}px` : null} !important;
  max-width: ${({ width }: Props) =>
    width?.maxwidth ? `${width?.maxwidth}px` : null} !important;
  display: inline-block;
  height: ${({ buttonStyle }: Props) =>
    buttonStyle?.height?.laptop
      ? `${buttonStyle?.height.laptop}px`
      : '45px'} !important;
  margin: ${({ margin }: Props) =>
    margin?.laptop ? margin?.laptop : null} !important;
  & > button.MuiButtonBase-root {
    padding: ${({ padding }: Props) =>
      padding?.laptop ? padding?.laptop : '0 20px'} !important;
  }
  .Mui-disabled {
    color: ${({ disabled }: Props) => disabled && 'white'}!important;
    background-color: #c7c7c7 !important;
    border-color: transparent !important;
    opacity: ${({ disabled }) => disabled && '1'}!important;
  }
  cursor: ${({ disabled }: Props) => disabled && 'not-allowed !important'};
  .MuiButton-label {
    white-space: nowrap !important;
  }
  @media (max-width: ${device.mobile}) {
    height: ${({ buttonStyle }: Props) =>
      buttonStyle?.height?.mobile
        ? `${buttonStyle?.height.mobile}px`
        : '40px'} !important;
    margin: ${({ margin }: Props) =>
      margin?.mobile ? margin?.mobile : null} !important;
    & > button.MuiButtonBase-root {
      padding: ${({ padding }: Props) =>
        padding?.mobile ? padding?.mobile : '0 15px'} !important;
    }
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    height: ${({ buttonStyle }: Props) =>
      buttonStyle?.height?.planshet
        ? `${buttonStyle?.height.planshet}px`
        : '40px'} !important;
    margin: ${({ margin }: Props) =>
      margin?.planshet ? margin?.planshet : null} !important;
    & > button.MuiButtonBase-root {
      padding: ${({ padding }: Props) =>
        padding?.planshet ? padding?.planshet : '0 15px'} !important;
    }
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    height: ${({ buttonStyle }: Props) =>
      buttonStyle?.height?.laptop
        ? `${buttonStyle?.height.laptop}px`
        : '45px'} !important;
    margin: ${({ margin }: Props) =>
      margin?.laptop ? margin?.laptop : null} !important;
    & > button.MuiButtonBase-root {
      padding: ${({ padding }: Props) =>
        padding?.laptop ? padding?.laptop : '0 20px'} !important;
    }
  }
  @media (min-width: ${device.laptop}) {
    height: ${({ buttonStyle }: Props) =>
      buttonStyle?.height?.desktop
        ? `${buttonStyle?.height.desktop}px`
        : '50px'} !important;
    margin: ${({ margin }: Props) =>
      margin?.desktop ? margin?.desktop : null} !important;
    & > button.MuiButtonBase-root {
      padding: ${({ padding }: Props) =>
        padding?.desktop ? padding?.desktop : '0 25px'} !important;
    }
  }
`;

export const MButton = styled(Button)`
  font-family: 'Roboto' !important;
  font-style: normal !important;
  height: 100% !important;
  color: ${({ buttonStyle }: Props) =>
    buttonStyle?.color ? buttonStyle?.color : '#FFFFFF'} !important;
  background-color: ${({ buttonStyle }: Props) =>
    buttonStyle?.bgcolor ? buttonStyle?.bgcolor : '#606EEA'}!important;
  & > :hover {
    background-color: ${({ buttonStyle }: Props) =>
      `${buttonStyle?.hoverbgcolor} !important`};
    color: ${({ buttonStyle }: Props) =>
      `${buttonStyle?.hovercolor} !important`};
  }
  background-image: ${({ buttonStyle }: Props) =>
    buttonStyle?.bgimage ? `${buttonStyle?.bgimage} !important` : null};
  border-radius: ${({ buttonStyle }: Props) =>
    typeof buttonStyle?.radius === 'string'
      ? buttonStyle?.radius
      : buttonStyle?.radius
      ? `${buttonStyle?.radius}px`
      : '14px'}!important;
  border: ${({ buttonStyle }: Props) =>
    buttonStyle?.border ? buttonStyle?.border : 'none'}!important;
  box-shadow: ${({ buttonStyle, disabled }: Props) =>
    disabled
      ? null
      : buttonStyle?.shadow
      ? buttonStyle?.shadow
      : null}!important;
  font-weight: ${({ buttonStyle }: Props) =>
    buttonStyle?.weight ? buttonStyle?.weight : 'normal'};
  .MuiButton-startIcon {
    margin-right: ${({ iconmargin }: Props) =>
      iconmargin?.laptop ? `${iconmargin?.laptop}px ` : '15px'}!important;
    margin-left: 0 !important;
  }
  .MuiButton-endIcon {
    margin-left: ${({ iconmargin }: Props) =>
      iconmargin?.laptop ? `${iconmargin?.laptop}px ` : '15px'}!important;
    margin-right: 0 !important;
  }

  text-transform: none !important;

  font-size: ${({ buttonStyle }: Props) =>
    buttonStyle?.fontSize?.laptop
      ? `${buttonStyle?.fontSize?.laptop}px`
      : '16px'}!important;
  @media (max-width: ${device.mobile}) {
    font-size: ${({ buttonStyle }: Props) =>
      buttonStyle?.fontSize?.mobile
        ? `${buttonStyle?.fontSize?.mobile}px`
        : '14px'}!important;
    .MuiButton-startIcon {
      margin-right: ${({ iconmargin }: Props) =>
        iconmargin?.mobile ? `${iconmargin?.mobile}px ` : '10px'}!important;
    }
    .MuiButton-endIcon {
      margin-left: ${({ iconmargin }: Props) =>
        iconmargin?.mobile ? `${iconmargin?.mobile}px ` : '10px'}!important;
    }
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.planshet}) {
    font-size: ${({ buttonStyle }: Props) =>
      buttonStyle?.fontSize?.planshet
        ? `${buttonStyle?.fontSize?.planshet}px`
        : '14px'}!important;

    .MuiButton-startIcon {
      margin-right: ${({ iconmargin }: Props) =>
        iconmargin?.planshet ? `${iconmargin?.planshet}px ` : '10px'}!important;
    }
    .MuiButton-endIcon {
      margin-left: ${({ iconmargin }: Props) =>
        iconmargin?.planshet ? `${iconmargin?.planshet}px ` : '10px'}!important;
    }
  }
  @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
    font-size: ${({ buttonStyle }: Props) =>
      buttonStyle?.fontSize?.laptop
        ? `${buttonStyle?.fontSize?.laptop}px`
        : '16px'}!important;

    .MuiButton-startIcon {
      margin-right: ${({ iconmargin }: Props) =>
        iconmargin?.laptop ? `${iconmargin?.laptop}px ` : '15px'}!important;
    }
    .MuiButton-endIcon {
      margin-left: ${({ iconmargin }: Props) =>
        iconmargin?.laptop ? `${iconmargin?.laptop}px ` : '15px'}!important;
    }
  }
  @media (min-width: ${device.laptop}) {
    font-size: ${({ buttonStyle }: Props) =>
      buttonStyle?.fontSize?.desktop
        ? `${buttonStyle?.fontSize?.desktop}px`
        : '18px'}!important;

    .MuiButton-startIcon {
      margin-right: ${({ iconmargin }: Props) =>
        iconmargin?.desktop ? `${iconmargin?.desktop}px ` : '15px'}!important;
    }
    .MuiButton-endIcon {
      margin-left: ${({ iconmargin }: Props) =>
        iconmargin?.desktop ? `${iconmargin?.desktop}px ` : '15px'}!important;
    }
  }
`;

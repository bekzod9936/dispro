import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Props } from './index';
import { device } from '../../../styles/device';

export const MButton = styled(Button)`
  font-family: 'Roboto' !important;
  width: 100% !important;
  min-width: inherit !important;
  max-width: inherit !important;
  height: inherit !important;
  min-height: inherit !important;
  color: ${({ tcolor }: Props) => tcolor || '#FFFFFF'} !important;
  background-color: ${({ bgcolor }: Props) => bgcolor || '#606EEA'}!important;
  font-size: ${({ fontSize }: Props) => `${fontSize?.max}px`}!important;
  border-radius: ${({ radius }: Props) =>
    typeof radius === 'string'
      ? radius
      : radius
      ? `${radius}px`
      : '14px'}!important;
  border: ${({ border }: Props) => border || '1px solid'}!important;
  border-color: ${({ bordercolor }: Props) =>
    bordercolor || 'transparent'}!important;
  font-style: normal !important;
  box-shadow: ${({ shadow, disabled }: Props) =>
    disabled ? null : shadow || null};
  font-weight: ${({ weight }: Props) => weight || 'normal'};
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  text-transform: none !important;
  flex: 1;
  div,
  span {
    height: 100%;
    display: flex;
    align-items: center;
  }
  span.MuiButton-label {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding-top: 2px;
    width: inherit;
  }
  @media (max-width: ${device.mobile}) {
    font-size: ${({ fontSize }: Props) =>
      fontSize?.min ? `${fontSize?.min}px` : null}!important;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    font-size: ${({ fontSize }: Props) => {
      let size: number = (Number(fontSize?.max) + Number(fontSize?.min)) / 2;
      return fontSize?.max && fontSize?.min
        ? `${size}px !important`
        : 'fit-content !important';
    }};
  }
  @media (min-width: ${device.laptop}) {
    font-size: ${({ fontSize }: Props) =>
      fontSize?.max ? `${fontSize?.max}px` : 'fit-content'} !important;
  } ;
`;

export const Wrapper = styled.div`
  cursor: ${({ disabled }: Props) => disabled && 'not-allowed !important'};
  width: ${({ width }: Props) => (width ? width : 'fit-content')} !important;
  min-width: ${({ minWidth }: Props) =>
    minWidth ? `${minWidth}px` : null} !important;
  max-width: ${({ maxWidth }: Props) =>
    maxWidth ? `${maxWidth}px` : null} !important;
  height: ${({ height }: Props) =>
    height ? height : 'fit-content'} !important;
  min-height: ${({ minHeight }: Props) =>
    minHeight ? `${minHeight}px` : null} !important;
  margin: ${({ margin }: Props) => margin}!important;

  .Mui-disabled {
    color: ${({ disabled }: Props) => disabled && 'white'}!important;
    background-color: #c7c7c7 !important;
    border-color: transparent !important;
    opacity: ${({ disabled }) => disabled && '1'}!important;
  }

  @media (max-width: ${device.mobile}) {
    height: ${({ minHeight }: Props) =>
      minHeight ? `${minHeight}px` : 'fit-content'} !important;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    height: ${({ minHeight, maxHeight }: Props) => {
      let he: number = (Number(maxHeight) + Number(minHeight)) / 2;
      return minHeight && maxHeight
        ? `${he}px !important`
        : 'fit-content !important';
    }};
  }
  @media (min-width: ${device.laptop}) {
    height: ${({ maxHeight }: Props) =>
      maxHeight ? `${maxHeight}px` : 'fit-content'} !important;
  } ;
`;

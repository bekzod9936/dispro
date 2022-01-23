import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { device } from '../../../styles/device';

interface MProps {
  width?: string;
  minWidth?: number;
  maxWidth?: number;
  height?: string;
  minHeight?: number;
  maxHeight?: number;
  tcolor?: string;
  bgcolor?: string;
  fontSize?: number;
  radius?: number;
  border?: string;
  weight?: string;
  paddingLeft?: number;
}

interface LProps {
  lcolor?: string;
  lweight?: string;
  lfontSize?: string;
  lmarginbottom?: number;
  margin?: string;
  width?: string;
  open?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }: LProps) => (width === '100%' ? '100%' : 'fit-content')};
  margin: ${({ margin }: LProps) => margin || null};
`;

export const MSelect = styled(Select)`
  font-family: 'Roboto' !important;
  width: 100% !important;
  min-width: inherit !important;
  max-width: inherit !important;
  height: inherit !important;
  min-height: inherit !important;
  color: ${({ tcolor }: MProps) => tcolor || '#223367'} !important;
  background-color: ${({ bgcolor }: MProps) => bgcolor || 'white'}!important;
  font-size: ${({ fontSize }: MProps) => `${fontSize}px`}!important;
  border-radius: ${({ radius }: MProps) =>
    radius ? `${radius}px` : '14px'}!important;
  border: ${({ border }: MProps) => border || null}!important;
  font-weight: ${({ weight }: MProps) => weight || 'normal'};
  .MuiSelect-select:focus {
    background-color: transparent !important;
  }
  .MuiInputBase-input {
    padding-left: ${({ paddingLeft }: MProps) =>
      paddingLeft ? `${paddingLeft}px` : '5px'}!important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    height: 100% !important;
    border-radius: ${({ radius }: MProps) =>
      radius ? `${radius}px` : '14px'}!important;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const Label = styled.label`
  font-style: normal;
  font-weight: ${({ lweight }: LProps) => lweight || null};
  font-size: ${({ lfontSize }: LProps) => lfontSize || '16px'};
  letter-spacing: 1px;
  color: ${({ lcolor }: LProps) => lcolor || '#c7c7c7'};
  margin-bottom: ${({ lmarginbottom }: LProps) => `${lmarginbottom}px` || null};
`;

export const Option = styled(MenuItem)``;

export const Wrap = styled.div`
  width: ${({ width }: MProps) => (width ? width : 'fit-content')} !important;
  min-width: ${({ minWidth }: MProps) =>
    minWidth ? `${minWidth}px` : null} !important;
  max-width: ${({ maxWidth }: MProps) =>
    maxWidth ? `${maxWidth}px` : null} !important;
  height: ${({ height }: MProps) =>
    height ? height : 'fit-content'} !important;
  min-height: ${({ minHeight }: MProps) =>
    minHeight ? `${minHeight}px` : null} !important;
  @media (max-width: ${device.mobile}) {
    height: ${({ minHeight }: MProps) =>
      minHeight ? `${minHeight}px` : 'fit-content'} !important;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    height: ${({ minHeight, maxHeight }: MProps) => {
      let he: number = (Number(maxHeight) + Number(minHeight)) / 2;
      return minHeight && maxHeight
        ? `${he}px !important`
        : 'fit-content !important';
    }};
  }
  @media (min-width: ${device.laptop}) {
    height: ${({ maxHeight }: MProps) =>
      maxHeight ? `${maxHeight}px` : 'fit-content'} !important;
  }
  position: relative;
`;

export const Message = styled.div`
  position: absolute;
  top: 100%;
`;

export const IconWrap = styled.div`
  ${({ open }: LProps) => (open ? ' transform: rotateX(180deg);' : null)}
`;

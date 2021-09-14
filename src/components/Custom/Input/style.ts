import styled from 'styled-components';
import { Input } from '@material-ui/core';
import { device } from '../../../styles/device';

interface IProps {
  radius?: number;
  border?: string;
  fontSize?: number;
  width?: number;
}

interface LProps {
  lcolor?: string;
  lweight?: string;
  lfontSize?: string;
  lmarginbottom?: number;
}

interface CProps {
  margin?: string;
  width?: string;
  minWidth?: number;
  maxWidth?: number;
  height?: string;
  minHeight?: number;
  maxHeight?: number;
}

export const Container = styled.div`
  width: inherit;
  display: flex;
  flex-direction: column;
  margin: ${({ margin }: CProps) => margin || null};
`;
export const Wrap = styled.div`
  width: ${({ width }: CProps) => (width ? width : 'fit-content')} !important;
  min-width: ${({ minWidth }: CProps) =>
    minWidth ? `${minWidth}px` : null} !important;
  max-width: ${({ maxWidth }: CProps) =>
    maxWidth ? `${maxWidth}px` : null} !important;
  height: ${({ height }: CProps) =>
    height ? height : 'fit-content'} !important;
  min-height: ${({ minHeight }: CProps) =>
    minHeight ? `${minHeight}px` : null} !important;
  @media (max-width: ${device.mobile}) {
    height: ${({ minHeight }: CProps) =>
      minHeight ? `${minHeight}px` : 'fit-content'} !important;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    height: ${({ minHeight, maxHeight }: CProps) => {
      let he: number = (Number(maxHeight) + Number(minHeight)) / 2;
      return minHeight && maxHeight
        ? `${he}px !important`
        : 'fit-content !important';
    }};
  }
  @media (min-width: ${device.laptop}) {
    height: ${({ maxHeight }: CProps) =>
      maxHeight ? `${maxHeight}px` : 'fit-content'} !important;
  }
  position: relative;
`;

export const MInput = styled(Input)`
  border-radius: ${({ radius }: IProps) =>
    radius ? `${radius}px` : '14px'}!important;
  border: ${({ border }: IProps) => border || null}!important;
  font-size: ${({ fontSize }: IProps) => `${fontSize}px`}!important;
  width: 100% !important;
  min-width: inherit !important;
  max-width: inherit !important;
  height: inherit !important;
  min-height: inherit !important;
  input {
    height: 100% !important;
    padding-left: 25px;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    border-radius: ${({ radius }: IProps) =>
      radius ? `${radius}px` : '14px'}!important;
  }
  .MuiInputAdornment-positionEnd,
  .MuiInputAdornment-positionStart {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  input:focus::placeholder {
    color: gray;
  }
  input::placeholder {
    color: transparent;
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

export const Message = styled.div`
  position: absolute;
  top: 100%;
`;

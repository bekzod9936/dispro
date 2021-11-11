import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ReactComponent as Arrow } from 'assets/icons/arrowlang.svg';
import { device } from 'styles/device';

interface LProps {
  open?: boolean;
  display?: any;
}

interface MProps {
  border?: string;
}

export const ArrowIcon = styled(Arrow)``;

export const Container = styled.div``;

export const Option = styled(MenuItem)``;

export const MSelect = styled(Select)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ border }: MProps) => (border ? border : '1px solid #223367')};
  box-sizing: border-box;
  border-radius: 46px;
  font-weight: 500;
  font-size: 15px;
  color: #223367;
  .MuiInputBase-input {
    padding: 5px 15px;
    height: 100% !important;
    border-radius: 14px !important;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .MuiSelect-select.MuiSelect-select {
    background-color: transparent;
  }
  @media (min-width: ${device.mobile}) and (max-width: ${device.laptop}) {
    .MuiInputBase-input {
      padding: 7px 15px;
      font-size: 15px;
    }
  }
  @media (min-width: ${device.laptop}) {
    .MuiInputBase-input {
      padding: 9px 15px;
      font-size: 16px;
    }
  }
  @media (max-width: ${device.mobile}) {
    .MuiInputBase-input {
      padding: 5px 15px;
      font-size: 14px;
    }
  }
`;

export const IconWrap = styled.div`
  transform: ${({ open }: LProps) => (open ? 'rotateX(180deg)' : null)};
  padding-right: 15px;
  @media (max-width: ${device.mobile}) {
    display: ${({ display }: LProps) => (display ? null : 'none')};
  }
`;

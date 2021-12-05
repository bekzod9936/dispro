import styled from 'styled-components';
import DatePicker from 'react-multi-date-picker';
import { ReactComponent as Down } from 'assets/icons/down.svg';
import { device } from '../../../styles/device';
import { ReactComponent as Reset } from 'assets/icons/StatistisPage/reset.svg';
import { ReactComponent as Date } from 'assets/icons/date.svg';
import { ReactComponent as Delete } from 'assets/icons/IconsInfo/delete.svg';

interface Props {
  margin?: string;
}

export const Container = styled.div`
  position: relative;
  width: fit-content;
  display: flex;
  flex-direction: column;
  margin: ${({ margin }: Props) => margin};
  div.rmdp-container {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100px;
  }

  input.custom-input {
    border-radius: 15px;
    border: 1px #0c8af8 solid;
    padding: 4px 12px;
    background-color: white;
    box-shadow: 0 0 2px #0074d9;
    height: 45px;
    width: inherit;
    width: 100px;
    display: none;
  }
`;

export const RDatePicker = styled(DatePicker)``;

export const DownIcon = styled(Down)`
  transform: rotate(180deg);
  width: 12px !important;
  height: 6px !important;
  & > path {
    fill: #c4c4c4;
  }
`;

export const DateIcon = styled(Date)`
  @media (max-width: ${device.mobile}) {
    width: 16px;
    height: 16px;
  }
`;

export const WrapText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  & > span:first-child {
    font-weight: 500;
    font-size: 15px;
    color: #223367;
  }
  & > span:last-child {
    font-weight: normal;
    font-size: 13px;
    color: #a5a5a5;
  }
  @media (max-width: ${device.planshet}) {
    & > span:first-child {
      font-size: 14px;
    }
    & > span:last-child {
      display: none;
    }
  }
  @media (min-width: ${device.laptop}) {
    & > span:first-child {
      font-size: 16px;
    }
    & > span:last-child {
      font-size: 14px;
    }
  }
`;

export const ResetIcon = styled(Reset)``;

export const WrapButton = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;

  @media (max-width: ${device.planshet}) {
    & > button.MuiButtonBase-root {
      display: none;
    }
  }
`;

export const MobileReset = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c4c4c4;
  border-radius: 46px;
  font-weight: 300;
  font-size: 14px;
  color: #a5a5a5;
  padding: 0 5px 0 15px;
  height: 30px;
  margin: 10px 0;
  width: fit-content;
  .MuiIconButton-root {
    padding: 6px !important;
    margin-left: 5px;
  }
  @media (min-width: ${device.planshet}) {
    display: none;
  }
`;

export const DeleteIcon = styled(Delete)`
  & > path {
    fill: #c4c4c4;
  }
`;

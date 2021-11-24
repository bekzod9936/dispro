import styled from 'styled-components';
import DatePicker from 'react-multi-date-picker';
import { ReactComponent as Down } from 'assets/icons/down.svg';
import { device } from '../../../styles/device';
import { ReactComponent as Reset } from 'assets/icons/StatistisPage/reset.svg';
import { ReactComponent as Date } from 'assets/icons/date.svg';
import { ReactComponent as DisabledDate } from "assets/icons/disabledDateIcon.svg";
interface IProps {
  error?: boolean,
  margin?: string,
  disabled?: boolean
}
export const Container = styled.div`
  position: relative;
  width: 100%;
  border: ${({ error }: IProps) => error ? "1px solid red" : "1px solid #C2C2C2"};
  border-radius: 12px;
  background-color: ${({ disabled }: IProps) => disabled ? "#E6E6E6" : "white"};
  margin: ${({ margin }: IProps) => margin || ""};
  div.rmdp-container {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
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

export const RDatePicker = styled(DatePicker)`
    z-index: 10000 !important;
`;

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
    width: 20px;
    height: 20px;
  }
`;

export const DisabledDateIcon = styled(DisabledDate)`
@media (max-width: ${device.mobile}) {
    width: 20px;
    height: 20px;
  }`

export const WrapText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  span {
    font-weight: 500;
    font-size: 15px;
    color: ${({ disabled }: IProps) => disabled ? "#AAAAAA" : "#223367"};
    }

  @media (max-width: ${device.mobile}) {
   span {
      font-size: 14px;
    }
  }
  @media (min-width: ${device.laptop}) {
    span {
      font-size: 16px;
    }
  }
`;

export const ResetIcon = styled(Reset)``;

interface Props {
  margin?: string;
}

export const WrapButton = styled.div`
  display: flex;
  cursor: ${({ disabled }: IProps) => disabled ? "not-allowed" : "pointer"};
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 13px 20px;
  @media (max-width: ${device.mobile}) {
    padding: 13px;
  }
  margin: ${({ margin }: Props) => margin};
`;

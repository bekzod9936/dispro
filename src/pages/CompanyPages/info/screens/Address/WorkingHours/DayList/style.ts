import styled from 'styled-components';
import { device } from 'styles/device';
import { ReactComponent as Delete } from 'assets/icons/IconsInfo/delete.svg';
import { ReactComponent as NoBreak } from 'assets/icons/IconsInfo/nobreak.svg';
import { ReactComponent as Sun } from 'assets/icons/IconsInfo/sun.svg';
import { ReactComponent as Coffee } from 'assets/icons/IconsInfo/coffee.svg';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';

export const Container = styled.div`
  width: fit-content;
  margin: 5px 5px;
  height: fit-content;
`;

export const Content = styled.div`
  padding: 25px;
  width: 100%;
  & > fieldset {
    .MuiRadio-colorPrimary.Mui-checked {
      color: #606eea !important ;
    }
    span.MuiFormControlLabel-label {
      font-weight: 300;
      font-size: 16px;
      color: #223367;
    }
    span.MuiRadio-root {
      color: #a5a5a5;
    }
  }

  @media (max-width: ${device.mobile}) {
    padding: 0 15px 15px;
  }
`;

export const DeleteIcon = styled(Delete)`
  margin-left: 10px;
`;

export const NoBreakIcon = styled(NoBreak)``;

export const SunIcon = styled(Sun)`
  display: flex;
  flex: 1;
  align-items: center;
`;

export const CoffeeIcon = styled(Coffee)`
  width: 20px;
  height: 20px;
  display: flex;
  flex: 1;
  align-items: center;
`;

export const Label = styled.label`
  font-weight: 300;
  font-size: 16px;
  user-select: none;
  color: #223367;
  cursor: pointer;
`;

export const WrapCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: -12px;
  & > span.MuiCheckbox-colorPrimary.Mui-checked {
    color: #606eea !important ;
  }

  & > span.MuiCheckbox-root {
    color: #a5a5a5 !important ;
  }
  span.MuiTypography-body1 {
    font-weight: 300 !important;
    font-size: 16px !important;
    color: #223367 !important;
  }
`;

export const WrapTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const WorkSign = styled.div`
  background: rgba(96, 110, 234, 0.1);
  border-radius: 14px;
  margin-top: 5px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 110px;
  padding: 10px;
`;

export const Time = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: #223367;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const WrapperTimes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-left: 5px;
  & > div {
    color: #606eea !important;
  }
`;

export const GraphWrap = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #223367;
`;

export const WrapHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 15px 5px;
`;

export const CloseIcon = styled(Close)``;

export const Wrap = styled.div``;

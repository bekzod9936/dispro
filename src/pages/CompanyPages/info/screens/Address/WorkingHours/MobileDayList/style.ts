import styled from 'styled-components';
import { ReactComponent as NoBreak } from 'assets/icons/IconsInfo/nobreak.svg';
import { ReactComponent as Sun } from 'assets/icons/IconsInfo/sun.svg';
import { ReactComponent as Coffee } from 'assets/icons/IconsInfo/coffee.svg';
import { ReactComponent as Close } from 'assets/icons/IconsInfo/close.svg';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export const Container = styled.div`
  width: fit-content;
  margin: 5px 5px;
  height: fit-content;
`;

export const WrapHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 15px 5px;
`;

export const GraphWrap = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #223367;
`;

export const CloseIcon = styled(Close)``;

export const ModalContainer = styled.div`
  flex-grow: 1;
  position: relative;
  .MuiAppBar-colorPrimary {
    color: #223367 !important;
    font-weight: normal !important;
    font-size: 14px !important;
  }
  .MuiAppBar-colorPrimary {
    background-color: transparent !important;
  }
  .MuiPaper-elevation4 {
    box-shadow: none !important;
  }
  .MuiTab-root {
    min-height: 36px !important;
    border-radius: 12px !important;
    background: rgba(96, 110, 234, 0.1) !important;
  }
  .MuiTabs-flexContainer {
    grid-gap: 10px !important;
    overflow-x: scroll !important;
    &::-webkit-scrollbar {
      appearance: none;
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      appearance: none;
      display: none;
    }

    &::-webkit-scrollbar-track {
      appearance: none;
      display: none;
    }
    width: 100%;
  }
  .MuiTab-textColorInherit {
    opacity: 1 !important;
  }

  button.Mui-selected {
    background: #606eea !important;
    box-shadow: 0px 3px 6px rgba(96, 110, 234, 0.46) !important;
    .MuiTab-wrapper {
      color: #fff !important;
    }
  }
  button.MuiTab-root {
    text-transform: capitalize;
  }

  overflow: hidden;
  width: 100%;
  .MuiTabs-indicator {
    background-color: transparent !important;
    height: 0 !important;
  }
`;

export const Appbar = styled(AppBar)``;

export const MMTabs = styled(Tabs)`
  padding-left: ${({ value }) => (value === 1 ? '15px' : '0')};
`;

export const MTab = styled(Tab)`
  margin: 0 0 10px 0;
`;

export const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
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

export const SunIcon = styled(Sun)`
  display: flex;
  flex: 1;
  align-items: center;
  width: 30px;
  height: 30px;
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

export const CoffeeIcon = styled(Coffee)`
  width: 20px;
  height: 20px;
  display: flex;
  flex: 1;
  align-items: center;
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
export const NoBreakIcon = styled(NoBreak)``;

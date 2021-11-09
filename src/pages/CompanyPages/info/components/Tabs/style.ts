import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export const Container = styled.div`
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
  span.PrivateTabIndicator-root-30,
  .PrivateTabIndicator-colorSecondary-31 {
    height: 0 !important;
  }
`;

export const Appbar = styled(AppBar)``;

export const MMTabs = styled(Tabs)`
  padding-left: ${({ value }) => (value === 1 ? '15px' : '0')};
`;

export const MTab = styled(Tab)``;

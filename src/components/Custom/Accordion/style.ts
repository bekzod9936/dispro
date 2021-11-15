import styled from 'styled-components';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { ReactComponent as Down } from 'assets/icons/down.svg';
import { device } from 'styles/device';

export const DownIcon = styled(Down)`
  width: 12px !important;
  height: 6px !important;
  transform: rotate(180deg);
`;

export const Container = styled.div`
  .MuiAccordion-root.Mui-expanded {
    margin: 0 !important;
  }
  .MuiPaper-elevation1 {
    box-shadow: none !important;
  }
  .MuiAccordion-root:before {
    height: 0 !important;
  }
  & > div.MuiPaper-root:nth-child(odd) {
    background-color: #eff0fd !important;
  }
  .MuiAccordionSummary-root {
    padding: 0 20px !important;
  }
  .MuiAccordionDetails-root {
    padding: 0 20px 20px 20px !important;
  }
  .MuiAccordionSummary-root.Mui-expanded {
    min-height: 48px;
  }
  .MuiAccordionSummary-content.Mui-expanded {
    margin: 0 !important;
  }
  .MuiAccordionSummary-content {
    font-weight: normal;
    font-size: 16px;
    color: #223367;
  }
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #606eea;
    border-radius: 14px 0px 0px 14px;
  }
  @media (max-width: ${device.mobile}) {
    .MuiAccordionSummary-content {
      font-size: 14px;
    }
  }
`;

export const MAccordion = styled(MuiAccordion)``;

export const MAccordionSummary = styled(MuiAccordionSummary)``;

export const MAccordionDetails = styled(MuiAccordionDetails)``;

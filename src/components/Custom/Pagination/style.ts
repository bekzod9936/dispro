import styled from 'styled-components';
import Pagination from '@material-ui/lab/Pagination';
import { device } from 'styles/device';

export const MPagination = styled(Pagination)`
  button.Mui-selected {
    background: #606eea !important;
    height: 50px !important;
    width: 50px !important;
    border-radius: 14px !important;
    font-weight: 900 !important;
    font-size: 18px !important;
    color: white !important;
    & > :hover {
      background: #606eea !important;
    }
    @media (max-width: ${device.planshet}) {
      font-size: 14px !important;
    }
    @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
      font-size: 16px !important;
    }
  }
  .MuiPagination-ul {
    display: flex;
    width: fit-content;
    align-self: flex-start;
    & > li:first-child,
    li:last-child > button {
      border-radius: 14px !important;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #c2c2c2;
    }
    & > li > button:hover {
      border-radius: 14px !important;
      background: rgba(96, 110, 234, 0.1) !important;
    }
    & > li > button.Mui-selected:hover {
      background: #606eea !important;
    }
    & > li > button {
      height: 50px !important;
      width: 50px !important;
      font-weight: 500;
      font-size: 18px !important;
      color: #223367;
    }
    @media (max-width: ${device.planshet}) {
      & > li > button {
        height: 40px !important;
        width: 40px !important;
        font-size: 14px !important;
      }
    }
    @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
      & > li > button {
        height: 45px !important;
        width: 45px !important;
        font-size: 16px !important;
      }
    }
    .MuiButtonBase-root {
      & > svg {
        & > path {
          fill: #606eea;
        }
      }
    }
    & > li:first-child {
      margin-right: 10px;
    }
    & > li:last-child {
      margin-left: 10px;
    }
    & > li > .MuiButtonBase-root {
      margin: 0 !important;
      padding: 0 !important;
    }
  }

  .MuiPagination-ul > li {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #c2c2c2;
    @media (max-width: ${device.planshet}) {
      height: 40px !important;
      width: 40px !important;
    }
    @media (min-width: ${device.planshet}) and (max-width: ${device.laptop}) {
      height: 45px !important;
      width: 45px !important;
    }
  }

  .MuiPagination-ul > li:nth-child(n + 3) {
    border-width: 1px 0px;
  }
  .MuiPagination-ul > li:nth-child(2) {
    border-width: 1px 0 1px 1px;
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
  }
  .MuiPagination-ul > li:nth-last-child(-n + 2) {
    border-width: 1px 1px 1px 0px;
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
  }
  .MuiPagination-ul > li:nth-last-child(-n + 1) {
    border-width: 1px;
  }
  .MuiPagination-ul > li:first-child,
  li:last-child {
    color: #606eea;
    stroke: #606eea;
    border-radius: 14px;
  }
`;

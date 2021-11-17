import styled from "styled-components";
import { device } from "styles/device";

export const Table = styled.table`
    width: 100%;
    background-color: #ffffff;
    border-radius: 14px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    border-collapse: collapse;
`



export const THead = styled.thead`
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
    z-index: 10;
  & > tr:last-child {
    border-top: ${({ header }: any) =>
    header ? '1px solid rgba(96, 110, 234, 0.3)' : null};
    & > th:first-child {
      border-right: ${({ header }: any) =>
    header ? '1px solid rgba(96, 110, 234, 0.3)' : null};
    }
  }
  & > tr {
    height: 65px;
  }
`
export const Td = styled.td`
  padding: 15px;
  text-align: center;
  text-transform: capitalize;
  font-weight: normal;
  font-size: 16px;
  color: #223367;
  border-collapse: collapse;
  cursor: pointer;
  @media (max-width: ${device.planshet}) {
    font-size: 14px;
    padding: 6px;
  }
`;

export const Tbody = styled.tbody`
  & > tr:nth-child(odd) {
    background-color: rgba(96, 110, 234, 0.1);
  }

  & > tr:nth-child(even) {
    background-color: white;
  }
  background-color: white;
  & > tr {
    height: 60px;
  }
`;

export const TRow = styled.tr`
    border: none;
    background-color: "transparent";
`

export const Th = styled.th`
  padding: 0 10px;
  border-collapse: collapse;
  font-weight: normal;
  font-size: 16px;
  @media (max-width: ${device.planshet}) {
    font-size: 14px;
    padding: 6px;
  }
  color: #A5A5A5;
  border-radius: 14px 14px 0 0;
`;

export const Footer = styled.div`
  margin-top: 20px;

`
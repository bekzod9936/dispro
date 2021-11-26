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
  padding: 15px 0 15px 20px;
  text-align: left;
  text-transform: capitalize;
  font-weight: normal;
  font-size: 16px;
  color: #223367;
  border-collapse: collapse;
  cursor: pointer;

  /* @media (max-width: ${device.planshet}) {
    font-size: 14px;
    padding: 6px;
  } */
  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 14px;
    margin-right: 20px;
    object-fit: cover;
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
    background-color: transparent;
`

export const Th = styled.th`
  padding: 10px 0 10px 20px;
  border-collapse: collapse;
  font-weight: normal;
  font-size: 16px;
  width: max-content;
  text-align: left;
  /* @media (max-width: ${device.planshet}) {
    font-size: 14px;
    padding: 6px;
  } */
  color: #A5A5A5;
  border-radius: 14px 14px 0 0;
`;

export const Footer = styled.div`
  margin-top: 20px;
  @media (max-width: ${device.mobile}) {
    margin-left: 15px;
  }
`

export const MobileTable = styled.div`
  padding: 6px 0;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  margin: 15px;

`
interface IMRow {
  isEven: boolean
}
export const MTRow = styled.div`
  padding: 10px 10px 7px 15px;
  width: 100%;
  &:nth-child(odd) {
    background-color: rgba(96, 110, 234, 0.1);
  }
  .recRow {
    display: flex;
    width: 100%;
    align-items: center;
    img {
      object-fit: cover;
      width: 40px;
      height: 40px;
      border-radius: 14px;
    }
    .right {
      margin-left: 15px;
      h3 {
        font-size: 16px;
        line-height: 18.75px;
        color: #223367;
        font-weight: 400;
        margin-bottom: 3px;
      }
      p {
        font-size: 14px;
        line-height: 16.41px;
        color: #787878;
        font-weight: 300;
        span {
          color: #223367;
        }
      }
    }
  }
  .date {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    line-height: 16.41px;
    color: #787878;
    margin-bottom: 5px;
    font-weight: 300;
  }
  .content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    .left {
      .type {
        color: #223367;
        font-weight: 300;
        font-size: 14px;
        line-height: 16.41px;
        margin-bottom: 7px;
      }
      .value {
        font-size: 16px;
        font-weight: 700;
        color: #223367;
      }
    }
  }

`
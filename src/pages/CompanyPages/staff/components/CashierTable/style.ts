import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";
import { ITRow } from "./types";

import { ReactComponent as Up } from "assets/icons/up.svg";
import { device } from "styles/device";

export const ImgDiv = styled.div`
  border-radius: 10px;
  overflow: hidden;
  object-fit: contain;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const Img = styled(LazyLoadImage)`
  /* width: 100%;
  height: 100%; */
  object-fit: contain;
  /* .lazy-load-image-background {
    height: 100% !important;
  } */
`;

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px 14px 14px 14px;
  overflow-x: auto;
  width: 100%;
  &:hover {
    ::-webkit-scrollbar-thumb {
      background: #606eea;
    }
  }
  ::-webkit-scrollbar {
    height: 7px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 0 0 14px 14px;
  }
`;

export const MTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  table-layout: auto;
  white-space: nowrap;
  overflow-x: scroll;
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
`;

interface IHeader {
  header?: boolean;
}
export const Thead = styled.thead`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px 14px 0 0;
  & > tr:last-child {
    border-top: ${({ header }: IHeader) =>
      header ? "1px solid rgba(96, 110, 234, 0.3)" : null};
    & > th:first-child {
      border-right: ${({ header }: IHeader) =>
        header ? "1px solid rgba(96, 110, 234, 0.3)" : null};
    }
  }
  & > tr {
    height: 65px;
  }
`;

interface ITh {
  active?: boolean;
}

export const Th = styled.th`
  padding: 0 10px;
  font-weight: normal;
  cursor: pointer;
  font-size: 16px;
  @media (max-width: ${device.planshet}) {
    font-size: 14px;
    padding: 6px;
  }
  color: ${({ active }: ITh) => (active ? "#223367" : "#a5a5a5")}!important;
  border-radius: 14px 14px 0 0;
  :hover {
    color: ${({ active }: ITh) => (active ? null : "#3492FF")}!important;
    & > svg {
      & > path {
        fill: ${({ active }: ITh) =>
          active ? "#223367" : "#8f8f8f"}!important;
      }
    }
  }
`;
interface Props {
  up?: boolean;
  active?: boolean;
}

export const UpIcon = styled(Up)`
  transform: ${({ up }: Props) => (up ? "rotate(-180deg)" : "rotate(0)")};
  margin-left: 5px;
  & > path {
    fill: ${({ active }: Props) => (active ? "#223367" : "transparent")};
  }
`;

export const TableWrapper = styled.div`
  max-width: 1270px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 14px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
`;

export const AddButton = styled.button`
  outline: 0;
  cursor: pointer;
  border: none;
  color: #606eea;
  font-size: 18px;
  line-height: 21px;
  font-weight: 500;
  background-color: transparent;
  font-family: "Roboto", sans-serif;
  margin-right: 10px;
  @media (max-width: ${device.mobile}) {
    display: none;
  }
`;

export const TableBlock = styled.table`
  width: 100%;
  overflow: hidden;
`;

export const THead = styled.thead`
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
`;
// export const Th = styled.th`
//     text-align: start;
//     padding: 20px;
//     color: #A5A5A5;
//     border: none;
//     font-size: 16px;
// `
export const Td = styled.td`
  padding: 15px;
  text-align: center;
  text-transform: capitalize;
  font-weight: normal;
  font-size: 16px;
  color: #223367;
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
  transition: 100ms all;
  /* background: ${({ background }: ITRow) =>
    background ? "rgba(96, 110, 234, 0.1)" : "transparent"}; */
  background-color: ${({ checked }: ITRow) =>
    checked ? "rgba(96, 110, 234, 0.3) !important" : "transparent"};
`;

export const MCheckbox = styled.div`
  span.MuiCheckbox-colorSecondary.Mui-checked {
    color: #3492ff !important ;
  }
  span.MuiCheckbox-colorSecondary {
    color: #a5a5a5 !important ;
  }
  span.MuiTypography-body1 {
    font-weight: 500 !important ;
    font-size: 16px !important ;
    color: #223367 !important ;
  }
  @media (min-width: ${device.laptop}) {
    span.MuiTypography-body1 {
      font-size: 18px !important ;
    }
  }
`;

export const WrapIcon = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

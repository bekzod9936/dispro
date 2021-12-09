import styled from "styled-components";
import { device } from "styles/device";
import { ReactComponent as Up } from "assets/icons/up.svg";

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 0 0 14px 14px;
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

export const Text = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #223367;
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
export const TableHeader = styled.div`
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 45px;
  background-color: #ffffff;
  border-radius: 14px 14px 0 0;
  border-bottom: 1px solid rgba(96, 110, 234, 0.1);
  @media (max-width: ${device.planshet}) {
    padding: 10px;
  }
`;

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
  position: relative;
  border: none;
  transition: 100ms all;
  /* background: ${({ background }: ITRow) =>
    background ? "rgba(96, 110, 234, 0.1)" : "transparent"}; */
  background-color: ${({ checked }: ITRow) =>
    checked ? "rgba(96, 110, 234, 0.3) !important" : "transparent"};
`;

export interface ITRow {
  background?: boolean | number;
  checked?: boolean;
}

export const EmptyDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100% !important;
  padding: 30px;
`;

export const NoData = styled.div`
	height: 50vh;
	border-radius: 14px !important;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
	background: #fff;
	overflow-x: auto;
	width: 100%;
`;

export const NoDataText = styled.div`
	width: 317px;
	display: flex;
	justify-content: center;
	align-ctems: center;
	text-align: center;
	color: #223367;
	font-weight: 300;
	font-size: 16px;
	line-height: 19px;
	font-style: normal;
	margin-top: 35px;
`;

export const WrapPag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

export const Info = styled.div`
  color: #223367;
  font-size: 16px;
  span {
    font-weight: 900;
    margin: 0px 5px;
    font-size: 18px;
  }
`;
import styled from "styled-components";
import { ReactComponent as Up } from "assets/icons/up.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  up?: boolean;
  active?: boolean;
}

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
  border-radius: 14px;
  overflow-x: auto;
  margin-top: 20px;
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

interface Props {
  header2?: boolean;
}

export const Thead = styled.thead`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px 14px 0 0;
  & > tr:last-child {
    border-top: ${({ header2 }: Props) =>
      header2 ? "1px solid rgba(96, 110, 234, 0.3)" : null};
    & > th:first-child {
      border-right: ${({ header2 }: Props) =>
        header2 ? "1px solid rgba(96, 110, 234, 0.3)" : null};
    }
  }
  & > tr {
    height: 65px;
  }
`;

export const Tr = styled.tr``;

export const Th = styled.th`
  padding: 0 10px;
  font-weight: normal;
  font-size: 16px;
  color: ${({ active }: Props) => (active ? "#223367" : "#a5a5a5")}!important;
  border-radius: 14px 14px 0 0;
  :hover {
    color: ${({ active }: Props) => (active ? null : "#3492FF")}!important;
    & > svg {
      & > path {
        fill: ${({ active }: Props) =>
          active ? "#223367" : "#8f8f8f"}!important;
      }
    }
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

export const Td = styled.td`
  padding: 15px;
  text-align: center;
  text-transform: capitalize;
  font-weight: normal;
  font-size: 16px;
  color: #223367;
`;

export const UpIcon = styled(Up)`
  transform: ${({ up }: Props) => (up ? "rotate(-180deg)" : "rotate(0)")};
  margin-left: 5px;
  & > path {
    fill: ${({ active }: Props) => (active ? "#223367" : "transparent")};
  }
`;

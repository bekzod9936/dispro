import styled from "styled-components";
import { ReactComponent as Up } from "assets/icons/up.svg";

interface Props {
  up?: boolean;
  active?: boolean;
}
interface ITRow {
  background?: boolean | number;
  checked?: boolean;
}
export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 14px;
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
  text-align: left;
  padding: 0 40px;
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
  padding-left: 40px;
  text-align: left;
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

export const AgeData = styled.div`
  display: flex;
  position: relative;
  justify-content:space-between;
  align-items: center;

  p {
    font-size: 14px;
  }
  
  h4 {
    padding: 10px 20px;
    font-size: 14px;
    background: linear-gradient(215.2deg, #8bdd59 -12.1%, #dcf089 101.51%);
    border-radius: 14px;
  }
  h3 {  
 
    padding: 10px 20px;
    /* margin-right:20px; */
    font-size: 14px;
    background: linear-gradient(215.2deg, #C7EEFF -12.1%, #FCA9EA 101.51%);
    border-radius: 14px;
  }
  `

export const TitleData = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  /* margin-left: 15px; */
  img {
    border-radius: 14px;
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
`;

export const TRow = styled.tr`
  border: none;
  transition: 100ms all;
  cursor: pointer;
  background-color: ${({ checked }: ITRow) =>
    checked ? "rgba(96, 110, 234, 0.3) !important" : "transparent"};
`;
export const DefaultImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background: linear-gradient(215.2deg, #c7eeff -12.1%, #fca9ea 101.51%);
  margin-right: 15px;
`;


export const ToolTipText = styled("span")({

  visibility: "hidden",
  width: "350px",
  backgroundColor: "#fff",
  color: "#223367",
  textAlign: "center",
  borderRadius: "6px",
  position: "absolute",
  paddingTop:"10px",
  paddingBottom:"5px",
  zIndex: 1,
  top:'60px',
  marginLeft: "-450px",
  marginTop: "-140px",
  ":after": {
    content: '""',
    position: "absolute",
    top: "50%",
    // left: "100%",
    marginLeft: "-5px",
    
    borderWidth: "5px",
    borderStyle: "solid",
    borderRadius: '14px',
    borderColor: "white transparent transparent transparent"
  }

});

export const ToolTip = styled("div")({
  position: "relative",
  display: "inline-block",
 
  ":hover span": {
    visibility: "visible"
  }
});